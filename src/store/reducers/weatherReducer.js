const INITIAL_STATE = {
  cityNames: [],
  currCity: null,
  fiveDaysForecast: [],
  favorites: [],
  currCityKey: '',
  isFavorite: null,
  currCityName: '',
  isFromGeo: false,
}

export function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CITIES_SEARCH':
      return {
        ...state,
        cityNames: action.cities,
      }
    case 'SET_CITY_NAME':
      return {
        ...state,
        currCityName: action.cityName,
      }
    case 'SET_IS_FROM_GEO':
      return {
        ...state,
        isFromGeo: action.isFromGeo,
      }
    case 'SET_CITY':
      return {
        ...state,
        currCity: action.city,
      }
    case 'SET_CITY_KEY':
      return {
        ...state,
        currCityKey: action.cityKey,
      }
    case 'SET_FIVE_DAYS_FORECAST':
      return {
        ...state,
        fiveDaysForecast: action.fiveDaysForecast,
      }
    case 'SET_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.location],
      }
    case 'IS_FAVORITE': {
      return {
        ...state,
        isFavorite: action.isFavorite,
      }
    }
    case 'SET_INITIAL_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
      }

    case 'DELETE_FAVORITE':
      return {
        ...state,
        favorites: action.deletedLocation,
      }

    default:
      return state
  }
}
