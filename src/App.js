import { HashRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import styled from 'styled-components'
import { Paper } from '@mui/material'
const StyledAppContainer = styled(Paper)`
  height: 100vh;
`

function App() {
  return (
    <StyledAppContainer>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/favorites' exact component={Favorites} />
        </Switch>
      </HashRouter>
    </StyledAppContainer>
  )
}

export default App
