const apiKey = "917f636ffb58b636028115173927e813";

async function getWeather() {
    const city = document.getElementById("search").value;
    // if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    // try {
    //     const response = await
    //     fetch(url);
    //     const data = await response.json();
    //     displayWeather(data);
    // }
    // catch (error) {
    //     console.error("Error fetching weather data", error);
    // }
}

function displayWeather(data) {
    if (data.cod !== 200) {
        document.getElementById("weather-info").innerHTML = "City not found!";
        return;
    }

    document.getElementById("weather-info").innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Condition: ${data.weather[0].description}</p>
    `;
}

window.onload = function () {
    if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude,longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    }
    catch (error) {
        console.error("Error fetching location-based weather", error);
            }
        });
    }
};


async function getForecast(city) {
    const url = 
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayForecast(data);
    }
    catch (error) {
        console.error("Error fetching forecast data", error);
    }    
}

function displayForecast(data) {
    let forecastHTML = "<h3>5-DayForecast</h3>";
    data.list.forEach((item, index) => {
        if (index % 8 === 0) { //Show one forecast per day
            forecastHTML += `
            <p>${item.dt_txt}: ${item.main.temp}C, ${item.weather[0].description}</p>`;
        }
    });
    document.getElementById("weather-info").innerHTML += forecastHTML;
}