# Weather Hub - Real-Time Weather Application

A comprehensive weather application that provides real-time weather data, forecasts, and location-based services using the OpenWeatherMap API. This project demonstrates API integration, geolocation handling, and modern UI design with dark/light theme support.

**API Used:** OpenWeatherMap API  
**Features:** Current weather, 5-day forecast, geolocation, theme toggle  
**Tech Stack:** HTML5, CSS3, JavaScript (ES6 Modules)

---

## 🎯 Project Overview

This weather application showcases:
- Real-time weather data retrieval from OpenWeatherMap API
- City search functionality with error handling
- Geolocation-based weather detection
- 5-day forecast display with hourly breakdown
- Dark/Light theme toggle with localStorage persistence
- Responsive design for all devices
- Beautiful UI with weather-appropriate icons
- Smooth animations and transitions

---

## ⚡ Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- OpenWeatherMap API key (free tier available)

### 5-Minute Setup

1. **Get OpenWeatherMap API Key** (2 minutes)
   - Go to [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API Keys section
   - Copy your API key

2. **Update config.js** (1 minute)
   ```javascript
   // In config.js, replace:
   const WEATHER_CONFIG = {
     BASE_URL: 'https://api.openweathermap.org/data/2.5',
     API_KEY: 'YOUR_API_KEY_HERE',  // Paste your API key here
     UNITS: 'metric',  // Use 'imperial' for Fahrenheit
     LANG: 'en'
   };
   ```

3. **Run the Project** (1 minute)
   - **Option A (VS Code):** Install Live Server → Right-click `index.html` → "Open with Live Server"
   - **Option B (Python):** `python -m http.server 8000` → Open `http://localhost:8000`
   - **Option C (Node.js):** `npx http-server` → Open provided localhost URL

4. **Start Checking Weather!**
   - Enter a city name (e.g., "London", "Tokyo", "New York")
   - Click Search or press Enter
   - Or click "Current Location" to get weather for your location
   - View current weather and 5-day forecast

---

## 📋 API Documentation

### Base URL
```
https://api.openweathermap.org/data/2.5
```

### Authentication
- **Type:** Query Parameter (API Key)
- **Parameter:** `appid={API_KEY}`
- **API Key:** [OpenWeatherMap Dashboard](https://openweathermap.org/api)
- **Free Tier:** 60 calls/minute, includes current weather and 5-day forecast

### Endpoints

#### 1. Current Weather by City
**Endpoint:** `GET /weather`

**Description:** Get current weather data for a city.

**Query Parameters:**
- `q` (required) - City name (e.g., "London", "Tokyo")
- `appid` (required) - Your OpenWeatherMap API key
- `units` (optional) - `metric` (Celsius) or `imperial` (Fahrenheit)

**Example Request:**
```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY&units=metric"
```

**Current Implementation (in script.js):**
```javascript
async function fetchWeather(city) {
  const response = await fetch(
    `${WEATHER_CONFIG.BASE_URL}/weather?q=${city}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
  );
  
  if (!response.ok) {
    throw new Error('City not found');
  }
  
  const data = await response.json();
  return data;
}
```

**Sample Response:**
```json
{
  "coord": { "lon": -0.1257, "lat": 51.5085 },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "main": {
    "temp": 15.3,
    "feels_like": 14.8,
    "temp_min": 13.2,
    "temp_max": 16.8,
    "pressure": 1013,
    "humidity": 72
  },
  "visibility": 10000,
  "wind": {
    "speed": 5.2,
    "deg": 230
  },
  "clouds": { "all": 75 },
  "dt": 1703520000,
  "sys": {
    "type": 2,
    "id": 2019646,
    "country": "GB",
    "sunrise": 1703490000,
    "sunset": 1703521000
  },
  "timezone": 0,
  "id": 2643743,
  "name": "London",
  "cod": 200
}
```

**Fields Used in UI:**
- `name` - City name
- `sys.country` - Country code
- `weather[0].main` - Weather condition
- `weather[0].description` - Weather description
- `weather[0].icon` - Weather icon code
- `main.temp` - Current temperature
- `main.feels_like` - "Feels like" temperature
- `main.humidity` - Humidity percentage
- `wind.speed` - Wind speed
- `main.temp_min/max` - Min/max temperature

---

#### 2. 5-Day Forecast
**Endpoint:** `GET /forecast`

**Description:** Get 5-day forecast data with 3-hour intervals.

**Query Parameters:**
- `q` (required) - City name
- `appid` (required) - Your API key
- `units` (optional) - `metric` or `imperial`

**Example Request:**
```bash
curl "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=YOUR_KEY&units=metric"
```

**Current Implementation (in script.js):**
```javascript
async function fetchWeather(city) {
  // Includes both current weather and forecast
  const forecastRes = await fetch(
    `${WEATHER_CONFIG.BASE_URL}/forecast?q=${city}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
  );
  
  const forecastData = await forecastRes.json();
  return forecastData;
}
```

**Sample Response:**
```json
{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1703520000,
      "main": {
        "temp": 15.3,
        "feels_like": 14.8,
        "temp_min": 14.5,
        "temp_max": 15.3,
        "pressure": 1013,
        "humidity": 72
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": { "all": 75 },
      "wind": { "speed": 5.2, "deg": 230 },
      "visibility": 10000,
      "dt_txt": "2023-12-25 12:00:00"
    }
  ],
  "city": {
    "id": 2643743,
    "name": "London",
    "coord": { "lat": 51.5085, "lon": -0.1257 },
    "country": "GB"
  }
}
```

---

#### 3. Weather by Coordinates (Geolocation)
**Endpoint:** `GET /weather`

**Description:** Get current weather by latitude/longitude.

**Query Parameters:**
- `lat` (required) - Latitude
- `lon` (required) - Longitude
- `appid` (required) - Your API key
- `units` (optional) - `metric` or `imperial`

**Example Request:**
```bash
curl "https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&appid=YOUR_KEY&units=metric"
```

**Current Implementation (in script.js):**
```javascript
async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${WEATHER_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}`
  );
  
  const data = await response.json();
  return data;
}
```

---

## 🔐 Error Handling

| Error Scenario | Cause | User Message |
|---|---|---|
| City Not Found | Invalid city name | "City not found. Please check the spelling." |
| Network Error | No internet connection | "Network error. Please check your connection." |
| API Error | Invalid API key or quota exceeded | "Failed to fetch weather data. Please try again." |
| Geolocation Denied | Browser permission denied | "Location permission denied. Enter city name instead." |
| Geolocation Timeout | Slow GPS/network | "Could not get location. Please try again." |

---

## 🎨 UI Components

### Header
- **Brand Logo:** Weather icon with app name
- **Theme Toggle:** Dark/Light mode button (Moon 🌙 / Sun ☀️)
- **Sticky Position:** Stays at top while scrolling

### Search Section
- **City Input Field:** Search by city name
- **Search Button:** Trigger weather fetch
- **Location Button:** Get weather for current location
- **Location Icon:** 📍 GPS indicator

### Current Weather Display
- **Temperature:** Large display with min/max
- **Weather Icon:** Visual representation
- **Description:** Weather condition text
- **"Feels Like":** Perceived temperature
- **Location Info:** City and country
- **Humidity:** Percentage with icon
- **Wind Speed:** km/h or mph based on units

### 5-Day Forecast
- **Forecast Grid:** 5 cards (one per day)
- **Day/Date:** Display for each day
- **Temperature Range:** Min/max temperature
- **Weather Icon:** Visual weather indicator
- **Description:** Brief weather description

### Loading & Error States
- **Loading Spinner:** "⏳ Loading weather data..."
- **Error Display:** Red background with message
- **Auto-hide:** Disappears when resolved

---

## 🌡️ Temperature Units

### Metric (Celsius) - Default
- Temperature: °C
- Wind Speed: m/s
- Precipitation: mm

### Imperial (Fahrenheit)
- Temperature: °F
- Wind Speed: mph
- Precipitation: in

**Change Units in config.js:**
```javascript
UNITS: 'imperial'  // or 'metric' for Celsius
```

---

## 📱 Responsive Design

| Screen Size | Layout |
|-------------|--------|
| Desktop (>992px) | Multi-column grid, side forecasts |
| Tablet (600-992px) | Adjusted spacing, stacked on some |
| Mobile (<600px) | Full-width single column |

---

## 🔄 Data Flow Architecture

```
┌─────────────────────┐
│   User Input        │ (City name or location)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────┐
│  Input Validation       │
│  - Not empty            │
│  - Trim whitespace      │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Show Loading State     │
│  - Display spinner      │
│  - Clear errors         │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  API Request            │
│  - Build URL            │
│  - Add parameters       │
│  - Fetch from OpenWeather│
└──────────┬──────────────┘
           │
           ▼
