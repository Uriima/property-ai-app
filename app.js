const MAX_PHOTOS = 5;
const MAX_PHOTO_SIZE = 6 * 1024 * 1024;
const CONTACT_URL = "https://realestate.tafid.org/contact/";
const DISCLAIMER = "This is an AI-assisted property estimate based on the information provided. It is not a formal valuation report and should be verified by a qualified property professional.";

const nigeriaData = {
  "Lagos": ["Agege", "Ajeromi Ifelodun", "Alimosho", "Amuwo Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju Lekki", "Ifako Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi Isolo", "Shomolu", "Surulere"],
  "FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
  "Rivers": ["Abua Odual", "Ahoada East", "Ahoada West", "Akuku Toru", "Andoni", "Asari Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio Akpor", "Ogba Egbema Ndoni", "Ogu Bolo", "Okrika", "Omuma", "Opobo Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
  "Other": ["Manual entry"]
};

const propertyTypes = ["Detached duplex", "Semi-detached duplex", "Terrace duplex", "Bungalow", "Block of flats", "Apartment", "Land only"];
const conditionOptions = ["New", "Fairly used", "Needs renovation", "Uncompleted"];
const finishingOptions = ["Basic", "Standard", "Premium", "Luxury"];
const roadOptions = ["Tarred road", "Untarred road", "Estate road", "Poor access"];
const powerOptions = ["Public power only", "Public power plus inverter/solar", "Estate/generator support", "Poor power supply"];
const waterOptions = ["Reliable borehole/public water", "Private borehole", "Public water only", "Unreliable water"];
const securityOptions = ["Gated estate with security", "Street security", "Basic neighbourhood security", "No clear security"];

const steps = ["Property Photos", "Location", "Property Basics", "Value Factors", "Result"];
let currentStep = 0;
let selectedPhotos = [];
let pricingConfig = null;
let lastResult = null;

const $ = (id) => document.getElementById(id);

const elements = {
  landing: $("landing"),
  estimator: $("estimator"),
  startEstimate: $("startEstimate"),
  backToLanding: $("backToLanding"),
  stepTitle: $("stepTitle"),
  stepCounter: $("stepCounter"),
  progressPercent: $("progressPercent"),
  progressBar: $("progressBar"),
  stepDots: $("stepDots"),
  panels: [...document.querySelectorAll(".step-panel")],
  prevStep: $("prevStep"),
  nextStep: $("nextStep"),
  uploadDropZone: $("uploadDropZone"),
  takePhotoBtn: $("takePhotoBtn"),
  galleryBtn: $("galleryBtn"),
  cameraInput: $("cameraInput"),
  galleryInput: $("galleryInput"),
  photoGrid: $("photoGrid"),
  photoError: $("photoError"),
  state: $("state"),
  city: $("city"),
  area: $("area"),
  manualArea: $("manualArea"),
  locationMessage: $("locationMessage"),
  propertyType: $("propertyType"),
  bedrooms: $("bedrooms"),
  bathrooms: $("bathrooms"),
  toilets: $("toilets"),
  condition: $("condition"),
  finishing: $("finishing"),
  landSize: $("landSize"),
  roadAccess: $("roadAccess"),
  power: $("power"),
  water: $("water"),
  security: $("security"),
  buildingAge: $("buildingAge"),
  resultLoading: $("resultLoading"),
  resultCard: $("resultCard"),
  readyToEstimate: $("readyToEstimate")
};

function init() {
  buildStepDots();
  populateSelect(elements.state, Object.keys(nigeriaData), "Select state");
  populateSelect(elements.propertyType, propertyTypes, "Select property type");
  populateSelect(elements.condition, conditionOptions, "Select condition");
  populateSelect(elements.finishing, finishingOptions, "Select finishing quality");
  populateSelect(elements.roadAccess, roadOptions, "Select road access", true);
  populateSelect(elements.power, powerOptions, "Select power availability", true);
  populateSelect(elements.water, waterOptions, "Select water availability", true);
  populateSelect(elements.security, securityOptions, "Select security status", true);
  attachEvents();
  updateCities();
  updateStep();
  loadPricing();
}

async function loadPricing() {
  try {
    const response = await fetch("data/location-pricing.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Pricing config failed to load");
    pricingConfig = await response.json();
    updateAreas();
  } catch (error) {
    console.warn(error);
    pricingConfig = { currency: "NGN", defaultBasePrice: 22000000, states: {}, multipliers: {} };
  }
}

function normalizeLocationText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeLocationKey(value) {
  return normalizeLocationText(value).toLowerCase();
}

function findMatchingValue(values, rawValue) {
  const normalizedRaw = normalizeLocationKey(rawValue);
  if (!normalizedRaw) return "";
  return values.find((value) => normalizeLocationKey(value) === normalizedRaw) || normalizeLocationText(rawValue);
}

function getPricingStates() {
  return Object.keys(pricingConfig?.states || {});
}

function getSelectedState() {
  return findMatchingValue([...Object.keys(nigeriaData), ...getPricingStates()], elements.state.value);
}

function getSelectedCity(stateName = getSelectedState()) {
  const lgaValues = nigeriaData[stateName] || [];
  const pricingCities = Object.keys(pricingConfig?.states?.[stateName]?.cities || {});
  return findMatchingValue([...lgaValues, ...pricingCities], elements.city.value);
}

function getKnownAreaOptions(stateName = getSelectedState(), cityName = getSelectedCity(stateName)) {
  return Object.keys(pricingConfig?.states?.[stateName]?.cities?.[cityName]?.areas || {});
}

function getSelectedKnownArea(stateName = getSelectedState(), cityName = getSelectedCity(stateName)) {
  return findMatchingValue(getKnownAreaOptions(stateName, cityName), elements.area.value);
}

function getEffectiveArea() {
  const manualArea = normalizeLocationText(elements.manualArea.value);
  if (manualArea) return manualArea;
  return getSelectedKnownArea();
}

function getLocationSelection() {
  const stateName = getSelectedState();
  const cityName = getSelectedCity(stateName);
  const knownArea = getSelectedKnownArea(stateName, cityName);
  const manualArea = normalizeLocationText(elements.manualArea.value);

  return {
    stateName,
    cityName,
    knownArea,
    manualArea,
    effectiveArea: manualArea || knownArea
  };
}

function isLocationStepValid() {
  const location = getLocationSelection();
  return Boolean(location.stateName && location.cityName && location.effectiveArea);
}

function attachEvents() {
  elements.startEstimate.addEventListener("click", () => showEstimator());
  elements.backToLanding.addEventListener("click", () => showLanding());
  elements.prevStep.addEventListener("click", previousStep);
  elements.nextStep.addEventListener("click", nextStep);
  elements.state.addEventListener("change", updateCities);
  elements.city.addEventListener("change", updateAreas);
  elements.area.addEventListener("change", () => {
    updateLocationMessage();
    updateStep();
  });
  elements.manualArea.addEventListener("input", () => {
    updateLocationMessage();
    updateStep();
  });
  elements.takePhotoBtn.addEventListener("click", () => elements.cameraInput.click());
  elements.galleryBtn.addEventListener("click", () => elements.galleryInput.click());
  elements.cameraInput.addEventListener("change", (event) => handleFiles(event.target.files));
  elements.galleryInput.addEventListener("change", (event) => handleFiles(event.target.files));
  elements.uploadDropZone.addEventListener("click", (event) => {
    if (!event.target.closest("button")) elements.galleryInput.click();
  });
  elements.uploadDropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      elements.galleryInput.click();
    }
  });
  elements.uploadDropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    elements.uploadDropZone.classList.add("dragging");
  });
  elements.uploadDropZone.addEventListener("dragleave", () => elements.uploadDropZone.classList.remove("dragging"));
  elements.uploadDropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    elements.uploadDropZone.classList.remove("dragging");
    handleFiles(event.dataTransfer.files);
  });
  [
    elements.propertyType,
    elements.bedrooms,
    elements.condition,
    elements.finishing
  ].forEach((field) => {
    field.addEventListener("input", updateStep);
    field.addEventListener("change", updateStep);
  });
}

