const inputaddress = document.getElementById("inputaddress")
const resultcontainer = document.getElementById("contresult");
const error = document.getElementById("error");

function search(){
 const address = inputaddress.value;   
 fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=f794bb88b5aa418d94432848fba8963b`)
 .then(resp => resp.json())
 .then((geocodingResult) => {
    if(geocodingResult.features.length > 0){
         error.classList.add("hide")
         resultcontainer.classList.remove("hide")
         searchTimeZone(geocodingResult.features[0].properties)
        }else{
         resultcontainer.classList.add("hide")
         error.classList.remove("hide")
        }
    });
    return false;
}
// reference took from GeoApify to of3etch using location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
// reference took from GeoApify tofetch using lati ang longi
function showPosition(position) {
  fetchTimeZone(position.coords.latitude, position.coords.longitude,0);
}
// reference took from GeoApify
function fetchTimeZone(lat,lon){
 fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=f794bb88b5aa418d94432848fba8963b`)
.then(resp => resp.json())
.then((result) => {
yourTimeZone(result.results[0],lat,lon);
    });
}
// 
function yourTimeZone(data,lat,lon){
    const name = document.getElementById("name")
    const lati = document.getElementById("lati")
    const longi = document.getElementById("longi")
    const offSTD = document.getElementById("offSTD")
    const offSTDsec = document.getElementById("offSTDsec")
    const offDST = document.getElementById("offDST")
    const offDSTsec = document.getElementById("offDSTsec")
    const country = document.getElementById("country")
    const city = document.getElementById("city")
    const post = document.getElementById("post")

    name.textContent = data.timezone.name;
    lati.textContent = lat;
    longi.textContent = lon;
    offSTD.textContent = data.timezone.offset_DST;
    offSTDsec.textContent = data.timezone.offset_STD_seconds;
    offDST.textContent = data.timezone.offset_DST;
    offDSTsec.textContent = data.timezone.offset_DST_seconds;
    country.textContent = data.country;
    city.textContent = data.city;
    post.textContent = data.postcode;
}
function searchTimeZone(data){
    const name = document.getElementById("name-r")
    const lati = document.getElementById("lati-r")
    const longi = document.getElementById("longi-r")
    const offSTD = document.getElementById("offSTD-r")
    const offSTDsec = document.getElementById("offSTDsec-r")
    const offDST = document.getElementById("offDST-r")
    const offDSTsec = document.getElementById("offDSTsec-r")
    const country = document.getElementById("country-r")
    const city = document.getElementById("city-r")

    name.textContent = data.timezone.name;
    lati.textContent = data.lat;
    longi.textContent = data.lon;
    offSTD.textContent = data.timezone.offset_DST;
    offSTDsec.textContent = data.timezone.offset_STD_seconds;
    offDST.textContent = data.timezone.offset_DST;
    offDSTsec.textContent = data.timezone.offset_DST_seconds;
    country.textContent = data.country;
    city.textContent = data.city;
}
