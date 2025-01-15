// PSEUDO CODE

// - Unpack JSON
//   - Gets JSON and returns something manageable

// - Plot Data
//   - Console log in sequence

import "./style.css"

document.querySelector("#btn-update-weather").addEventListener("click", updateWeatherInfo)


function updateWeatherInfo() {
  
  const searchTerm = document.querySelector("#search-term").value
  const seachTermTreated = searchTerm.replaceAll(" ", "%20").replaceAll(",", "%2C");

  const apiKEY = "YQEDATKKB2FULXV2WHAP3R468";
  const apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${seachTermTreated}/next7days?unitGroup=metric&include=days&key=${apiKEY}&contentType=json`;

  getWeatherData(apiURL)
  .then((result) => updateWeatherCards(result));
}

async function getWeatherData(apiURL) {
  try {
    const fetchResponse = await fetch(apiURL, { mode: "cors" });
    const jsonResponse = await fetchResponse.json();
    return jsonResponse;
  } catch (err) {
    console.log("Error: " + err);
  }
}

function consoleLogResults(jsonResults) {
  const dataArray = jsonResults.days;

  dataArray.forEach((day) => {
    console.log(day.datetime);
    console.log(day.description);
    console.log(day.tempmax);
    console.log(day.temp);
    console.log(day.tempmin);
  });
}

function updateWeatherCards(json) {
  consoleLogResults(json)

  deleteAllWeatherCards()

  const divContent = document.querySelector("#div-content")

  const dataArray = json.days;
  dataArray.forEach((day) => {
    const newCard = createWeatherCard(
      day.datetime,
      day.description,
      day.tempmax,
      day.temp,
      day.tempmin
    )
    divContent.appendChild(newCard)
  })
}


function deleteAllWeatherCards() {
    const divContent = document.querySelector("#div-content")

    while(divContent.firstChild) divContent.removeChild(divContent.firstChild)
}

function createWeatherCard(date, description, maxTemp, currentTemp, minTemp) {
  // Create main container
  const weatherCard = createEle('div', 'weather-card');

  // Create and append date element
  const weatherDate = createEle('div', 'weather-date', date);
  weatherCard.appendChild(weatherDate);

  // Create and append weather description
  const weatherDescription = createEle('div', 'weather-description', description);
  weatherCard.appendChild(weatherDescription);

  // Create temperatures container
  const weatherTemps = createEle('div', 'weather-temps');

  // Create and append temperatures
  const tempMax = createEle('div', 'temp-max', `${maxTemp}°C`);
  const tempCurrent = createEle('div', 'temp-current', `${currentTemp}°C`);
  const tempMin = createEle('div', 'temp-min', `${minTemp}°C`);

  weatherTemps.appendChild(tempMax);
  weatherTemps.appendChild(tempCurrent);
  weatherTemps.appendChild(tempMin);

  // Append temperatures container to weather card
  weatherCard.appendChild(weatherTemps);

  return weatherCard;
}

function createEle(eleType, eleClass = undefined, EleContent = undefined) {
  const element = document.createElement(eleType);
  if (eleClass !== undefined) element.classList.add(eleClass);
  if (EleContent !== undefined) element.textContent = EleContent;

  return element;
}