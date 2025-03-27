const apiKey = "917f636ffb58b636028115173927e813";
const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid=${apiKey}`;
let geoCodingUrl;
const city = document.getElementById("search");
const hourlyForcastBtn = document.querySelector("[data-forecast]")
let hourlyForcastUrl; 

// fetch("https://emzzy241.github.io/Weather-API-Great-Giphy/")
// .then(res => console.log(res.json()))
// .then(data => console.log(data))

hourlyForcastBtn.addEventListener("click", () => {
    const cityValue = city.value;
    geoCodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${apiKey}`
    geo(geoCodingUrl);
    // run(hourlyForcastUrl)
})
async function geo(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        hourlyForcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`
    })
    .then(() => run(hourlyForcastUrl))
}

function run(url){
    fetch(url)
    .then(res => {
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json();
    })
    .then(data => {
        const timeOnly = data.list[0].dt_txt.split(" ")[1];
        document.getElementById("weather-info").innerHTML = `
        <h2>Weather Forcast for ${timeOnly}</h2>
        <p>Temperature: ${data.list[0].main.temp}C</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Wind Speed: ${data.list[0].wind.speed} m/s</p>
        <p>Condition: ${data.list[0].weather[0].description}</p>`;
    })
}


function getCurrentWeather(){
    const cityValue = city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const video = document.querySelector("[data-video]");
        const vid = document.querySelector("[data-vid]");
        document.getElementById("weather-info").innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Condition: ${data.weather[0].description}</p>`;
        console.log(data.weather[0].main)
        console.log(document.querySelector("[data-video]"))
        if(data.weather[0].description == "clear sky"){
            video.setAttribute("src", "./images (5).mp4")
            vid.load()
            console.log(video)
        }else if(data.weather[0].description == "few clouds"){
            video.setAttribute("src", "./images (5).mp4")
            vid.load();
            console.log(video)
        }else if(data.weather[0].description == "scattered clouds"){
            video.setAttribute("src", "./images (5).mp4")
            vid.load();
            console.log(video)
        }else if(data.weather[0].description == "broken clouds"){
            video.setAttribute("src", "./images (5).mp4")
            vid.load();
            console.log(video)
        }else if(data.weather[0].description == "shower rain"){
            video.setAttribute("src", "./Rain.mp4")
            vid.load();
            new Audio("./rain.mp3").play()
            console.log(video)
        }else if(data.weather[0].description == "rain"){
            video.setAttribute("src", "./Rain.mp4")
            vid.load();
            new Audio("./rain.mp3").play()
            console.log(video)
        }else if(data.weather[0].description == "thunderstorm"){
            video.setAttribute("src", "./images.mp4")
            new Audio("./mixkit-rain-and-thunder-storm-2390.mp3").play()
            vid.load();
            console.log(video)
        }else if(data.weather[0].description == "snow"){
            video.setAttribute("src", "./snow.mp4")
            new Audio("./movement-in-the-snow-with-sticks-snow-in-the-cold-snow-creaking-footsteps-in-the-snow-13527.mp3").play()
            vid.load();
            console.log(video)
        }else if(data.weather[0].description == "mist"){
            video.setAttribute("src", "././images (4).mp4.mp4")
            vid.load();
            console.log(video)
        }
        console.log(document.querySelector("[data-video]"))
        // console.log(data)
    })
}