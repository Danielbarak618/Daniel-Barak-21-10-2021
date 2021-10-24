import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import { ColorModeContext } from './ToggleColorMode'
import {
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link,
} from '@mui/material'
import styled from 'styled-components'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import makeStyles from '@mui/styles/makeStyles'

const StyledRightNav = styled.div`
  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`
const useStyles = makeStyles(() => ({
  active: {
    color: 'black',
  },
}))

const Navbar = () => {
  const theme = useTheme()
  const classes = useStyles()
  const location = useLocation()
  const { toggleColorMode } = useContext(ColorModeContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, fontSize: 16 }}
          >
            Herolo Task
          </Typography>
          <StyledRightNav>
            <IconButton color='inherit' onClick={toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <Link
              color='inherit'
              component={RouterLink}
              to='/'
              sx={{ fontSize: 13, textDecoration: 'none' }}
              className={location.pathname === '/' ? classes.active : ''}
            >
              Home
            </Link>
            <Link
              color='inherit'
              component={RouterLink}
              to='/favorites'
              sx={{ fontSize: 13, textDecoration: 'none' }}
              className={
                location.pathname === '/favorites' ? classes.active : ''
              }
            >
              Favorites
            </Link>
          </StyledRightNav>
        </Toolbar>
      </AppBar>
    </Box>
    // <header className='header'>
    //   <a href='#' className='logo'>
    //     Herolo Weather Task
    //   </a>
    //   <nav className='navbar'>
    //     <Link to='/' className='link'>
    //       Home
    //     </Link>
    //     <Link to='/favorites' className='link'>
    //       Favorites
    //     </Link>
    //     <button onClick={colorMode.toggleColorMode}>Change</button>
    //   </nav>
    // </header>
  )
}

export default Navbar
