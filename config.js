// ========================================
// WEATHER APP - CONFIGURATION FILE
// API Key Storage
// ========================================

/**
 * OpenWeatherMap API Configuration
 * 
 * IMPORTANT SECURITY NOTE:
 * - This file contains a placeholder API key
 * - NEVER commit your real API key to GitHub
 * - Create a .gitignore entry for this file
 * - In production, use environment variables or backend proxy
 * 
 * To get your free API key:
 * 1. Go to https://openweathermap.org/api
 * 2. Sign up for a free account
 * 3. Generate an API key from your dashboard
 * 4. Replace 'YOUR_API_KEY_HERE' with your actual key
 */

const WEATHER_CONFIG = {
    // OpenWeatherMap API Base URL
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    
    // Your API Key (Replace with your actual key)
    API_KEY: '6767e90217e9c4d6a44554e3a27479ef',
    
    // API Units (metric = Celsius, imperial = Fahrenheit)
    UNITS: 'metric',
    
    // Temperature Unit Symbol
    TEMP_UNIT: '°C',
    
    // Wind Speed Unit
    WIND_UNIT: 'm/s'
};
