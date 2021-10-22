import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadCitySearch,
  loadCityByKey,
  loadFiveDaysForecast,
} from '../store/actions/weatherActions'
import CityDetails from '../components/CityDetails'
import FiveDaysList from '../components/FiveDaysList'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { Container, Paper } from '@mui/material'

const StyledContainer = styled(Paper)`
  margin-top: 10rem;
  padding: 0.2rem 10rem;
`

const StyledSearchContainer = styled.div`
  max-width: 30rem;
  margin: 3rem auto;
`

const StyledWeatherContainer = styled.div`
  background-color: #ffff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
`

const StyledWeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1.5rem;
  width: 25rem;
`

const Home = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [citiesSearch, setCitiesSearch] = useState('Tel-Aviv')
  const [cityName, setCityName] = useState('Tel-Aviv')
  const [cityKey, setCityKey] = useState('215854')
  const { cityNames } = useSelector((state) => state.weatherModule)
  const { fiveDaysForecast } = useSelector((state) => state.weatherModule)
  const dispatch = useDispatch()
  if (cityKey === '') setIsDisabled(true)

  // function handleInputChange(event, value) {
  //   console.log(event)
  //   if (value !== '') {
  //     setCitiesSearch(value)
  //   }
  // }

  const inputDebounce = useDebouncedCallback((value) => {
    if (value !== '') {
      setCitiesSearch(value)
    }
  }, 1000)

  const submitCity = () => {
    setCityName(citiesSearch)
    dispatch(loadCityByKey(cityKey))
    dispatch(loadFiveDaysForecast(cityKey))
  }

  useEffect(() => {
    // if (citiesSearch !== '' && citiesSearch.length > 0) {
    dispatch(loadCitySearch(citiesSearch)) // Add only english letters
    dispatch(loadCityByKey(cityKey))
    dispatch(loadFiveDaysForecast(cityKey))
    // }
    setCityName(citiesSearch)
  }, [dispatch, citiesSearch, cityKey])

  // console.log('hi')
  return (
    <StyledContainer>
      <StyledSearchContainer>
        <Autocomplete
          getOptionDisabled={() => isDisabled}
          onInputChange={(_, value) => inputDebounce(value)}
          disablePortal
          options={cityNames}
          getOptionLabel={(option) => option.LocalizedName}
          onChange={(e, option) => setCityKey(option.Key)}
          renderInput={(params) => <TextField {...params} label='City' />}
        />
        {/* <button onClick={submitCity}>Search</button> */}
      </StyledSearchContainer>
      <StyledWeatherContainer>
        <CityDetails cityName={cityName} cityKey={cityKey} />
        <FiveDaysList fiveDaysForecast={fiveDaysForecast} />
      </StyledWeatherContainer>
    </StyledContainer>
  )
}
// export default Home
export default Home
