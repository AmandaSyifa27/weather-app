const apiKey = "0f3c744a7cd168c57dbc0c3636635869";

function getVal() {
 const val = document.getElementById("input");
 const value = val.value;
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
  console.log(data);

  const temperature = data.main.temp;
  const city = data.name;
  const weatherCondition = data.weather[0].main;
  const weatherDescription = data.weather[0].description;
  const windSpeed = data.wind.speed;
  const windGust = data.wind.gust;

  const weatherIcon = document.getElementById("weather-icon");
  const body = document.body;

  if (weatherCondition === "Clear") {
   weatherIcon.src = "/assets/clearSky.png";
   body.style.backgroundImage = "url(/assets/background/clear.jpg)";
  } else if (weatherCondition === "Clouds") {
   weatherIcon.src = "/assets/clouds.png";
   body.style.backgroundImage = "url(/assets/background/clouds.jpg)";
  } else if (weatherCondition === "Drizzle") {
   weatherIcon.src = "/assets/drizzle.png";
   body.style.backgroundImage = "url(/assets/background/drizzle.jpg)";
  } else if (weatherCondition === "Fog" || weatherCondition === "Mist") {
   weatherIcon.src = "/assets/fog.png";
   body.style.backgroundImage = "url(/assets/background/fog.jpg)";
  } else if (weatherCondition === "Rain") {
   weatherIcon.src = "/assets/rain.png";
   body.style.backgroundImage = "url(/assets/background/rain.jpg)";
  } else if (weatherCondition === "Sand") {
   weatherIcon.src = "/assets/sand.png";
   body.style.backgroundImage = "url(/assets/background/sand.jpg)";
  } else if (weatherCondition === "Snow") {
   weatherIcon.src = "/assets/snow.png";
   body.style.backgroundImage = "url(/assets/background/snow.jpg)";
  } else if (weatherCondition === "Thunderstorm") {
   weatherIcon.src = "/assets/storm.png";
   body.style.backgroundImage = "url(/assets/background/storm.jpg)";
  } else if (weatherCondition === "Tornado" || weatherCondition === "Squall") {
   weatherIcon.src = "/assets/tornado.png";
   body.style.backgroundImage = "url(/assets/background/tornado.jpg)";
  } else {
   weatherIcon.src = "/assets/dust.png";
   body.style.backgroundImage = "url(/assets/background/dust.jpg)";
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
    "You may have entered the city name incorrectly, or it may be a server error.",
   imageUrl: "/assets/error.svg",
   imageWidth: 400,
   imageHeight: 200,
   imageAlt: "Custom image",
  });
 }
}

function clearInput() {
 const val = document.getElementById("input");
 val.value = "";
}
