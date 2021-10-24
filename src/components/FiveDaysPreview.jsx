import React from 'react'
import { images } from '../images'
import styled from 'styled-components'

const StyledForecastPreview = styled.li`
  padding: 2rem;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 0.5rem;
`

const FiveDaysPreview = ({ forecast, checked }) => {
  const minCelsiusTemperature =
    Math.round(((forecast.Temperature.Minimum.Value - 32) * 5) / 9) + 'C'
  const maxCelsiusTemperature =
    Math.round(((forecast.Temperature.Maximum.Value - 32) * 5) / 9) + 'C'
  const forecastDay = new Date(forecast.Date).getDay()
  const weekday = new Array(7)
  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'
  if (!forecast) return <div>Loading</div>
  return (
    <StyledForecastPreview>
      <p>{weekday[forecastDay]}</p>
      <img src={images[forecast.Day.Icon]} alt='weather-icon'></img>
      {checked ? (
        <p>
          {forecast.Temperature.Minimum.Value}F -
          {forecast.Temperature.Maximum.Value}F
        </p>
      ) : (
        <p>
          {minCelsiusTemperature}-{maxCelsiusTemperature}
        </p>
      )}
    </StyledForecastPreview>
  )
}

export default FiveDaysPreview
