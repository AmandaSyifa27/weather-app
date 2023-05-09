const apiKey = "0f3c744a7cd168c57dbc0c3636635869";

function getVal() {
 const val = document.getElementById("input");
 const value = val.value;
 fetchData(value);
 return value;
}

function handleKeySearch(event) {
 if (event.key === "Enter") {
  fetchData(getVal());
 }
}

async function fetchData(cityName) {
 try {
  const response = await fetch(
   `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  const temperature = data.main.temp;
  const city = data.name;
  const weatherCondition = data.weather[0].main;
  const weatherDescription = data.weather[0].description;
  const windSpeed = data.wind.speed;
  const windGust = data.wind.gust;

  const weatherIcon = document.getElementById("weather-icon");
  const body = document.body;

  if (weatherCondition === "Clear") {
   weatherIcon.src = "/assets/icons/clearSky.png";
   body.style.backgroundImage = "url(/assets/backgrounds/clear.jpg)";
  } else if (weatherCondition === "Clouds") {
   weatherIcon.src = "/assets/icons/clouds.png";
   body.style.backgroundImage = "url(/assets/backgrounds/clouds.jpg)";
  } else if (weatherCondition === "Drizzle") {
   weatherIcon.src = "/assets/icons/drizzle.png";
   body.style.backgroundImage = "url(/assets/backgrounds/drizzle.jpg)";
  } else if (weatherCondition === "Fog" || weatherCondition === "Mist") {
   weatherIcon.src = "/assets/icons/fog.png";
   body.style.backgroundImage = "url(/assets/backgrounds/fog.jpg)";
  } else if (weatherCondition === "Rain") {
   weatherIcon.src = "/assets/icons/rain.png";
   body.style.backgroundImage = "url(/assets/backgrounds/rain.jpg)";
  } else if (weatherCondition === "Sand") {
   weatherIcon.src = "/assets/icons/sand.png";
   body.style.backgroundImage = "url(/assets/backgrounds/sand.jpg)";
  } else if (weatherCondition === "Snow") {
   weatherIcon.src = "/assets/icons/snow.png";
   body.style.backgroundImage = "url(/assets/backgrounds/snow.jpg)";
  } else if (weatherCondition === "Thunderstorm") {
   weatherIcon.src = "/assets/icons/storm.png";
   body.style.backgroundImage = "url(/assets/backgrounds/storm.jpg)";
  } else if (weatherCondition === "Tornado" || weatherCondition === "Squall") {
   weatherIcon.src = "/assets/icons/tornado.png";
   body.style.backgroundImage = "url(/assets/backgrounds/tornado.jpg)";
  } else {
   weatherIcon.src = "/assets/icons/dust.png";
   body.style.backgroundImage = "url(/assets/backgrounds/dust.jpg)";
  }

  document.getElementById("temperature").textContent = `${temperature}\u00B0`;
  document.getElementById("city-name").textContent = city;
  document.getElementById("weather-condition").textContent = weatherCondition;
  document.getElementById("weather-description").textContent =
   weatherDescription;
  document.getElementById(
   "wind-speed"
  ).textContent = ` Speed: ${windSpeed} m/s`;
  document.getElementById("wind-gust").textContent = `Gust: ${windGust} m/s`;

  const cardContents = document.getElementsByClassName("card-content");
  for (let i = 0; i < cardContents.length; i++) {
   cardContents[i].style.display = "flex";
  }
  document.getElementById("enter-city").style.display = "none";
 } catch (error) {
  swal.fire({
   title: "Sorry..",
   text:
    "You may have entered the city name incorrectly, please check again. Or it may be a server error.",
   imageUrl: "/assets/error.svg",
   imageWidth: 400,
   imageHeight: 200,
   imageAlt: "Custom image",
  });
  console.log(error);
 }
}

function clearInput() {
 const val = document.getElementById("input");
 val.value = "";
}
