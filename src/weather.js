const weather = document.querySelector(".js-weather");
const loca = document.querySelector(".js-loca");
const weather_img = document.querySelector(".weather-img");
const API_KEY = "9474882692878ddaad78c03fdefe1dac";

const COORDS_LS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = Math.round(json.main.temp);
      const place = json.name;
      const country = json.sys.country;
      const cloud = json.weather[0].main;
      const icon = json.weather[0].icon;
      weather.innerText = `${temperature}°C`;
      //   loca.innerText = ` ${place}, ${country}`;
      loca.innerText = ` ${place}`;

      weather_img.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${icon}.png`
      );

      //   loca.innerText = `hello`;

      //weather.innerText=&deg;C
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}
function askForLocation() {
  const loc = navigator.geolocation.getCurrentPosition(
    handleGeoSuccess,
    handleGeoError
  );
  console.log(loc);
}
function init() {
  //console.log("hello");
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords === null) {
    askForLocation();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    //print weather
    //https://openweathermap.org/api
  }
}

init();
