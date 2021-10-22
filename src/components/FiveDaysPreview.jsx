import React from 'react'
import { images } from '../images'

const FiveDaysPreview = ({ forecast }) => {
  // console.log(forecast)
  const minTemperature =
    Math.round(((forecast.Temperature.Minimum.Value - 32) * 5) / 9) + 'C'
  const forecastDay = new Date(forecast.Date).getDay()
  const weekday = new Array(7)
  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'

  return (
    <li className='card'>
      <p>{weekday[forecastDay]}</p>
      <img src={images[forecast.Day.Icon]} alt='weather-icon'></img>

      <p> {minTemperature} - 30C </p>
    </li>
  )
}

export default FiveDaysPreview
