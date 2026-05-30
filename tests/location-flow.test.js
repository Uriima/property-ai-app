const { readFileSync } = require("fs");
const vm = require("vm");

const pricingConfigData = JSON.parse(readFileSync("data/location-pricing.json", "utf8"));
const appSource = readFileSync("app.js", "utf8");

function createElement(id) {
  return {
    id,
    value: "",
    textContent: "",
    innerHTML: "",
    disabled: false,
    style: {},
    files: [],
    children: [],
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
    appendChild(child) { this.children.push(child); },
    setAttribute() {},
    removeAttribute() {},
    click() {},
    closest() { return null; },
    querySelector() { return createElement("nested"); },
    reset() {}
  };
}

const ids = [
  "landing", "estimator", "startEstimate", "backToLanding", "stepTitle", "stepCounter",
  "progressPercent", "progressBar", "stepDots", "prevStep", "nextStep", "uploadDropZone",
  "takePhotoBtn", "galleryBtn", "cameraInput", "galleryInput", "photoGrid", "photoError",
  "state", "city", "area", "manualArea", "locationMessage", "propertyType", "bedrooms",
  "bathrooms", "toilets", "condition", "finishing", "landSize", "roadAccess", "power",
  "water", "security", "buildingAge", "resultLoading", "resultCard", "readyToEstimate",
  "estimateForm"
];

const elements = Object.fromEntries(ids.map((id) => [id, createElement(id)]));
const document = {
  getElementById(id) { return elements[id] || createElement(id); },
  querySelectorAll(selector) {
    return selector === ".step-panel" ? [0, 1, 2, 3, 4].map((index) => createElement(`panel-${index}`)) : [];
  },
  createElement(tag) { return createElement(tag); },
  addEventListener() {}
};

const fetchCalls = [];
const context = {
  console,
  document,
  window: {
    scrollTo() {},
    setTimeout: (callback) => callback(),
    crypto: { randomUUID: () => "test-uuid" },
    addEventListener() {}
  },
  navigator: {},
  fetch: async (url) => {
    fetchCalls.push(url);
    if (url !== "data/location-pricing.json") {
      throw new Error(`Unexpected backend/API fetch: ${url}`);
    }
    return { ok: true, json: async () => pricingConfigData };
  },
  URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
  Intl,
  setTimeout: (callback) => callback()
};

function run(code) {
  return vm.runInContext(code, context);
}

function assert(name, condition) {
  if (!condition) throw new Error(`FAIL: ${name}`);
  console.log(`PASS: ${name}`);
}

function setLocation(state, city, knownArea, manualArea) {
  elements.state.value = state;
  run("updateCities();");
  elements.city.value = city;
  run("updateAreas();");
  elements.area.value = knownArea;
  elements.manualArea.value = manualArea;
  run("updateLocationMessage(); updateStep();");
}

async function boot() {
  vm.createContext(context);
  vm.runInContext(appSource, context);
  await run("init(); loadPricing();");
}

(async () => {
  await boot();

  run("currentStep = 1; updateStep();");
  setLocation("rivers", "Obio Akpor", "Rumuola", "");
  assert("known area with lowercase state is valid", run("isLocationStepValid();"));
  assert("known area message is shown", elements.locationMessage.textContent === "Using Rumuola for the valuation assumptions.");
  run("nextStep();");
  assert("known area Continue advances to Property Basics", run("currentStep;") === 2);

  run("currentStep = 1; updateStep();");
  setLocation("Rivers", "obio akpor", "", "Rumukwurushi");
  assert("manual area with lowercase city is valid", run("isLocationStepValid();"));
  run("nextStep();");
  assert("manual area Continue advances to Property Basics", run("currentStep;") === 2);

  run("currentStep = 1; updateStep();");
  setLocation("Rivers", "Obio Akpor", "", "");
  assert("missing known/manual area is invalid", !run("isLocationStepValid();"));
  run("nextStep();");
  assert("missing area stays on Location step", run("currentStep;") === 1);
  assert("missing area shows friendly validation message", elements.locationMessage.textContent.includes("either choose a known area"));

  setLocation("Rivers", "Obio Akpor", "Rumuola", "");
  run("nextStep();");
  elements.propertyType.value = "Detached duplex";
  elements.bedrooms.value = "4";
  elements.condition.value = "New";
  elements.finishing.value = "Premium";
  run("updateStep(); nextStep(); nextStep(); nextStep(); runEstimate();");
  assert("full flow renders a local valuation result", elements.resultCard.innerHTML.includes("Estimated midpoint"));
  assert("only local pricing JSON was fetched", fetchCalls.every((url) => url === "data/location-pricing.json"));
})();
