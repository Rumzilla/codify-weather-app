const API = {
  key: "a99283c6f5c74e319d372320221412",
  base: "http://api.weatherapi.com/v1/current.json",
};

const city = document.querySelector(".city");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const feels = document.querySelector(".feels");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const mainInput = document.querySelector(".main-input");
let query = document.querySelector(".main-input").value;

mainInput.addEventListener("keypress", async function (event) {
  if (event.keyCode === 13 && event.target.value) {
    query = event.target.value;
    await getWeather();
    document.querySelector(".placeholder-off").classList.remove("placeholder");
    document.querySelector(".weather-icon").classList.remove("icon-display");
    document.querySelector(".left-side").classList.remove("icon-display");
    document.querySelector(".center-side").classList.remove("icon-display");
    document.querySelector(".right-side").classList.remove("icon-display");
  }
});

async function getWeather() {
  try {
    const response = await fetch(`${API.base}?key=${API.key}&q=${query}`);
    const data = await response.json();
    console.log(data);

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let newDate = new Date(data.location.localtime);
    newDay = newDate.getDay();
    newMonth = newDate.getMonth();
    time.innerHTML = newDate.getHours() + ":" + newDate.getMinutes();
    date.innerHTML =
      days[newDay] +
      ", " +
      months[newMonth] +
      " " +
      newDate.getDate() +
      ", " +
      newDate.getFullYear();
    city.innerHTML = data.location.name + ", " + data.location.country;
    document.querySelector(".weather-icon").src =
      "https:" + data.current.condition.icon;
    temp.innerHTML = Math.round(data.current.temp_c) + "°c";
    weather.innerHTML = data.current.condition.text;
    feels.innerHTML =
      "Feels like: " + Math.round(data.current.feelslike_c) + "°c";
    humidity.innerHTML = "Humidity: " + data.current.humidity + "%";
    wind.innerHTML = "Wind: " + data.current.wind_kph + " kph";
  } catch (error) {
    document.querySelector(".weather-wrap").innerHTML =
      "No matching location found";
    setTimeout(() => document.location.reload(), 1500);
  }
}
