function formatedDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0{hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

let now = document.querySelector("li.time");
let currentTime = new Date();
now.innerHTML = formatedDate(currentTime);

function displayWeather(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#digit").innerHTML = `${roundedTemp}°C`;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#winds").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";

  let precipitation = "N/A";
  if (response.data.rain) {
    precipitation = (response.data.rain["1h"] || 0) * 100;
  } else if (response.data.snow) {
    precipitation = (response.data.snow["1h"] || 0) * 100;
  }

  let precipitationText =
    precipitation !== "N/A" ? precipitation.toFixed(1) + "%" : precipitation;
  document.querySelector("#precipitation").innerHTML = precipitationText;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fd665f227453ba8279e3d39e454b700&units=metric`;
  let apiKey = "6fd665f227453ba8279e3d39e454b700";
  axios.get(apiUrl).then(displayWeather);
}

function press(event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", press);
searchCity("Cape Town");

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6fd665f227453ba8279e3d39e454b700";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", displayLocation);
