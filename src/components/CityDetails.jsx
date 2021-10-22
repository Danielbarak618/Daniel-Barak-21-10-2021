import React from 'react'
import { images } from '../images'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Grid,
  Box,
  CardContent,
  IconButton,
  Card,
  Paper,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'
import { addToFavorites } from '../store/actions/weatherActions'

const CityDetails = ({ cityName, cityKey }) => {
  const { currCity } = useSelector((state) => state.weatherModule)
  const dispatch = useDispatch()

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
    },
    paperBox: {
      padding: theme.spacing(2),
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
    },
  }))

  const classes = useStyles()

  const addFavoriteLocation = () => {
    const favLoc = {
      id: cityKey,
      name: cityName,
      temp: {
        degrees: currCity[0].Temperature.Metric.Value,
        degreesUnit: currCity[0].Temperature.Metric.Unit,
      },
    }
    // console.log(favLoc)
    dispatch(addToFavorites(favLoc))
  }

  if (!currCity) return 'No data'
  // console.log(currCity)
  return (
    <>
      <Paper className={classes.paperBox}>
        <div className='container'>
          <Grid container spacing={2}>
            <Grid item>
              <IconButton color='primary'>
                <FavoriteIcon onClick={addFavoriteLocation} />
              </IconButton>
            </Grid>
            <Grid item>
              <img
                src={images[[currCity[0].WeatherIcon]]}
                alt='weather-icon'
                className={classes.img}
              />
            </Grid>

            <Grid item xs className={classes.topText}>
              <Typography variant='h5'>{cityName}</Typography>
            </Grid>
            {currCity[0].Temperature.Metric.Value}
            {currCity[0].Temperature.Metric.Unit}
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
        </div>
      </Paper>
    </>
  )
}

export default CityDetails
