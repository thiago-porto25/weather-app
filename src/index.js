/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const asyncHandler = (function () {
  const _key = 'f597bfe05121afdfb2f2b115097ef459'

  async function getWeatherData(location) {
    try {
      const cleanLocation = location.toUpperCase()
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cleanLocation}&appid=${_key}`,
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

asyncHandler.getWeatherData('London,uk')
