import React, { useState, useEffect } from 'react'
import { images } from '../images'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Grid, Box, IconButton, Paper } from '@mui/material'
import { styled } from '@mui/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import makeStyles from '@mui/styles/makeStyles'
import { toggleFavorites } from '../store/actions/weatherActions'
const StyledPaper = styled(Paper)({
  padding: 2,
  margin: 'auto',
  maxWidth: 700,
  marginBottom: 30,
})

const CityDetails = ({ cityName, cityKey, checked }) => {
  const { currCity, isFavorite, currCityName } = useSelector(
    (state) => state.weatherModule
  )
  const [isLiked, setIsLiked] = useState(isFavorite)
  // const [checked, setIsChecked] = useState(false)

  const dispatch = useDispatch()

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
    },
    paperBox: {
      padding: 2,
      margin: 'auto',
      maxWidth: 700,
      marginBottom: 30,
    },
    img: {
      width: 150,
      marginTop: 3,
      marginLeft: 45,
    },
    card: {
      textAlign: 'center',
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    pos: {
      marginBottom: 12,
    },
    topText: {
      textAlign: 'left',
      fontSize: '2rem',
    },
  }))

  const classes = useStyles()

  useEffect(() => {
    setIsLiked(isFavorite)
  }, [isFavorite, checked])

  const addFavoriteLocation = () => {
    const favLoc = {
      id: cityKey,
      name: cityName,
      temp: {
        degrees: currCity[0].Temperature.Metric.Value,
        degreesUnit: currCity[0].Temperature.Metric.Unit,
      },
      text: currCity[0].WeatherText,
      img: currCity[0].WeatherIcon,
    }
    dispatch(toggleFavorites(favLoc))
  }

  if (!currCity) return 'No data'
  return (
    <>
      <StyledPaper>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton color='primary' onClick={addFavoriteLocation}>
              {isLiked ? (
                <FavoriteIcon style={{ fill: 'red' }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
          </Grid>
          <Grid item>
            {currCity[0].WeatherIcon ? (
              <img
                src={images[[currCity[0].WeatherIcon]]}
                alt='weather-icon'
                className={classes.img}
              />
            ) : (
              <img
                src='https://www.frozenropes.com/natick/wp-content/uploads/sites/11/2021/06/sun-transparent.png'
                alt='weather-icon'
              />
            )}
          </Grid>

          <Grid item xs className={classes.topText}>
            <Typography variant='h5'>{cityName || currCityName}</Typography>

            {checked ? (
              <>
                {currCity[0].Temperature.Imperial.Value}
                {currCity[0].Temperature.Imperial.Unit}
              </>
            ) : (
              <>
                {currCity[0].Temperature.Metric.Value}
                {currCity[0].Temperature.Metric.Unit}
              </>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={2}
          justifyContent='flex-end'
          alignItems='center'
        ></Grid>
        <Grid item xs={12}>
          <Box className={classes.paper} m={4}>
            <Typography variant='h2'>{currCity[0].WeatherText}</Typography>
          </Box>
        </Grid>
      </StyledPaper>
    </>
  )
}

export default CityDetails
