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
      const favorites = _checkLocalStorage()
      if (favorites.length) {
        const keyFound = favorites.find((l) => l.id === locationKey)

        if (keyFound) dispatch({ type: 'IS_FAVORITE', isFavorite: true })
        else dispatch({ type: 'IS_FAVORITE', isFavorite: false })
      }
      const city = await weatherService.getCityByCode(locationKey)
      dispatch({ type: 'SET_CITY', city })
      dispatch({ type: 'SET_CITY_KEY', cityKey: locationKey })
    } catch (err) {
      console.log(err)
    }
  }
}

export function loadCityByCoords(position) {
  return async (dispatch) => {
    try {
      const cityKey = await weatherService.getCityByCoords(position)
      const city = await weatherService.getCityByCode(cityKey.Key)
      const fiveDaysForecast = await weatherService.loadFiveDaysForecast(
        cityKey.Key
      )
      dispatch({ type: 'SET_CITY', city })
      dispatch({ type: 'SET_IS_FROM_GEO', isFromGeo: true })
      dispatch({ type: 'SET_CITY_KEY', cityKey: cityKey.Key })
      dispatch({ type: 'SET_CITY_NAME', cityName: cityKey.LocalizedName })
      dispatch({ type: 'SET_FIVE_DAYS_FORECAST', fiveDaysForecast })
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

export function toggleFavorites(location) {
  return (dispatch) => {
    const favorites = _checkLocalStorage()
    const locationFound = favorites.find((l) => l.name === location.name)
    if (!locationFound) {
      favorites.push(location)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      dispatch({ type: 'ADD_FAVORITE', location })
      dispatch({ type: 'IS_FAVORITE', isFavorite: true })
    } else {
      const deletedLocation = favorites.filter(
        (loc) => loc.name !== location.name
      )
      localStorage.setItem('favorites', JSON.stringify(deletedLocation))
      dispatch({ type: 'DELETE_FAVORITE', deletedLocation })
      dispatch({ type: 'IS_FAVORITE', isFavorite: false })
    }
  }
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
