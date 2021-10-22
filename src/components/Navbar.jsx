import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ColorModeContext } from './ToggleColorMode'

const Navbar = () => {
  const colorMode = useContext(ColorModeContext)
  return (
    <header className='header'>
      <a href='#' className='logo'>
        Herolo Weather Task
      </a>
      <nav className='navbar'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/favorites' className='link'>
          Favorites
        </Link>
        <button onClick={colorMode.toggleColorMode}>Change</button>
      </nav>
    </header>
  )
}

export default Navbar
