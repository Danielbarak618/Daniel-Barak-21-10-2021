import React from 'react'
import { useSelector } from 'react-redux'
import FiveDaysPreview from './FiveDaysPreview'

const FiveDaysList = () => {
  const { fiveDaysForecast } = useSelector((state) => state.weatherModule)

  if (
    !fiveDaysForecast.DailyForecasts ||
    !fiveDaysForecast.DailyForecasts.length
  )
    return 'No data'

  return (
    <ul className='five-days-list'>
      {fiveDaysForecast.DailyForecasts.map((forecast, idx) => (
        <FiveDaysPreview forecast={forecast} key={idx} />
      ))}
    </ul>
  )
}

export default FiveDaysList
