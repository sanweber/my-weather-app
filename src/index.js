//Display current date and hour

let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let h6 = document.querySelector("#current-date");
h6.innerHTML = `${day} ${date} ${month} ${year}, ${hour}:${minute}`;

//Update City and Weather (Temp, Wind, Humidity) When Clicking Normal Search

function showWeather(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#felt-like-temperature").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function updateCurrentData(city) {
  let apiKey = "4edf83edc9325a7bcca03c1bbe63d4b4";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  updateCurrentData(city);
}

let form = document.querySelector("form.city-search");
form.addEventListener("submit", submitCity);

//Default City
updateCurrentData("D??sseldorf");

//Update City and Weather (Temp, Wind, Humidity) When Clicking Current Location

//function displayCurrentCityWeather(response) {                          //Funktion doppelt; showWeather erledigt das bereits
//  console.log(response.data);
//  document.querySelector("h1").innerHTML = response.data.name;
//  document.querySelector("#weather-description").innerHTML =
//    response.data.weather[0].description;
//  document.querySelector("#current-temperature").innerHTML = Math.round(
//    response.data.main.temp
//  );
//  document.querySelector("#felt-like-temperature").innerHTML = Math.round(
//    response.data.main.feels_like
//  );
//  document.querySelector("#wind").innerHTML = Math.round(
//    response.data.wind.speed
//  );
//  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
//}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4edf83edc9325a7bcca03c1bbe63d4b4";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
}

function locateUser(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPosition = document.querySelector("#gps");
currentPosition.addEventListener("click", locateUser);

//Change ??C temperature into ??Fahrenheit and back

function changeToFahrenheit(event) {
  event.preventDefault();
  let spanTemperature = document.querySelector("span#current-temperature");
  let temperature = spanTemperature.innerHTML;
  temperature = Number(temperature);
  spanTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("a#current-fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

//Change ??F temperature back into ??Celsius

function changeToCelsius(event) {
  event.preventDefault();
  let spanTemperature = document.querySelector("span#current-temperature");
  spanTemperature.innerHTML = "12";
}

let celsius = document.querySelector("a#current-celsius");
celsius.addEventListener("click", changeToCelsius);
