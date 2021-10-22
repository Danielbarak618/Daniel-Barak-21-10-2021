import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
      </nav>
    </header>
  )
}

export default Navbar