┌──────────────────────────┐
│  Response Handling       │
│  - Check status code     │
│  - Parse JSON response   │
│  - Handle errors         │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Process Data            │
│  - Format temperature    │
│  - Parse forecast data   │
│  - Match weather icons   │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Display Results         │
│  - Render current weather│
│  - Show 5-day forecast   │
│  - Hide loading state    │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  User Sees Weather       │
│  - Current conditions    │
│  - Temperature & wind    │
│  - 5-day forecast        │
└──────────────────────────┘
```

---

## 🌓 Dark/Light Theme

### Theme Persistence
- **Storage:** Uses localStorage
- **Key:** `theme-preference`
- **Default:** Dark mode
- **Toggle:** Click moon/sun icon in header

**CSS Classes:**
```css
body { /* Dark mode (default) */ }
body.light { /* Light mode */ }
```

**JavaScript:**
```javascript
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  // Save preference to localStorage
};
```

---

## 📁 Project Structure

```
weather-project/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS with dark/light themes
├── script.js           # Weather fetching and DOM manipulation
├── config.js           # API configuration
├── README.md           # This file
└── DEMO_VIDEO_SCRIPT.md # Demo instructions
```

### File Purposes

| File | Purpose |
|------|---------|
| **index.html** | Structure with search, weather display, forecast grid |
| **style.css** | Responsive styling, glass morphism, dark/light modes |
| **script.js** | API calls, geolocation, DOM rendering, event handling |
| **config.js** | OpenWeatherMap API key and configuration |

---

## 🧪 Testing with Postman

### Setup Postman

1. **Create Request**
   - Method: GET
   - URL: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY&units=metric`

