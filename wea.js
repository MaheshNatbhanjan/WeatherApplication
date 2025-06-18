const apiKey = 'a4b30470653dca8f1b2b80b8fd3e1c1d'; // Your API key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found. Please check the city name and try again.');
        }
        const data = await response.json();
        console.log(data); // Log the response for debugging
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Display the weather information
function displayWeather(data) {
    weatherInfo.style.display = 'block';
    cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Condition: ${capitalizeFirstLetter(data.weather[0].description)}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Capitalize the first letter of weather descriptions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Handle button click event
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city); // Fetch weather for entered city
    } else {
        alert('Please enter a city name');
    }
});

// Allow searching using the Enter key
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name');
        }
    }
});