function showEstimator() {
  elements.landing.classList.add("hidden");
  elements.estimator.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLanding() {
  elements.estimator.classList.add("hidden");
  elements.landing.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function populateSelect(select, values, placeholder, optional = false) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  if (optional && values.length) select.value = values[0];
}

function updateCities() {
  const selectedState = getSelectedState();
  populateSelect(elements.city, nigeriaData[selectedState] || [], selectedState === "Other" ? "Manual entry" : "Select city / LGA");
  if (selectedState === "Other") elements.city.value = "Manual entry";
  updateAreas();
  updateStep();
}

function updateAreas() {
  const areas = getKnownAreaOptions();
  populateSelect(elements.area, areas, areas.length ? "Select known area" : "No saved areas yet");
  updateLocationMessage();
  updateStep();
}

function updateLocationMessage() {
  const area = getEffectiveArea();
  elements.locationMessage.textContent = area
    ? `Using ${area} for the valuation assumptions.`
    : "Tip: choose a known area or type the neighbourhood manually.";
}

function buildStepDots() {
  elements.stepDots.innerHTML = "";
  steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${index + 1}</span><small>${step}</small>`;
    elements.stepDots.appendChild(item);
  });
}

function updateStep() {
  elements.panels.forEach((panel, index) => panel.classList.toggle("active", index === currentStep));
  [...elements.stepDots.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === currentStep);
    dot.classList.toggle("done", index < currentStep);
  });
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  elements.stepTitle.textContent = steps[currentStep];
  elements.stepCounter.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  elements.progressPercent.textContent = `${progress}%`;
  elements.progressBar.style.width = `${progress}%`;
  elements.prevStep.disabled = currentStep === 0;
  elements.nextStep.textContent = currentStep === steps.length - 1 ? "Estimate Property Value" : "Continue";
  elements.nextStep.disabled = currentStep === 2 && !canContinue(currentStep);
}

function canContinue(stepIndex) {
  if (stepIndex === 1) return isLocationStepValid();
  if (stepIndex === 2) return Boolean(elements.propertyType.value && elements.bedrooms.value !== "" && elements.condition.value && elements.finishing.value);
  return true;
}

function nextStep() {
  if (!canContinue(currentStep)) {
    showValidationMessage();
    return;
  }
  if (currentStep === steps.length - 1) {
    runEstimate();
    return;
  }
  currentStep += 1;
  updateStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function previousStep() {
  if (currentStep === 0) return;
  currentStep -= 1;
  updateStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showValidationMessage() {
  if (currentStep === 1) {
    elements.locationMessage.textContent = "Please select a state, city/LGA, and either choose a known area or enter the area manually.";
  }
}

function handleFiles(fileList) {
  elements.photoError.textContent = "";
  const incomingFiles = [...fileList];
  if (!incomingFiles.length) return;

  if (selectedPhotos.length + incomingFiles.length > MAX_PHOTOS) {
    elements.photoError.textContent = "You can upload a maximum of 5 photos. Remove one photo before adding more.";
  }

  incomingFiles.slice(0, MAX_PHOTOS - selectedPhotos.length).forEach((file) => {
    if (!file.type.startsWith("image/")) {
      elements.photoError.textContent = "Only image files are supported. Please choose JPG, PNG, WEBP or GIF photos.";
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      elements.photoError.textContent = `${file.name} is larger than 6MB. Please choose a smaller image.`;
      return;
    }
    selectedPhotos.push({ id: window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`, file, url: URL.createObjectURL(file) });
  });

  elements.cameraInput.value = "";
  elements.galleryInput.value = "";
  renderPhotos();
}

