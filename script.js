const inputbox = document.getElementById("inputbox")
const resultcontainer = document.getElementById("resultcont");
const error = document.getElementById("error");
// took reference fromGeoApifi
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  fetchTimeZone(position.coords.latitude, position.coords.longitude,0);
}
//geoApi link to fetch the location
function fetchTimeZone(lat,lon){
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=66826cc390e94a21a7285de97ae4168d`)
    .then(resp => resp.json())
    .then((result) => {
        yourTimeZone(result.results[0],lat,lon);
    });
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
function search(){
    const address = inputbox.value;

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=66826cc390e94a21a7285de97ae4168d`)
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
document.addEventListener("DOMContentLoaded", getLocation);
