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
  const _nameElem = document.querySelector('.cityName')
  const _tempElem = document.querySelector('.cityTemp')
  const _maxTempElem = document.querySelector('.highTempValue')
  const _minTempElem = document.querySelector('.lowTempValue')
  const _feelsElem = document.querySelector('.feelsLikeValue')
  const _sunriseElem = document.querySelector('.sunriseValue')
  const _sunsetElem = document.querySelector('.sunsetValue')
  const _visibilityElem = document.querySelector('.visibilityValue')
  const _humidityElem = document.querySelector('.humidityValue')
  const _windElem = document.querySelector('.windValue')
  const _toggleCelsiusElem = document.querySelector('#celsius')
  const _toggleFahrenheitElem = document.querySelector('#fahrenheit')
  const _descriptionElem = document.querySelector('.cityForecast')
  const _castIcon = document.querySelector('.castIcon')
  const _errorMessage = document.querySelector('.errorMsg')
  const _modal = document.querySelector('.modal')

  const _renderName = (name) => {
    _nameElem.textContent = name
  }
  const _renderTemp = (temp, scale) => {
    if (scale === 'Celsius') {
      _tempElem.textContent = `${temp}°C`
    } else if (scale === 'Fahrenheit') {
      _tempElem.textContent = `${misc.parseF(temp)}°F`
    }
  }
  const _renderTempMax = (tempMax, scale) => {
    if (scale === 'Celsius') {
      _maxTempElem.textContent = `${tempMax}°C`
    } else if (scale === 'Fahrenheit') {
      _maxTempElem.textContent = `${misc.parseF(tempMax)}°F`
    }
  }
  const _renderTempMin = (tempMin, scale) => {
    if (scale === 'Celsius') {
      _minTempElem.textContent = `${tempMin}°C`
    } else if (scale === 'Fahrenheit') {
      _minTempElem.textContent = `${misc.parseF(tempMin)}°F`
    }
  }
  const _renderFeelsLike = (feelsLike, scale) => {
    if (scale === 'Celsius') {
      _feelsElem.textContent = `${feelsLike}°C`
    } else if (scale === 'Fahrenheit') {
      _feelsElem.textContent = `${misc.parseF(feelsLike)}°F`
    }
  }
  const _renderSunrise = (sunrise) => {
    _sunriseElem.textContent = sunrise
  }
  const _renderSunset = (sunset) => {
    _sunsetElem.textContent = sunset
  }
  const _renderVisibility = (visibility) => {
    _visibilityElem.textContent = `${visibility} km`
  }
  const _renderHumidity = (humidity) => {
    _humidityElem.textContent = `${humidity}%`
  }
  const _renderWind = (wind) => {
    _windElem.textContent = `${wind} km/h`
  }
  const _renderDescription = (desc) => {
    _descriptionElem.textContent = desc

    if (desc === 'Clouds')
      _castIcon.setAttribute('class', 'fas castIcon fa-cloud')
    else if (desc === 'Rain' || desc === 'Thunderstorm' || desc === 'Drizzle')
      _castIcon.setAttribute('class', 'fas castIcon fa-cloud-rain')
    else if (desc === 'Clear')
      _castIcon.setAttribute('class', 'fas castIcon fa-sun')
    else if (desc === 'Snow')
      _castIcon.setAttribute('class', 'fas castIcon fa-snowflake')
    else _castIcon.setAttribute('class', 'fas castIcon fa-smog')
  }

  const renderChangedScale = () => {
    if (misc.currentScale === 'Fahrenheit') {
      _tempElem.textContent = `${misc.parseF(
        parseInt(_tempElem.textContent, 10)
      )}°F`
      _maxTempElem.textContent = `${misc.parseF(
        parseInt(_maxTempElem.textContent, 10)
      )}°F`
      _minTempElem.textContent = `${misc.parseF(
        parseInt(_minTempElem.textContent, 10)
      )}°F`
      _feelsElem.textContent = `${misc.parseF(
        parseInt(_feelsElem.textContent, 10)
      )}°F`
    } else {
      _tempElem.textContent = `${misc.parseC(
        parseInt(_tempElem.textContent, 10)
      )}°C`
      _maxTempElem.textContent = `${misc.parseC(
        parseInt(_maxTempElem.textContent, 10)
      )}°C`
      _minTempElem.textContent = `${misc.parseC(
        parseInt(_minTempElem.textContent, 10)
      )}°C`
      _feelsElem.textContent = `${misc.parseC(
        parseInt(_feelsElem.textContent, 10)
      )}°C`
    }
    _toggleFahrenheitElem.classList.toggle('selectedTemp')
    _toggleCelsiusElem.classList.toggle('selectedTemp')
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
    _renderDescription(data.description)
  }

  const renderErrorMessage = () => {
    _errorMessage.style.display = 'flex'
  }

  const unrenderErrorMessage = () => {
    _errorMessage.style.display = 'none'
  }

  const renderModal = () => {
    _modal.style.display = 'flex'
  }

  const unrenderModal = () => {
    _modal.style.display = 'none'
  }

  return {
    renderAllInfo,
    renderChangedScale,
    renderErrorMessage,
    unrenderErrorMessage,
    renderModal,
    unrenderModal,
  }
})()

const topLogic = (function () {
  const _searchButton = document.querySelector('.searchButton')
  const _searchBar = document.querySelector('.searchbar')
  const _toggleScaleButton = document.querySelector('.switchTemp')

  function _changeScale() {
    if (misc.currentScale === 'Celsius') {
      misc.currentScale = 'Fahrenheit'
    } else {
      misc.currentScale = 'Celsius'
    }
    domHandler.renderChangedScale()
  }

  function _parseDate(unix) {
    const _date = new Date(unix * 1000)
    let _hour = _date.getHours()
    let _minutes = _date.getMinutes()

    if (_hour < 10) _hour = `0${_hour}`
    if (_minutes < 10) _minutes = `0${_minutes}`

    return `${_hour}:${_minutes}`
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
      description: data.weather[0].main,
    }
    return _cleanedData
  }

  async function _displayInfo(locale) {
    let _location

    if (typeof locale === 'string') _location = locale
    else _location = _searchBar.value

    try {
      if (_location === undefined || /^\s+$/.test(_location)) throw Error
      domHandler.renderModal()
      const _bruteData = await asyncHandler.getWeatherData(_location)
      const _cleanedData = _cleanData(_bruteData)
      domHandler.renderAllInfo(_cleanedData)
      _searchBar.value = ''
      domHandler.unrenderModal()
    } catch (err) {
      domHandler.unrenderModal()
      domHandler.renderErrorMessage()
      setTimeout(() => {
        domHandler.unrenderErrorMessage()
        _searchBar.value = ''
      }, 3000)
    }
  }

  _searchButton.addEventListener('click', _displayInfo)
  _toggleScaleButton.addEventListener('click', _changeScale)

  _displayInfo('Arraial do Cabo')
})()
