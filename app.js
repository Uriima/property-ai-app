// ======================================
// Nigeria States + LGAs (All 36 + FCT)
// ======================================

const nigeriaData = {

Abia:["Aba North","Aba South","Arochukwu","Bende","Ikwuano","Isiala Ngwa North","Isiala Ngwa South","Isuikwuato","Obi Ngwa","Ohafia","Osisioma","Ugwunagbo","Ukwa East","Ukwa West","Umuahia North","Umuahia South","Umu Nneochi"],

Adamawa:["Demsa","Fufore","Ganye","Girei","Gombi","Guyuk","Hong","Jada","Lamurde","Madagali","Maiha","Mayo Belwa","Michika","Mubi North","Mubi South","Numan","Shelleng","Song","Toungo","Yola North","Yola South"],

AkwaIbom:["Abak","Eastern Obolo","Eket","Esit Eket","Essien Udim","Etim Ekpo","Etinan","Ibeno","Ibesikpo Asutan","Ibiono Ibom","Ika","Ikono","Ikot Abasi","Ikot Ekpene","Ini","Itu","Mbo","Mkpat Enin","Nsit Atai","Nsit Ibom","Nsit Ubium","Obot Akara","Okobo","Onna","Oron","Oruk Anam","Udung Uko","Ukanafun","Uruan","Urue Offong Oruko","Uyo"],

Anambra:["Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum","Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North","Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"],

Bauchi:["Alkaleri","Bauchi","Bogoro","Damban","Darazo","Dass","Ganjuwa","Giade","Itas Gadau","Jamaare","Katagum","Kirfi","Misau","Ningi","Shira","Tafawa Balewa","Toro","Warji","Zaki"],

Bayelsa:["Brass","Ekeremor","Kolokuma Opokuma","Nembe","Ogbia","Sagbama","Southern Ijaw","Yenagoa"],

Benue:["Agatu","Apa","Buruku","Gboko","Guma","Gwer East","Gwer West","Katsina Ala","Konshisha","Kwande","Logo","Makurdi","Obi","Ogbadibo","Ohimini","Oju","Okpokwu","Otukpo","Tarka","Ukum","Ushongo","Vandeikya"],

Borno:["Abadam","Askira Uba","Bama","Bayo","Biu","Chibok","Damboa","Gubio","Guzamala","Gwoza","Hawul","Jere","Kaga","Kala Balge","Konduga","Kukawa","Kwaya Kusar","Mafa","Magumeri","Maiduguri","Marte","Mobbar","Monguno","Ngala","Nganzai"],

CrossRiver:["Akamkpa","Akpabuyo","Bakassi","Bekwarra","Biase","Boki","Calabar Municipal","Calabar South","Etung","Ikom","Obanliku","Obubra","Obudu","Odukpani","Ogoja","Yala"],

Delta:["Aniocha North","Aniocha South","Bomadi","Burutu","Ethiope East","Ethiope West","Ika North East","Ika South","Isoko North","Isoko South","Ndokwa East","Ndokwa West","Okpe","Oshimili North","Oshimili South","Patani","Sapele","Udu","Ughelli North","Ughelli South","Ukwuani","Uvwie","Warri North","Warri South","Warri South West"],

Ebonyi:["Abakaliki","Afikpo North","Afikpo South","Ebonyi","Ezza North","Ezza South","Ikwo","Ishielu","Ivo","Izzi","Ohaozara","Ohaukwu","Onicha"],

Edo:["Akoko Edo","Egor","Esan Central","Esan North East","Esan South East","Esan West","Etsako Central","Etsako East","Etsako West","Igueben","Ikpoba Okha","Oredo","Orhionmwon","Ovia North East","Ovia South West","Uhunmwonde"],

Ekiti:["Ado Ekiti","Efon","Ekiti East","Ekiti South West","Ekiti West","Emure","Gbonyin","Ido Osi","Ijero","Ikere","Ikole","Ilejemeje","Irepodun Ifelodun","Ise Orun","Moba","Oye"],

Enugu:["Aninri","Awgu","Enugu East","Enugu North","Enugu South","Ezeagu","Igbo Etiti","Igbo Eze North","Igbo Eze South","Isi Uzo","Nkanu East","Nkanu West","Nsukka","Oji River","Udenu","Udi","Uzo Uwani"],

FCT:["Abaji","Bwari","Gwagwalada","Kuje","Kwali","Municipal Area Council"],

Gombe:["Akko","Balanga","Billiri","Dukku","Funakaye","Gombe","Kaltungo","Kwami","Shongom","Yamaltu Deba"],

Imo:["Aboh Mbaise","Ahiazu Mbaise","Ehime Mbano","Ezinihitte","Ideato North","Ideato South","Ihitte Uboma","Ikeduru","Isiala Mbano","Isu","Mbaitoli","Ngor Okpala","Njaba","Nkwerre","Nwangele","Obowo","Oguta","Ohaji Egbema","Okigwe","Onuimo","Orlu","Orsu","Oru East","Oru West","Owerri Municipal","Owerri North","Owerri West"],

Kano:["Ajingi","Albasu","Bagwai","Bebeji","Bichi","Bunkure","Dala","Dambatta","Dawakin Kudu","Dawakin Tofa","Doguwa","Fagge","Garko","Garun Mallam","Gaya","Gezawa","Gwale","Gwarzo","Kabo","Kano Municipal","Kiru","Kumbotso","Kunchi","Kura","Madobi","Makoda","Minjibir","Nasarawa","Rano","Rimin Gado","Rogo","Shanono","Sumaila","Takai","Tarauni","Tofa","Tsanyawa","Tudun Wada","Ungogo","Warawa","Wudil"],

Lagos:["Agege","Ajeromi Ifelodun","Alimosho","Amuwo Odofin","Apapa","Badagry","Epe","Eti Osa","Ibeju Lekki","Ifako Ijaiye","Ikeja","Ikorodu","Kosofe","Lagos Island","Lagos Mainland","Mushin","Ojo","Oshodi Isolo","Shomolu","Surulere"],

Nasarawa:["Akwanga","Awe","Doma","Karu","Keana","Keffi","Kokona","Lafia","Nasarawa","Nasarawa Egon","Obi","Toto","Wamba"],

Niger:["Agaie","Agwara","Bida","Borgu","Bosso","Chanchaga","Edati","Gbako","Gurara","Katcha","Kontagora","Lapai","Lavun","Magama","Mariga","Mashegu","Mokwa","Munya","Paikoro","Rafi","Rijau","Shiroro","Suleja","Tafa","Wushishi"],

Ogun:["Abeokuta North","Abeokuta South","Ado Odo Ota","Egbado North","Egbado South","Ewekoro","Ifo","Ijebu East","Ijebu North","Ijebu North East","Ijebu Ode","Ikenne","Imeko Afon","Ipokia","Obafemi Owode","Odeda","Odogbolu","Ogun Waterside","Remo North","Sagamu"],

Ondo:["Akoko North East","Akoko North West","Akoko South East","Akoko South West","Akure North","Akure South","Ese Odo","Idanre","Ifedore","Ilaje","Ile Oluji Okeigbo","Irele","Odigbo","Okitipupa","Ondo East","Ondo West","Ose","Owo"],

Osun:["Atakunmosa East","Atakunmosa West","Boluwaduro","Boripe","Ede North","Ede South","Egbedore","Ejigbo","Ife Central","Ife East","Ife North","Ife South","Ifedayo","Ifelodun","Ila","Ilesa East","Ilesa West","Irepodun","Irewole","Isokan","Iwo","Obokun","Odo Otin","Ola Oluwa","Olorunda","Oriade","Orolu","Osogbo"],

Oyo:["Afijio","Akinyele","Atiba","Atisbo","Egbeda","Ibadan North","Ibadan North East","Ibadan North West","Ibadan South East","Ibadan South West","Ibarapa Central","Ibarapa East","Ibarapa North","Ido","Irepo","Iseyin","Itesiwaju","Iwajowa","Kajola","Lagelu","Ogbomosho North","Ogbomosho South","Ogo Oluwa","Olorunsogo","Oluyole","Ona Ara","Orelope","Ori Ire","Oyo East","Oyo West","Saki East","Saki West","Surulere"],

Plateau:["Barkin Ladi","Bassa","Bokkos","Jos East","Jos North","Jos South","Kanam","Kanke","Langtang North","Langtang South","Mangu","Mikang","Qua An Pan","Riyom","Shendam","Wase"],

Rivers:["Abua Odual","Ahoada East","Ahoada West","Akuku Toru","Andoni","Asari Toru","Bonny","Degema","Eleme","Emohua","Etche","Gokana","Ikwerre","Khana","Obio Akpor","Ogba Egbema Ndoni","Ogu Bolo","Okrika","Omuma","Opobo Nkoro","Oyigbo","Port Harcourt","Tai"],

Sokoto:["Binji","Bodinga","Dange Shuni","Gada","Goronyo","Gudu","Gwadabawa","Illela","Isa","Kebbe","Kware","Rabah","Sabon Birni","Shagari","Silame","Sokoto North","Sokoto South","Tambuwal","Tangaza","Tureta","Wamako","Wurno","Yabo"],

Taraba:["Ardo Kola","Bali","Donga","Gashaka","Gassol","Ibi","Jalingo","Karim Lamido","Kumi","Lau","Sardauna","Takum","Ussa","Wukari","Yorro","Zing"],

Yobe:["Bade","Bursari","Damaturu","Fika","Fune","Geidam","Gujba","Gulani","Jakusko","Karasuwa","Machina","Nangere","Nguru","Tarmuwa","Yunusari","Yusufari"],

Zamfara:["Anka","Bakura","Birnin Magaji","Bukkuyum","Gummi","Gusau","Kaura Namoda","Maradun","Maru","Shinkafi","Talata Mafara","Tsafe","Zurmi"]

};


