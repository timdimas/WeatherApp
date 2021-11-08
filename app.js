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
const videoBtn = document.getElementById("videoBtn");
const iconPlayPause = document.querySelector(".fa-play");
const radioTimer = document.querySelector(".timer");
const videoSource = document.getElementById("video-source");
const dropdownContent = document.querySelector(".dropdown-content");

const video = document.getElementById("myVideo");
video.pause();

const radio = document.getElementById("radio");
radio.volume = 0.2;

const KELVIN = 273;
const key = "1f2a7bac836242d4c7a25e78ab990fa4";
let data = new Date();

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let latitude = 40.083549;
let longitude = 21.42584;

getWeather(latitude, longitude);

setInterval(setTime, 1000);

const weather = {
   temperature: {
      value: 18,
      unit: "celsius",
   },
   description: "few clouds",
   iconId: "01d",
   city: "Athens",
   country: "GR",
};

buttonGrevena.addEventListener("click", () => {
   let latitude = 40.083549;
   let longitude = 21.42584;
   getWeather(latitude, longitude);
   // dropdownContent.style.display = "none";
});

buttonThess.addEventListener("click", () => {
   let latitude = 40.640064;
   let longitude = 22.94442;
   getWeather(latitude, longitude);
});

buttonAthens.addEventListener("click", () => {
   let latitude = 37.98381;
   let longitude = 23.727539;
   getWeather(latitude, longitude);
});

buttonLondon.addEventListener("click", () => {
   latitude = 51.507351;
   longitude = -0.127758;
   getWeather(latitude, longitude);
});

buttonNewYork.addEventListener("click", () => {
   latitude = 40.712776;
   longitude = -74.005974;
   getWeather(latitude, longitude);
});

buttonHongKong.addEventListener("click", () => {
   latitude = 22.396427;
   longitude = 114.109497;
   getWeather(latitude, longitude);
});

buttonLosAngeles.addEventListener("click", () => {
   latitude = 34.052235;
   longitude = -118.243683;
   getWeather(latitude, longitude);
});

tempElement.addEventListener("click", () => {
   if (weather.temperature.value === undefined) return;
   if (weather.temperature.unit === "celcius") {
      let farenheit = celciusToFahrenheit(weather.temperature.value);
      farenheit = Math.floor(farenheit);
      tempElement.innerHTML = farenheit + "° <span>F</span>";
      weather.temperature.unit = "farenheit";
   } else {
      tempElement.innerHTML = weather.temperature.value + "° <span>C</span>";
      weather.temperature.unit = "celcius";
   }
});

videoBtn.addEventListener("click", () => {
   if (video.paused) {
      video.style.display = "block";
      video.play();
      videoBtn.innerHTML = "Pause";
   } else {
      video.style.display = "none";
      video.pause();
      videoBtn.innerHTML = "Play";
   }
});

iconPlayPause.addEventListener("click", () => {
   if (iconPlayPause.className === "fas fa-play") {
      radio.play();
      iconPlayPause.className = "fas fa-pause";
   } else {
      radio.pause();
      iconPlayPause.className = "fas fa-play";
   }
});

function setTime() {
   const currentDate = new Date();
   timeElement.innerText =
      currentDate.toLocaleDateString("it-IT") +
      "  " +
      currentDate.toLocaleTimeString("it-IT");
}

function displayWeather() {
   iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
   tempElement.innerHTML = weather.temperature.value + "° <span>C</span>";
   descElement.innerHTML = weather.description;
   locationElement.innerHTML = weather.city + ", " + weather.country;
}

function celciusToFahrenheit(temperature) {
   return (temperature * 9) / 5 + 32;
}

function setPosition(lat, long) {
   let latitude = lat;
   let longitude = long;
   getWeather(latitude, longitude);
}
function showError(error) {
   notificationElement.style.display = "block";
   notificationElement.innerHTML = "<p>" + error.message + "</p>";
}
function showVideo(iconId) {
   if (iconId === "01n") {
      videoSource.src = "icons/Night Sky.mp4";
      video.load();
   } else if (iconId === "02n") {
      videoSource.src = "icons/Clouds.mp4";
      video.load();
   } else if (
      iconId === "09n" ||
      iconId === "09d" ||
      iconId === "10d" ||
      iconId === "10n" ||
      iconId === "11d" ||
      iconId === "11n"
   ) {
      videoSource.src = "icons/Rain.mp4";
      video.load();
   } else if (iconId === "01d") {
      videoSource.src = "icons/Sun.mp4";
      video.load();
   } else if (iconId === "13d" || iconId === "13n") {
      videoSource.src = "icons/Snow.mp4";
      video.load();
   } else {
      videoSource.src = "icons/Top View of a Road in the Forest.mp4";
      video.load();
   }
}

function getWeather(latitude, longitude) {
   let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

   fetch(api)
      .then(function (response) {
         let data = response.json();
         return data;
      })
      .then(function (data) {
         weather.temperature.value = Math.floor(data.main.temp - KELVIN);
         weather.description =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);
         weather.iconId = data.weather[0].icon;
         weather.city = data.name;
         weather.country = data.sys.country;
      })
      .then(function () {
         displayWeather();
         showVideo(weather.iconId);
      });
}
