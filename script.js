//*** Récuperer le formulaire */
const form = document.querySelector("form")
const input = document.querySelector("input")
const meteoHtml = document.querySelector(".météo")
//*** écouter l'évenement de soumission du formulaire */n

const API_KEY = "30bbe02aa131b812b5dd28e61f9d0d85"

form.addEventListener("submit", function (event) {
    event.preventDefault()
    getData(input.value)
    form.reset()
}) 

//*** Programme qui récupere les données méteo */

async function getData(city) {
    //*** Il permet de fair eun appel http */
    const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30bbe02aa131b812b5dd28e61f9d0d85&units=metric&lang=fr`)
    const weather = await reponse.json()
    displayWeather(weather)
}

//*** programme qui affiche les données météo */

function displayWeather(weather) {

        meteoHtml.innerHTML = `
            <h1>Données Méteo pour ${weather.name} </h1>
            <h2>Temps ${(weather.weather[0].description)}</h2>
            <p>Température ${Math.round(weather.main.temp)}°C</p>
            <p>Température ressenti ${Math.round(weather.main.feels_like)}°C</p>
            <p>Humidité ${Math.round(weather.main.humidity)}%</p>
        `
}

//*** Geolocalisation */
navigator.geolocation.getCurrentPosition(success, error)

//*** En cas de succés (l'utilisateur accepte de donner sa position) */

async function success(pos) {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=30bbe02aa131b812b5dd28e61f9d0d85`
    const reponse = await fetch(url)
    const weather = await reponse(url)
    displayWeather(weather)

}

//*** En cas d'erreur (l'utilisateur refuse de donner sa position) */

function error() {
    meteoHtml.innerHTML = "<h1> Vous avez refuser la localisastion. <br>Entrez le nom d'une ville </h1>"
}
