function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let date = new Date(response.data.time * 1000);

  let dayDate = { weekday: "long" };
  let formattedDate = date.toLocaleDateString("en-US", dayDate);

  let time = { hour: "2-digit", minute: "2-digit", hour12: false };
  let formattedTime = date.toLocaleTimeString("en-US", time);

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  dateElement.innerHTML = formattedDate;
  timeElement.innerHTML = formattedTime;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  console.log(response);
}

function searchCity(city) {
  let apiKey = "bc96c7e4d1otea7a98c0307cfdf6305b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"];

  days.forEach(function (day) {
    forecast.innerHTML = ` 
          <div class="weather-forecast-day">
                <div class="weather-forecast-date">Thu</div>
                <div class="weather-forecast-icon" id="forecast-icon">🌤️</div>
                <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong> 15 </strong>
                </div>
                <div class="weather-forecast-temperature"> 9 </div>
                </div>
              </div>
 `;
  });
}

searchCity("Paris");
