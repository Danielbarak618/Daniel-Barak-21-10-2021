import axios from 'axios'
export const weatherService = {
  getCitiesBySearch,
  getCityByCode,
  loadFiveDaysForecast,
  getCityByCoords,
}
const CURR_CITY_BY_POS_URL =
  'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
const FIVE_DAYS_FORECAST_URL =
  'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
const AUTO_COMPLETE_URL =
  'https://dataservice.accuweather.com/locations/v1/cities/autocomplete?'
const CURR_CITY_WEATHER_URL =
  'https://dataservice.accuweather.com/currentconditions/v1/'
const API_KEY = 'hfPymT1xQ6G7A3rAu7GBuBsA5pbl3KtH'

async function getCitiesBySearch(key) {
  try {
    const { data } = await axios.get(
      `${AUTO_COMPLETE_URL}apikey=${API_KEY}&q=${key}`
    )
    const searchParams = data.map(({ Key, LocalizedName }) => {
      return { Key, LocalizedName }
    })
    const filteredOptions = []
    const optionExists = {}
    searchParams.forEach((search) => {
      if (!optionExists[search.LocalizedName]) {
        optionExists[search.LocalizedName] = true
        filteredOptions.push(search)
      }
    })
    return filteredOptions
  } catch (err) {
    console.log(err)
  }
}

async function getCityByCoords({ latitude, longitude }) {
  try {
    const { data } = await axios.get(
      `${CURR_CITY_BY_POS_URL}?apikey=${API_KEY}&q=${latitude},${longitude}`
    )
    return data
  } catch (err) {
    console.log(err)
  }
}

async function getCityByCode(Key) {
  try {
    const { data } = await axios.get(
      `${CURR_CITY_WEATHER_URL}${Key}?apikey=${API_KEY}`
    )

    return data
  } catch (err) {
    console.log(err)
  }
}

async function loadFiveDaysForecast(locationKey) {
  try {
    const { data } = await axios.get(
      `${FIVE_DAYS_FORECAST_URL}${locationKey}?apikey=${API_KEY}`
    )
    return data
  } catch (err) {
    console.log(err)
  }
}