function renderPhotos() {
  elements.photoGrid.innerHTML = "";
  selectedPhotos.forEach((photo, index) => {
    const card = document.createElement("figure");
    card.className = "photo-preview";
    card.innerHTML = `<img src="${photo.url}" alt="Selected property photo ${index + 1}"><button type="button" aria-label="Remove photo ${index + 1}">Remove</button>`;
    card.querySelector("button").addEventListener("click", () => removePhoto(photo.id));
    elements.photoGrid.appendChild(card);
  });
  updateStep();
}

function removePhoto(photoId) {
  const photo = selectedPhotos.find((item) => item.id === photoId);
  if (photo) URL.revokeObjectURL(photo.url);
  selectedPhotos = selectedPhotos.filter((item) => item.id !== photoId);
  elements.photoError.textContent = "";
  renderPhotos();
}

function getAreaName() {
  return getEffectiveArea();
}

function getNumber(element, fallback = 0) {
  const value = Number(element.value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function runEstimate() {
  elements.readyToEstimate.classList.add("hidden");
  elements.resultCard.classList.add("hidden");
  elements.resultLoading.classList.remove("hidden");
  elements.nextStep.disabled = true;

  window.setTimeout(() => {
    lastResult = calculateEstimate();
    renderResult(lastResult);
    elements.resultLoading.classList.add("hidden");
    elements.resultCard.classList.remove("hidden");
    elements.nextStep.disabled = false;
    elements.nextStep.textContent = "Refresh Estimate";
  }, 750);
}

function calculateEstimate() {
  const { stateName, cityName, effectiveArea: areaName } = getLocationSelection();
  const bedrooms = getNumber(elements.bedrooms);
  const bathrooms = getNumber(elements.bathrooms, bedrooms || 1);
  const toilets = getNumber(elements.toilets, Math.max(bathrooms, bedrooms));
  const landSize = getNumber(elements.landSize);
  const age = getNumber(elements.buildingAge);
  const statePricing = pricingConfig?.states?.[stateName];
  const cityPricing = statePricing?.cities?.[cityName];
  const areaPrice = cityPricing?.areas?.[areaName];
  const basePrice = areaPrice || cityPricing?.defaultBasePrice || statePricing?.defaultBasePrice || pricingConfig?.defaultBasePrice || 22000000;
  const multipliers = pricingConfig?.multipliers || {};

  const propertyMultiplier = multipliers.propertyType?.[elements.propertyType.value] || 1;
  const conditionMultiplier = multipliers.condition?.[elements.condition.value] || 1;
  const finishingMultiplier = multipliers.finishing?.[elements.finishing.value] || 1;
  const roadMultiplier = multipliers.roadAccess?.[elements.roadAccess.value] || 1;
  const powerMultiplier = multipliers.power?.[elements.power.value] || 1;
  const waterMultiplier = multipliers.water?.[elements.water.value] || 1;
  const securityMultiplier = multipliers.security?.[elements.security.value] || 1;
  const bedroomMultiplier = elements.propertyType.value === "Land only" ? 1 : 1 + Math.max(bedrooms - 3, -2) * 0.075;
  const bathToiletMultiplier = elements.propertyType.value === "Land only" ? 1 : 1 + Math.min((bathrooms + toilets) * 0.012, 0.16);
  const landMultiplier = landSize > 0 ? Math.min(Math.max(landSize / 600, 0.72), 1.45) : 1;
  const ageMultiplier = age > 0 ? Math.max(0.82, 1 - Math.min(age, 35) * 0.006) : 1;

  const midpoint = Math.round((basePrice * propertyMultiplier * conditionMultiplier * finishingMultiplier * roadMultiplier * powerMultiplier * waterMultiplier * securityMultiplier * bedroomMultiplier * bathToiletMultiplier * landMultiplier * ageMultiplier) / 100000) * 100000;
  const confidence = calculateConfidence(Boolean(areaPrice), landSize, age);
  const rangeSpread = confidence >= 80 ? 0.12 : confidence >= 65 ? 0.16 : 0.22;
  const low = Math.round((midpoint * (1 - rangeSpread)) / 100000) * 100000;
  const high = Math.round((midpoint * (1 + rangeSpread)) / 100000) * 100000;

  const positiveFactors = buildPositiveFactors({ areaPrice, landSize, roadMultiplier, powerMultiplier, waterMultiplier, securityMultiplier, conditionMultiplier, finishingMultiplier });
  const negativeFactors = buildNegativeFactors({ areaPrice, roadMultiplier, powerMultiplier, waterMultiplier, securityMultiplier, conditionMultiplier, age, landSize });

  return {
    success: true,
    estimate: { low, midpoint, high, currency: pricingConfig?.currency || "NGN", confidence },
    propertySummary: {
      location: `${areaName}, ${cityName}, ${statePricing?.displayName || stateName}`,
      propertyType: elements.propertyType.value,
      bedrooms,
      bathrooms,
      toilets,
      condition: elements.condition.value,
      finishing: elements.finishing.value,
      photos: selectedPhotos.length
    },
    positiveFactors,
    negativeFactors,
    assumptions: [
      `Base pricing uses ${areaPrice ? "the selected area" : cityPricing ? "the selected city/LGA" : statePricing ? "the selected state" : "the default Other/manual location"} assumption from data/location-pricing.json.`,
      "Uploaded photos improve confidence only; no external AI image analysis or cloud upload is used in this phase.",
      "The estimate is a range because Nigerian property prices vary by title, exact street, negotiation, and market timing."
    ],
    disclaimer: DISCLAIMER
  };
}

function calculateConfidence(hasKnownArea, landSize, age) {
  let confidence = 48;
  if (elements.state.value && elements.city.value) confidence += 10;
  if (hasKnownArea || elements.manualArea.value.trim()) confidence += hasKnownArea ? 10 : 5;
  if (elements.propertyType.value && elements.bedrooms.value !== "") confidence += 10;
  if (elements.condition.value && elements.finishing.value) confidence += 8;
  confidence += Math.min(selectedPhotos.length * 4, 16);
  if (landSize > 0) confidence += 4;
  if (age > 0) confidence += 2;
  return Math.min(confidence, 92);
}

function buildPositiveFactors(values) {
  const factors = [];
  if (values.areaPrice) factors.push("Known area pricing assumption selected.");
  if (selectedPhotos.length) factors.push(`${selectedPhotos.length} photo${selectedPhotos.length > 1 ? "s" : ""} added to support confidence.`);
  if (values.conditionMultiplier > 1) factors.push(`${elements.condition.value} building condition increases value.`);
  if (values.finishingMultiplier > 1) factors.push(`${elements.finishing.value} finishing quality adds a premium.`);
  if (values.roadMultiplier > 1) factors.push(`${elements.roadAccess.value} improves accessibility.`);
  if (values.powerMultiplier > 1) factors.push(`${elements.power.value} supports livability and value.`);
  if (values.waterMultiplier > 1) factors.push(`${elements.water.value} supports utility reliability.`);
  if (values.securityMultiplier > 1) factors.push(`${elements.security.value} adds a security premium.`);
  if (values.landSize >= 600) factors.push("Land size is above the common 600sqm reference point.");
  return factors.length ? factors : ["Core property details were provided for a structured estimate."];
}

function buildNegativeFactors(values) {
  const factors = [];
  if (!values.areaPrice) factors.push("Exact area was not in the pricing config, so broader location assumptions were used.");
  if (!selectedPhotos.length) factors.push("No photos were uploaded, so confidence is lower.");
  if (values.conditionMultiplier < 1) factors.push(`${elements.condition.value} condition reduces the estimate.`);
  if (values.roadMultiplier < 1) factors.push(`${elements.roadAccess.value} can reduce buyer demand.`);
  if (values.powerMultiplier < 1) factors.push(`${elements.power.value} can reduce livability.`);
  if (values.waterMultiplier < 1) factors.push(`${elements.water.value} can reduce utility reliability.`);
  if (values.securityMultiplier < 1) factors.push(`${elements.security.value} may reduce perceived safety.`);
  if (values.age > 15) factors.push("Older building age may require maintenance allowance.");
  if (values.landSize > 0 && values.landSize < 450) factors.push("Land size is below the common 600sqm reference point.");
  return factors.length ? factors : ["No major risk factors were selected in the optional inputs."];
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

function renderResult(result) {
  const summary = result.propertySummary;
  elements.resultCard.innerHTML = `
    <div class="result-hero reveal-card">
      <span class="badge">AI-assisted estimate</span>
      <p>Estimated midpoint</p>
      <strong>${formatCurrency(result.estimate.midpoint)}</strong>
      <span class="range">${formatCurrency(result.estimate.low)} – ${formatCurrency(result.estimate.high)}</span>
      <div class="confidence"><span>Confidence</span><strong>${result.estimate.confidence}%</strong><div><i style="width:${result.estimate.confidence}%"></i></div></div>
    </div>
    <div class="result-grid">
      ${renderInfoCard("Property summary", [summary.propertyType, `${summary.bedrooms} bedroom(s)`, `${summary.bathrooms} bathroom(s)`, `${summary.toilets} toilet(s)`, summary.condition, `${summary.finishing} finishing`])}
      ${renderInfoCard("Location summary", [summary.location, `${summary.photos} photo(s) added`, result.estimate.currency])}
      ${renderInfoCard("Key value drivers", result.positiveFactors)}
      ${renderInfoCard("Risk factors", result.negativeFactors)}
      ${renderInfoCard("Assumptions", result.assumptions)}
    </div>
    <div class="disclaimer-card"><strong>Disclaimer</strong><p>${result.disclaimer}</p></div>
    <div class="result-actions">
      <a class="btn btn-primary" href="${CONTACT_URL}" target="_blank" rel="noopener">Request Professional Inspection</a>
      <a class="btn btn-secondary" href="${CONTACT_URL}" target="_blank" rel="noopener">Contact Tafid Real Estate</a>
      <button class="btn btn-light" type="button" id="startAnother">Start Another Estimate</button>
    </div>
  `;
  $("startAnother").addEventListener("click", resetEstimate);
}

function renderInfoCard(title, items) {
  return `<article class="info-card"><h4>${title}</h4><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;
}

function resetEstimate() {
  selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
  selectedPhotos = [];
  lastResult = null;
  document.getElementById("estimateForm").reset();
  populateSelect(elements.state, Object.keys(nigeriaData), "Select state");
  updateCities();
  renderPhotos();
  elements.resultCard.classList.add("hidden");
  elements.resultCard.innerHTML = "";
  elements.readyToEstimate.classList.remove("hidden");
  currentStep = 0;
  updateStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((error) => console.warn("Service worker registration failed", error));
  });
}

document.addEventListener("DOMContentLoaded", init);
