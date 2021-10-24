import React from 'react'

import FiveDaysPreview from './FiveDaysPreview'
import styled from 'styled-components'

const FiveDaysForecast = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
  padding: 1rem 3rem;
`

const FiveDaysList = ({ fiveDaysForecast, checked }) => {
  if (
    !fiveDaysForecast?.DailyForecasts ||
    !fiveDaysForecast?.DailyForecasts.length
  )
    return 'No data'

  return (
    <FiveDaysForecast>
      {fiveDaysForecast.DailyForecasts.map((forecast, idx) => (
        <FiveDaysPreview forecast={forecast} key={idx} checked={checked} />
      ))}
    </FiveDaysForecast>
  )
}

export default FiveDaysList
