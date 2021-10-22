import { weatherService } from '../../services/weather-service'

export function loadCitySearch(key) {
  return async (dispatch) => {
    try {
      const cities = await weatherService.getCitiesBySearch(key)
      dispatch({ type: 'SET_CITIES_SEARCH', cities })
    } catch (err) {
      console.log(err)
    }
  }
}

export function loadCityByKey(locationKey) {
  return async (dispatch) => {
    try {
      const city = await weatherService.getCityByCode(locationKey)
      dispatch({ type: 'SET_CITY', city })
    } catch (err) {
      console.log(err)
    }
  }
}

export function loadFiveDaysForecast(locationKey) {
  return async (dispatch) => {
    try {
      const fiveDaysForecast = await weatherService.loadFiveDaysForecast(
        locationKey
      )
      dispatch({ type: 'SET_FIVE_DAYS_FORECAST', fiveDaysForecast })
    } catch (err) {
      console.log(err)
    }
  }
}

export function addToFavorites(location) {
  return (dispatch) => {
    const favorites = _checkLocalStorage()
    const locationFound = favorites.find((l) => l.id === location.id)
    if (!locationFound) {
      favorites.push(location)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      dispatch({ type: 'ADD_FAVORITE', location })
    }
  }

  // console.log(location)
}

export function setInitialFavorites() {
  return (dispatch) => {
    const favorites = _checkLocalStorage()
    dispatch({ type: 'SET_INITIAL_FAVORITES', favorites })
  }
}

function _checkLocalStorage() {
  const favoritesJson = localStorage.getItem('favorites')
  let favorites = []
  if (favoritesJson) {
    favorites = JSON.parse(favoritesJson)
  } else {
    localStorage.setItem('favorites', favorites)
  }
  return favorites
}
