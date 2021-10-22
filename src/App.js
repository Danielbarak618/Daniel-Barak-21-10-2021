import { HashRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
function App() {
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

export default App
