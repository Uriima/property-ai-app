async function estimate(){

const city = document.getElementById("city").value;
const area = document.getElementById("area").value;
const bedrooms = document.getElementById("bedrooms").value;

document.getElementById("result").innerText = "Estimating value...";

try{

const response = await fetch(
"https://9b033143-d8d4-419c-9e55-6ae38a6ed3d2-00-1qy1ac247p5ec.worf.replit.dev/api/estimate",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
city:city,
area:area,
bedrooms:bedrooms
})
}
);

const data = await response.json();

document.getElementById("result").innerText =
"Estimated Value: ₦ " + data.price;

}catch(error){

document.getElementById("result").innerText =
"Error connecting to server.";

console.error(error);

}

}
