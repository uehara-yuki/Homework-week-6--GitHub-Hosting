//feature 1 homework week 4- Display date and hour

function formatDate(timestamp){
  let date = new Date(timestamp);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
   let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//homework week 5- Your task- Show the current temp/humidity/wind/description
function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let temperatureRound = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureRound;
  console.log(response);

  let humidity = document.querySelector("#humidity");
  let humidityRound = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityRound} %`;

  let wind = document.querySelector("#wind");
  let windRound = Math.round(response.data.wind.speed);
  wind.innerHTML = ` Wind: ${windRound} km/h`;

  let weatherDescription= document.querySelector("#weather-description")
  weatherDescription.innerHTML= response.data.weather[0].description;
  
   celsiusTemperature = response.data.main.temp; // used to convert C to F

}

// search for the city you typed 
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let typeCity = document.querySelector("#type-city");
  city.innerHTML = typeCity.value;

  let apiKey = "c25c2e288aa866c69cd6db4b9732a68a";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${typeCity.value}&units=metric&appid=${apiKey}`;

  axios.get(apiurl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${typeCity.value}&appid=${apiKey}&units-metric`;
  axios.get(apiurl).then(displayForecast);

}


//display forecast
function displayForecast(response){

let forecastElement = document.querySelector("#forecast");
let forecast= response.data.main.list[0];
forecastElement.innerHTML= 

`    <div class="col-sm">
        12:00
       <br />
       <strong> ${Math.round(forecast.main.temp_max)} °</strong>/ ${Math.round(forecast.main.temp_min)} °
       <br />
      <i class="fas fa-sun"></i> 
    </div>
`

}




let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(searchCity);

//homework week 5- Bonus point- Show the data for your current location

function clickCurrentButton(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c25c2e288aa866c69cd6db4b9732a68a";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiurl).then(showCityName);
}

function showCityName(response) {
  let currentLocation = response.data.name;
  console.log(response.data);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${currentLocation}`;

  let temperature = document.querySelector("#temperature");
  let temperatureRound = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureRound;

  let humidity = document.querySelector("#humidity");
  let humidityRound = Math.round(response.data.main.humidity);
  humidity.innerHTML = ` Humidity: ${humidityRound} %`;

  let wind = document.querySelector("#wind");
  let windRound = Math.round(response.data.wind.speed);
  wind.innerHTML = ` Wind: ${windRound} km/h`;

  let weatherDescription= document.querySelector("#weather-description")
  weatherDescription.innerHTML= response.data.weather[0].description;
}

function showCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(clickCurrentButton);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", showCity);

//change the weather icon

function changeIcon(response) {
  let weatherIcon = document.querySelector("#weather-icon");
  let icon = response.data.weather[0].icon;
  if (icon === "01d" || icon === "01n") {
    weatherIcon.setAttribute("class", "fas fa-sun");
  } else if (icon === "02d" || icon === "02n") {
    weatherIcon.setAttribute("class", "fas fa-cloud-sun");
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    weatherIcon.setAttribute("class", "fas fa-cloud");
  } else if (icon === "09d" || icon === "09n") {
    weatherIcon.setAttribute("class", "fas fa-cloud-rain");
  } else if (icon === "10d" || icon === "10n") {
    weatherIcon.setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (icon === "11d" || icon === "11n") {
    weatherIcon.setAttribute("class", "fas fa-bolt");
  } else if (icon === "13d" || icon === "13n") {
    weatherIcon.setAttribute("class", "far fa-snowflake");
  } else if (icon === "50d" || icon === "50n") {
    weatherIcon.setAttribute("class", "fas fa-smog");
  }
}

//bonus feature- homework week 4- Convert Celsius to Fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temperature");
  
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

