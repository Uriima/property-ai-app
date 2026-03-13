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
// State Bounding Boxes (Approximate lat/lng)
// Used to auto-select state based on geolocation
// ======================================

const stateBounds = {
  Abia:{minLat:5.3,maxLat:6.2,minLng:7.3,maxLng:8.1},
  Adamawa:{minLat:7.5,maxLat:10.5,minLng:11.0,maxLng:13.9},
  AkwaIbom:{minLat:4.3,maxLat:5.4,minLng:7.5,maxLng:8.3},
  Anambra:{minLat:5.7,maxLat:6.9,minLng:6.7,maxLng:7.2},
  Bauchi:{minLat:9.0,maxLat:11.2,minLng:9.5,maxLng:11.0},
  Bayelsa:{minLat:4.5,maxLat:5.5,minLng:5.9,maxLng:6.8},
  Benue:{minLat:6.3,maxLat:8.0,minLng:7.0,maxLng:10.0},
  Borno:{minLat:10.0,maxLat:13.0,minLng:11.5,maxLng:14.0},
  CrossRiver:{minLat:4.5,maxLat:6.5,minLng:8.0,maxLng:9.5},
  Delta:{minLat:5.0,maxLat:6.5,minLng:5.5,maxLng:6.5},
  Ebonyi:{minLat:5.5,maxLat:6.5,minLng:7.0,maxLng:8.0},
  Edo:{minLat:5.5,maxLat:7.0,minLng:5.5,maxLng:6.8},
  Ekiti:{minLat:7.4,maxLat:8.0,minLng:4.9,maxLng:5.5},
  Enugu:{minLat:5.9,maxLat:7.0,minLng:6.5,maxLng:7.8},
  FCT:{minLat:8.8,maxLat:9.1,minLng:7.2,maxLng:7.6},
  Gombe:{minLat:9.8,maxLat:11.0,minLng:10.0,maxLng:11.5},
  Imo:{minLat:4.8,maxLat:6.1,minLng:6.8,maxLng:7.5},
  Kano:{minLat:11.5,maxLat:13.0,minLng:7.0,maxLng:9.0},
  Lagos:{minLat:6.3,maxLat:6.7,minLng:2.6,maxLng:3.9},
  Nasarawa:{minLat:7.0,maxLat:9.0,minLng:7.0,maxLng:8.0},
  Niger:{minLat:8.0,maxLat:11.0,minLng:4.0,maxLng:6.5},
  Ogun:{minLat:6.5,maxLat:7.5,minLng:3.0,maxLng:4.0},
  Ondo:{minLat:5.5,maxLat:7.0,minLng:4.5,maxLng:6.5},
  Osun:{minLat:7.0,maxLat:8.5,minLng:4.0,maxLng:5.5},
  Oyo:{minLat:7.0,maxLat:8.5,minLng:3.0,maxLng:5.5},
  Plateau:{minLat:8.5,maxLat:10.5,minLng:8.0,maxLng:10.0},
  Rivers:{minLat:4.5,maxLat:6.5,minLng:6.5,maxLng:7.5},
  Sokoto:{minLat:12.5,maxLat:13.9,minLng:4.0,maxLng:6.0},
  Taraba:{minLat:6.5,maxLat:9.0,minLng:9.0,maxLng:11.0},
  Yobe:{minLat:11.0,maxLat:13.5,minLng:10.0,maxLng:13.0},
  Zamfara:{minLat:11.0,maxLat:13.5,minLng:5.0,maxLng:7.0}
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
// Browser Geolocation API: Auto-select State
// ======================================

function detectStateByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        const lat=pos.coords.latitude;
        const lng=pos.coords.longitude;
        console.log("User coordinates:",lat,lng);

        let detectedState=null;
        for(const state in stateBounds){
          const b=stateBounds[state];
          if(lat>=b.minLat && lat<=b.maxLat && lng>=b.minLng && lng<=b.maxLng){
            detectedState=state;
            break;
          }
        }

        if(detectedState){
          citySelect.value=detectedState;
          citySelect.dispatchEvent(new Event("change"));
          console.log("Auto-selected state:",detectedState);
        }
      },
      (err)=>{
        console.warn("Geolocation failed:",err.message);
      }
    );
  } else {
    console.warn("Geolocation not supported.");
  }
}

window.addEventListener("load",detectStateByLocation);

// ======================================
// Camera + Gallery Upload
// ======================================

let selectedImages=[];

function openCamera(){document.getElementById("cameraInput").click();}
function openGallery(){document.getElementById("galleryInput").click();}

document.getElementById("cameraInput").addEventListener("change",handleImages);
document.getElementById("galleryInput").addEventListener("change",handleImages);

function handleImages(event){
  const files=Array.from(event.target.files);
  files.forEach(file=>{
    if(selectedImages.length