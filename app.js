const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const timeElement = document.querySelector(".current-time p");
const buttonGrevena = document.querySelector(".button-grevena");
const buttonAthens = document.querySelector(".button-athens");
const buttonLondon = document.querySelector(".button-london");
const buttonNewYork = document.querySelector(".button-new-york");
const buttonLosAngeles = document.querySelector(".button-la");
const buttonHongKong = document.querySelector(".button-hong-kong");
const buttonThess = document.querySelector(".button-thess");

const KELVIN = 273;
const key = "1f2a7bac836242d4c7a25e78ab990fa4";
let data = new Date()

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let latitude = 40.083549;
let longitude = 21.425840;

getWeather(latitude , longitude);

setInterval(setTime , 1000);

const weather = {
    temperature : {
        value : 18,
        unit : "celsius"
    },
    description : "few clouds",
    iconId : "01d",
    city : "Athens",
    country : "GR"
};

buttonGrevena.addEventListener(('click') , () => {
    let latitude = 40.083549;
    let longitude = 21.425840;
    getWeather(latitude , longitude);
})

buttonThess.addEventListener(('click') , () => {
    let latitude = 40.640064;
    let longitude = 22.944420;
    getWeather(latitude , longitude);
})

buttonAthens.addEventListener(('click') , () => {
    let latitude = 37.983810;
    let longitude = 23.727539;
    getWeather(latitude , longitude);
})

buttonLondon.addEventListener(('click') , () => {
    latitude = 51.507351;
    longitude = -0.127758;
    getWeather(latitude , longitude);
})

buttonNewYork.addEventListener(('click') , () => {
    latitude = 40.712776;
    longitude = -74.005974
    getWeather(latitude , longitude);
})

buttonHongKong.addEventListener(('click') , () => {
    latitude = 22.396427;
    longitude = 114.109497;
    getWeather(latitude , longitude);
})

buttonLosAngeles.addEventListener(('click') , () => {
    latitude = 34.052235;
    longitude = -118.243683;
    getWeather(latitude , longitude);
})

tempElement.addEventListener('click' , () => {
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celcius"){
        let farenheit = celciusToFahrenheit(weather.temperature.value);
        farenheit = Math.floor(farenheit);
        tempElement.innerHTML = farenheit+"° <span>F</span>";
        weather.temperature.unit = "farenheit";
    } else {
        tempElement.innerHTML = weather.temperature.value+"° <span>C</span>";
        weather.temperature.unit = "celcius";
    }
});

function setTime(){
    const currentDate = new Date();
    timeElement.innerText = currentDate.toUTCString('it-IT');
}

function displayWeather() {

    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = weather.temperature.value+"° <span>C</span>";
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = weather.city + ", " + weather.country;
}

function celciusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

function setPosition(lat , long){
    let latitude = lat;
    let longitude = long;
    getWeather(latitude , longitude);
}
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML="<p>"+error.message+"</p>";
}

function getWeather(latitude , longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api) 
        .then(function(response){
            let data = response.json();
            return data;
    }) .then(function(data){
            console.log(data);
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
    }) .then(function(){
            displayWeather();
    });
}