2. **Add Query Parameters**
   - `q` = London
   - `appid` = Your API key
   - `units` = metric

3. **Send Request**
   - Expected Status: 200
   - Response includes city name, temperature, weather condition

### Test Different Cities
```
Tokyo, Paris, New York, Sydney, Dubai, Barcelona
```

### Test Error Scenarios

#### 404 City Not Found
```
URL: ?q=InvalidCityXYZ123&appid=YOUR_KEY
Response: {"cod":"404", "message": "city not found"}
```

#### 401 Invalid API Key
```
URL: ?q=London&appid=invalid_key
Response: {"cod":401, "message": "Invalid API key"}
```

#### 429 Rate Limited
```
Make >60 requests in 1 minute
Response: {"cod":"429", "message": "You have exceeded the rate limit"}
```

---

## 🔄 Troubleshooting

### API Key Issues
**Problem:** "Invalid API key" error  
**Solutions:**
- Verify API key is correct
- Check key is from OpenWeatherMap
- Ensure key is properly pasted in config.js
- Generate new key if expired

### City Not Found
**Problem:** "City not found" error  
**Solutions:**
- Verify city spelling
- Try English spelling for foreign cities
- Use city name (not country)
- Try major cities if unsure

### Geolocation Not Working
**Problem:** "Location permission denied"  
**Solutions:**
- Check browser geolocation settings
- Allow location access for website
- Use search field as alternative
- Check browser console for errors

### No Weather Icon Display
**Problem:** Weather icons not showing  
**Solutions:**
- Check internet connection
- Verify emoji/icon display support
- Check browser console for errors
- Ensure CSS is loaded properly

### Forecast Not Displaying
**Problem:** 5-day forecast missing  
**Solutions:**
- Check API response includes forecast data
- Verify data processing in script.js
- Check CSS for hidden forecast elements
- Verify no JavaScript errors in console

---

## 📚 Resources & Documentation

- **OpenWeatherMap API:** [Official Documentation](https://openweathermap.org/api)
- **API Key Management:** [API Keys Dashboard](https://openweathermap.org/api)
- **Weather Icons:** [Icon Reference](https://openweathermap.org/weather-conditions)
- **Geolocation API:** [MDN Geolocation Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- **Fetch API:** [MDN Fetch Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **localStorage:** [MDN localStorage Guide](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🚀 Future Enhancement Ideas

### Phase 1 (Easy)
- [ ] Display UV index
- [ ] Show atmospheric pressure
- [ ] Display visibility distance
- [ ] Add "feels like" temperature details
- [ ] Show sunrise/sunset times
- [ ] Display last update time

### Phase 2 (Medium)
- [ ] Add weather alerts
- [ ] Save favorite cities
- [ ] Compare multiple cities
- [ ] Weather history/timeline
- [ ] Export weather data
- [ ] Multiple language support

### Phase 3 (Advanced)
- [ ] Interactive weather maps
- [ ] Hourly forecast with charts
- [ ] Weather alerts integration
- [ ] Air quality index display
- [ ] Custom notifications
- [ ] Mobile app version
- [ ] Deploy to production

---

## 👥 Team Collaboration Roles

| Role | Responsibility | Files |
|------|-----------------|-------|
| **API Handler** | Setup OpenWeatherMap, manage API key, test endpoints | `config.js`, `script.js` |
| **JavaScript Developer** | Implement fetching, geolocation, data processing | `script.js` |
| **UI/UX Designer** | Create responsive layouts, dark/light themes, styling | `style.css`, `index.html` |
| **QA & Documentation** | Test functionality, write docs, manage GitHub | `README.md`, testing |

---

## 🤝 GitHub Collaboration

### Workflow
```bash
# Create feature branch
git checkout -b feature/add-alerts

# Make changes and commit
git commit -m "feat: add weather alerts"

# Push and create PR
git push origin feature/add-alerts
```

### Commit Message Format
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: improve styling
refactor: improve code structure
test: add test cases
```

---

## 📄 License & Attribution

This project is created for educational purposes as part of an API Group Project assignment.

**Created:** December 2025  
**Last Updated:** December 25, 2025  
**Version:** 1.0.0  
**API Version:** OpenWeatherMap API v2.5

---

## ✅ Checklist for Running the Project

- [ ] Generated OpenWeatherMap API key
- [ ] Updated config.js with actual API key
- [ ] Started local server (Live Server / http-server)
- [ ] Opened project in browser
- [ ] Tested with city search (e.g., "London")
- [ ] Tested with current location button
- [ ] Verified current weather displays correctly
- [ ] Verified 5-day forecast shows
- [ ] Tested dark/light theme toggle
- [ ] Checked responsive design on mobile
- [ ] Tested error handling (invalid city)
- [ ] Verified all team contributions
- [ ] Committed changes to GitHub
