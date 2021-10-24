import { HashRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Home from './pages/Home'

import { Container } from '@mui/material'

function App() {
  return (
    <Container maxWidth='xl' style={{ paddingLeft: 0, paddingRight: 0 }}>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/favorites' exact component={Favorites} />
        </Switch>
      </HashRouter>
    </Container>
  )
}

export default App
