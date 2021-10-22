import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialFavorites } from '../store/actions/weatherActions'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitialFavorites())
  }, [dispatch])
  return <div>Favorites</div>
}

export default Favorites
