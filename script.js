const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const locationBtn = document.getElementById("locationBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const forecastGrid = document.getElementById("forecast");
const themeToggle = document.getElementById("themeToggle");

// Weather elements
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const iconEl = document.getElementById("icon");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

// Theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

// Search
searchBtn.onclick = () => {
  const city = input.value.trim();
  if (!city) return showError("Please enter a city name");
  fetchWeather(city);
};

// Current Location
locationBtn.onclick = () => {
  if (navigator.geolocation) {
    locationBtn.disabled = true;
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
        locationBtn.disabled = false;
      },
      (err) => {
        handleError("Could not get your location. Please check permissions.");
        locationBtn.disabled = false;
        showLoading(false);
      }
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
};

async function fetchWeather(city) {
  try {
    showLoading(true);

    const res = await fetch(
      `${WEATHER_CONFIG.BASE_URL}/weather?q=${city}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
    );

    if (!res.ok) throw res.status;
    const data = await res.json();
    displayWeather(data);

    const forecastRes = await fetch(
      `${WEATHER_CONFIG.BASE_URL}/forecast?q=${city}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
    );

    const forecastData = await forecastRes.json();
    displayForecast(forecastData);

  } catch (err) {
    handleError(err);
  } finally {
    showLoading(false);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    showLoading(true);

    const res = await fetch(
      `${WEATHER_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
    );

    if (!res.ok) throw res.status;
    const data = await res.json();
    displayWeather(data);

    const forecastRes = await fetch(
      `${WEATHER_CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
    );

    const forecastData = await forecastRes.json();
    displayForecast(forecastData);

  } catch (err) {
    handleError(err);
  } finally {
    showLoading(false);
  }
}

function displayWeather(data) {
  weatherCard.classList.remove("hidden");
  error.classList.add("hidden");

  cityEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = Math.round(data.main.temp) + "°";
  descEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  humidityEl.textContent = data.main.humidity + "%";
  windEl.textContent = data.wind.speed + " m/s";
}

function displayForecast(data) {
  forecastGrid.innerHTML = "";

  const days = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);
  
  // Create forecast cards with day names
  days.forEach((day, index) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p class="forecast-day">${dayName}</p>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
      <p><b>${Math.round(day.main.temp)}°</b></p>
    `;
    forecastGrid.appendChild(card);
  });
}

function showLoading(state) {
  loading.classList.toggle("hidden", !state);
}

function showError(msg) {
  error.textContent = msg;
  error.classList.remove("hidden");
  weatherCard.classList.add("hidden");
}

function handleError(code) {
  if (code === 401) showError("Invalid API Key");
  else if (code === 404) showError("City not found");
  else if (code === 429) showError("Too many requests");
  else showError("Failed to load weather data");
}
