import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/global.scss'
import App from './App'

import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import ToggleColorMode from './components/ToggleColorMode'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Renders up with chosen mode */}
      <ToggleColorMode />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
