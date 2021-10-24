import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialFavorites } from '../store/actions/weatherActions'
import styled from 'styled-components'
import { images } from '../images'
import { Typography } from '@mui/material'

const FavoritesContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
  padding: 1rem 3rem;
  margin-top: 4rem;
  width: 100%;
`

const StyledCityName = styled.div`
  text-align: center;
`

const StyledContainer = styled.div`
  /* display: flex;
align-items: center;
justify-content: center; */
`

const StyledDegrees = styled.div`
  text-align: center;
`

const StyledFavoritePreview = styled.li`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 3rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid black;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`

const Favorites = () => {
  const { favorites } = useSelector((state) => state.weatherModule)
  const dispatch = useDispatch()
  const history = useHistory()

  const goToHomePage = (favorite) => {
    // dispatch(loadCityByKey(favoriteId))
    const favoriteParams = {
      key: favorite.id,
      name: favorite.name,
    }
    history.push({
      pathname: '/',
      state: { favoriteParams },
    })
  }
  useEffect(() => {
    dispatch(setInitialFavorites())
  }, [dispatch])

  if (!favorites)
    return (
      <Typography variant='h2' textAlign='center' marginTop='4rem'>
        No Favorites Yet
      </Typography>
    )
  return (
    <StyledContainer>
      <Typography variant='h2' textAlign='center' marginTop='4rem'>
        Favorites
      </Typography>
      <FavoritesContainer>
        {favorites.map((favorite) => (
          <StyledFavoritePreview
            key={favorite.id}
            onClick={() => goToHomePage(favorite)}
          >
            <StyledCityName>{favorite.name}</StyledCityName>
            <img src={images[favorite.img]} alt='weather-icon' />
            <StyledDegrees>
              {favorite.temp.degrees}
              {favorite.temp.degreesUnit}
            </StyledDegrees>
            {favorite.text}
          </StyledFavoritePreview>
        ))}
      </FavoritesContainer>
    </StyledContainer>
  )
}

export default Favorites
