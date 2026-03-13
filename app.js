async function estimate() {

let city = document.getElementById("city").value
let bedrooms = document.getElementById("bedrooms").value

let response = await fetch("/api/estimate", {
method:"POST",
body:JSON.stringify({city, bedrooms})
})

let data = await response.json()

document.getElementById("result").innerHTML =
"Estimated Value: " + data.price

}