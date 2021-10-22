const INITIAL_STATE = {
  cityNames: [],
  currCity: null,
  fiveDaysForecast: [],
  favorites: [],
}

export function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CITIES_SEARCH':
      return {
        ...state,
        cityNames: action.cities,
      }
    case 'SET_CITY':
      return {
        ...state,
        currCity: action.city,
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
    case 'SET_INITIAL_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
      }

    default:
      return state
  }
}