// ======================================
// Populate State + LGA dropdown
// ======================================

const citySelect=document.getElementById("city");
const areaSelect=document.getElementById("area");

Object.keys(nigeriaData).forEach(state=>{

const option=document.createElement("option");
option.value=state;
option.textContent=state;

citySelect.appendChild(option);

});

citySelect.addEventListener("change",()=>{

areaSelect.innerHTML='<option value="">--Select Area--</option>';

const areas=nigeriaData[citySelect.value]||[];

areas.forEach(area=>{

const option=document.createElement("option");
option.value=area;
option.textContent=area;

areaSelect.appendChild(option);

});

});


// ======================================
// Camera + Gallery Upload
// ======================================

let selectedImages=[];

function openCamera(){

document.getElementById("cameraInput").click();

}

function openGallery(){

document.getElementById("galleryInput").click();

}

document.getElementById("cameraInput").addEventListener("change",handleImages);
document.getElementById("galleryInput").addEventListener("change",handleImages);

function handleImages(event){

const files=Array.from(event.target.files);

files.forEach(file=>{

if(selectedImages.length<5){

selectedImages.push(file);

}

});

showPreview();

}

function showPreview(){

const preview=document.getElementById("preview");
preview.innerHTML="";

selectedImages.forEach(file=>{

const img=document.createElement("img");
img.src=URL.createObjectURL(file);

preview.appendChild(img);

});

}


// ======================================
// Estimate Property Value
// ======================================

async function estimate(){

const city=citySelect.value;
const area=areaSelect.value;
const bedrooms=document.getElementById("bedrooms").value;

const resultEl=document.getElementById("result");

if(!city || !area || !bedrooms){

resultEl.innerText="Please complete all fields";
return;

}

resultEl.innerText="Estimating property value...";

try{

const formData=new FormData();

formData.append("city",city);
formData.append("area",area);
formData.append("bedrooms",bedrooms);

selectedImages.forEach(file=>{
formData.append("images",file);
});

const response=await fetch(

"https://ac24cbe7-acbd-4473-90d0-1c5cc04fc244-00-1fy8wqlwog2wc.worf.replit.dev/api/estimate",

{method:"POST",body:formData}

);

if(!response.ok) throw new Error("Server error");

const data=await response.json();

resultEl.innerText="Estimated Value: ₦ "+data.price;

}catch(error){

resultEl.innerText="Server connection failed.";
console.error(error);

}

}