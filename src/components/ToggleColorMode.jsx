import React from 'react'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import App from '../App'
import { CssBaseline } from '@mui/material'
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
