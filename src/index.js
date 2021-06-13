/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const asyncHandler = (function () {
  const _key = 'f597bfe05121afdfb2f2b115097ef459'

  async function getWeatherData(location) {
    try {
      const cleanLocation = location.toUpperCase()
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cleanLocation}&appid=${_key}&units=metric`,
        { mode: 'cors' }
      )
      const bruteData = await result.json()
      return bruteData
    } catch (err) {
      console.log(err)
      return 'There was an error'
    }
  }

  return { getWeatherData }
})()

const misc = (function () {
  const currentScale = 'Celsius'

  const parseC = (temp) => {
    const celsius = Math.round(((temp - 32) * 5) / 9)
    return celsius
  }

  const parseF = (temp) => {
    const fahrenheit = Math.round(temp * (9 / 5) + 32)
    return fahrenheit
  }

  return { parseF, parseC, currentScale }
})()

const domHandler = (function () {
  const nameElem = document.querySelector('.cityName')
  const tempElem = document.querySelector('.cityTemp')
  const maxTempElem = document.querySelector('.highTempValue')
  const minTempElem = document.querySelector('.lowTempValue')
  const feelsElem = document.querySelector('.feelsLikeValue')
  const sunriseElem = document.querySelector('.sunriseValue')
  const sunsetElem = document.querySelector('.sunsetValue')
  const visibilityElem = document.querySelector('.visibilityValue')
  const humidityElem = document.querySelector('.humidityValue')
  const windElem = document.querySelector('.windValue')
  const toggleCelsiusElem = document.querySelector('#celsius')
  const toggleFahrenheitElem = document.querySelector('#fahrenheit')

  const _renderName = (name) => {
    nameElem.textContent = name
  }
  const _renderTemp = (temp, scale) => {
    if (scale === 'Celsius') {
      tempElem.textContent = `${temp}°C`
    } else if (scale === 'Fahrenheit') {
      tempElem.textContent = `${misc.parseF(temp)}°F`
    }
  }
  const _renderTempMax = (tempMax, scale) => {
    if (scale === 'Celsius') {
      maxTempElem.textContent = `${tempMax}°C`
    } else if (scale === 'Fahrenheit') {
      maxTempElem.textContent = `${misc.parseF(tempMax)}°F`
    }
  }
  const _renderTempMin = (tempMin, scale) => {
    if (scale === 'Celsius') {
      minTempElem.textContent = `${tempMin}°C`
    } else if (scale === 'Fahrenheit') {
      minTempElem.textContent = `${misc.parseF(tempMin)}°F`
    }
  }
  const _renderFeelsLike = (feelsLike, scale) => {
    if (scale === 'Celsius') {
      feelsElem.textContent = `${feelsLike}°C`
    } else if (scale === 'Fahrenheit') {
      feelsElem.textContent = `${misc.parseF(feelsLike)}°F`
    }
  }
  const _renderSunrise = (sunrise) => {
    sunriseElem.textContent = sunrise
  }
  const _renderSunset = (sunset) => {
    sunsetElem.textContent = sunset
  }
  const _renderVisibility = (visibility) => {
    visibilityElem.textContent = `${visibility} km`
  }
  const _renderHumidity = (humidity) => {
    humidityElem.textContent = `${humidity}%`
  }
  const _renderWind = (wind) => {
    windElem.textContent = `${wind} km/h`
  }

  const renderChangedScale = () => {
    if (misc.currentScale === 'Fahrenheit') {
      tempElem.textContent = `${misc.parseF(
        parseInt(tempElem.textContent, 10)
      )}°F`
      maxTempElem.textContent = `${misc.parseF(
        parseInt(maxTempElem.textContent, 10)
      )}°F`
      minTempElem.textContent = `${misc.parseF(
        parseInt(minTempElem.textContent, 10)
      )}°F`
      feelsElem.textContent = `${misc.parseF(
        parseInt(feelsElem.textContent, 10)
      )}°F`
    } else {
      tempElem.textContent = `${misc.parseC(
        parseInt(tempElem.textContent, 10)
      )}°C`
      maxTempElem.textContent = `${misc.parseC(
        parseInt(maxTempElem.textContent, 10)
      )}°C`
      minTempElem.textContent = `${misc.parseC(
        parseInt(minTempElem.textContent, 10)
      )}°C`
      feelsElem.textContent = `${misc.parseC(
        parseInt(feelsElem.textContent, 10)
      )}°C`
    }
    toggleFahrenheitElem.classList.toggle('selectedTemp')
    toggleCelsiusElem.classList.toggle('selectedTemp')
  }

  const renderAllInfo = (data) => {
    const scale = misc.currentScale
    _renderName(data.name)
    _renderTemp(data.temp, scale)
    _renderTempMax(data.tempMax, scale)
    _renderTempMin(data.tempMin, scale)
    _renderFeelsLike(data.feelsLike, scale)
    _renderSunrise(data.sunrise)
    _renderSunset(data.sunset)
    _renderVisibility(data.visibility)
    _renderHumidity(data.humidity)
    _renderWind(data.wind)
  }

  return { renderAllInfo, renderChangedScale }
})()

const topLogic = (function () {
  const searchButton = document.querySelector('.searchButton')
  const searchBar = document.querySelector('.searchbar')
  const toggleScaleButton = document.querySelector('.switchTemp')

  function _changeScale() {
    if (misc.currentScale === 'Celsius') {
      misc.currentScale = 'Fahrenheit'
    } else {
      misc.currentScale = 'Celsius'
    }
    domHandler.renderChangedScale()
  }

  function _parseDate(unix) {
    const date = new Date(unix * 1000)
    let hour = date.getHours()
    let minutes = date.getMinutes()

    if (hour < 10) hour = `0${hour}`
    if (minutes < 10) minutes = `0${minutes}`

    return `${hour}:${minutes}`
  }

  function _cleanData(data) {
    const _cleanedData = {
      name: data.name,
      temp: Math.round(data.main.temp),
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
      feelsLike: Math.round(data.main.feels_like),
      sunrise: _parseDate(data.sys.sunrise),
      sunset: _parseDate(data.sys.sunset),
      visibility: Math.round(data.visibility / 1000),
      humidity: Math.round(data.main.humidity),
      wind: Math.round(data.wind.speed * 3.6),
    }
    return _cleanedData
  }

  async function displayInfo() {
    const location = searchBar.value
    const _bruteData = await asyncHandler.getWeatherData(location)
    const _cleanedData = _cleanData(_bruteData)
    domHandler.renderAllInfo(_cleanedData)
    searchBar.value = ''
  }

  searchButton.addEventListener('click', displayInfo)
  toggleScaleButton.addEventListener('click', _changeScale)

  return { displayInfo }
})()
