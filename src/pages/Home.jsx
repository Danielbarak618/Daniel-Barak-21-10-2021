import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'

import { useDispatch, useSelector } from 'react-redux'
import {
  loadCitySearch,
  loadCityByKey,
  loadFiveDaysForecast,
  loadCityByCoords,
} from '../store/actions/weatherActions'
import CityDetails from '../components/CityDetails'
import FiveDaysList from '../components/FiveDaysList'
import { useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const StyledContainer = styled.div`
  margin-top: 10rem;
  /* padding: 0.2rem 10rem; */
  /* border: 1px solid black; */
`

const StyledSearchContainer = styled.div`
  max-width: 30rem;
  margin: 3rem auto;
`

const StyledWeatherContainer = styled.div`
  border-radius: 15px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
`

const Home = () => {
  const [citiesSearch, setCitiesSearch] = useState('Tel-Aviv')
  const [checked, setIsChecked] = useState(false)
  const { cityNames, currCityName, isFromGeo, currCityKey, fiveDaysForecast } =
    useSelector((state) => state.weatherModule)
  const [cityKey, setCityKey] = useState(currCityKey || '215854')
  const [cityName, setCityName] = useState(currCityName || 'Tel-Aviv')
  const dispatch = useDispatch()
  const location = useLocation()

  const inputDebounce = useDebouncedCallback((value) => {
    if (value !== '') {
      setCitiesSearch(value)
    }
  }, 500)

  const handleSearchCityChange = (e, option) => {
    if (option) {
      dispatch(loadCityByKey(option.Key))
      dispatch(loadFiveDaysForecast(option.Key))
      setCityKey(option.Key)
      setCityName(option.LocalizedName)
    } else {
      setCityKey(currCityKey)
      setCityName(currCityName)
    }
  }

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
  }

  useEffect(() => {
    if (navigator.geolocation && !isFromGeo) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(loadCityByCoords(position.coords))
        setCityName(currCityName)
      })
    }
  }, [dispatch, currCityName, isFromGeo, currCityKey])

  useEffect(() => {
    if (location.state) {
      dispatch(loadCityByKey(location.state.favoriteParams.key))
      dispatch(loadFiveDaysForecast(location.state.favoriteParams.key))
      setCityName(location.state.favoriteParams.name)
      delete location.state
    } else {
      dispatch(loadCityByKey(cityKey))
      dispatch(loadFiveDaysForecast(cityKey))
    }

    dispatch(loadCitySearch(citiesSearch))
  }, [citiesSearch, currCityKey, location, dispatch, cityKey])

  return (
    <StyledContainer>
      <StyledSearchContainer>
        <Autocomplete
          onInputChange={(_, value) => inputDebounce(value)}
          disablePortal
          options={cityNames}
          isOptionEqualToValue={(option, value) => option.Key === value.Key}
          getOptionLabel={(option) => option.LocalizedName}
          onChange={handleSearchCityChange}
          renderInput={(params) => <TextField {...params} label='City' />}
        />
      </StyledSearchContainer>
      <StyledWeatherContainer>
        <Switch checked={checked} onChange={handleChange} />
        <CityDetails cityName={cityName} cityKey={cityKey} checked={checked} />
        <FiveDaysList fiveDaysForecast={fiveDaysForecast} checked={checked} />
      </StyledWeatherContainer>
    </StyledContainer>
  )
}
export default Home
