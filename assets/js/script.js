const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistory = document.getElementById('search-history');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', function() {
    const city = searchInput.value;
    // Add city to search history
    const cityButton = document.createElement('button');
    cityButton.classList.add('city-button');
    cityButton.textContent = city;
    searchHistory.appendChild(cityButton);
    // Fetch weather data for the city and display it
    fetchWeatherData(city);
}); 

function fetchWeatherData(city) {
    // Use the provided API to fetch weather data
    // Replace {API key} with your actual API key
    const apiKey = "49a9ab3223519cbd2aa3dbe28562544c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract and display weather information
            const currentWeather = data.list[0];
            const cityName = currentWeather.name ? currentWeather.name : city;
            const temperatureCelsius = currentWeather.main.temp;
            const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
            const humidity = currentWeather.main.humidity;
            const windSpeed = currentWeather.wind.speed;
            const weatherIcon = currentWeather.weather[0].icon;
            const weatherDescription = currentWeather.weather[0].description;
            const forecast = data.list.slice(1, 6);
            // Display current weather information
            weatherInfo.innerHTML = `
                <h2>${cityName}</h2>
                <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Weather: ${weatherDescription}</p>
            `;
            // Display 5-day forecast
            const forecastHtml = forecast.map(day => `
                <div class="weather-box">
                    <p>Date: ${day.dt_txt}</p>
                    <p>Temperature: ${(day.main.temp * 9/5 + 32).toFixed(2)}°F</p>
                    <p>Humidity: ${day.main.humidity}%</p>
                    <p>Wind Speed: ${day.wind.speed} m/s</p>
                    <p>Weather: ${day.weather[0].description}</p>
                </div>
            `).join('');
            weatherInfo.innerHTML += `<h2>5-Day Forecast</h2>` + forecastHtml;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
