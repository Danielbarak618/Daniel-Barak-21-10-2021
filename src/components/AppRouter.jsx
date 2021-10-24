import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../pages/Home'
import Favorites from '../pages/Favorites'

const AppRouter = () => {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/favorites' exact component={Favorites} />
      </Switch>
    </HashRouter>
  )
}

export default AppRouter
