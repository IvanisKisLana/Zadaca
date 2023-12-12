const apiKey = '4c0801f1cf5e5facf267eb25cfb2ed54'
const home = document.querySelector(".main")
const input = document.querySelector('.search-input')
const button = document.querySelector('#add')
const city = document.querySelector(".city-name");
const weather = document.querySelector('.div-3-description')
const weatherIcon = document.querySelector('.weather-status')
const temperature = document.querySelector('.div-1-temp')
const realFeel = document.querySelector('.div-2-real-feel')
const warning = document.querySelector('.div-caution')
const warningIcon = document.querySelector('.caution-icon')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const error = document.querySelector('.error')
const dateDisplay = document.querySelector('.time-date-container')

window.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault()
    const city = "Požega";
    fetchData(city)
});

button.addEventListener('click', function (event) {
    event.preventDefault()
    const city = input.value;
    fetchData(city)
    document.activeElement.blur();
})

const fetchData = async function(city) {
    const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const responseData = await result.json();
    if (responseData.cod === "404") return home.style.display = "none", error.innerText = `There is no city named ${city}. Please try again.`;
    console.log(responseData)
    return displayWeather(responseData), error.innerText = ``;
}

const displayWeather = (data) => {
    temperature.innerText = `${Math.round(data.main.temp.toFixed(1))} °C`;
    weather.children[1].innerText = data.weather[0].main;
    city.innerText = `${data.name} (${data.sys.country})`;
    realFeel.innerText = `Real feel: ${data.main.feels_like.toFixed(1)} °C`;
    humidity.children[1].innerText = `${data.main.humidity} %`;
    wind.children[1].innerText = `${data.wind.speed.toFixed(1)} km/h`;
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    warning.children[1].innerText =`${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}`
    warningIcon.innerHTML = `<img class="caution-icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></img>`
    const date = new Date(data.dt * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dateDisplay.innerText = `${days[date.getDay()]}, ${date.toLocaleDateString("si-SI")}`
}