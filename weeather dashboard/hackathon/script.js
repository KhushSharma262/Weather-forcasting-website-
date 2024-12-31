// Function to get weather data
function getWeather() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const apiKey = '6b20af02374b4d6ca4c135704242108'; // Your WeatherAPI key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    // Show a loading message
    document.querySelector('.current-weather').innerHTML = '<p>Loading...</p>';
    document.querySelector('.forecast').innerHTML = '';

    // Fetch weather data from WeatherAPI
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            // Display current weather
            const currentWeather = data.current;
            document.querySelector('.current-weather').innerHTML = `
                <h2>Current Weather in ${data.location.name}</h2>
                <p>Temperature: ${currentWeather.temp_c} °C</p>
                <p>Condition: ${currentWeather.condition.text}</p>
                <p>Humidity: ${currentWeather.humidity}%</p>
                <p>Wind: ${currentWeather.wind_kph} kph</p>
                <img src="${currentWeather.condition.icon}" alt="Weather Icon">
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector('.current-weather').innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
            document.querySelector('.forecast').innerHTML = '';
        });
}
