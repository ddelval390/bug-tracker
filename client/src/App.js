import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './core/MainRouter'
import Store from './global/Store'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'


function App() {

  return (
    
      <Store>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainRouter />
          </ThemeProvider>
        </BrowserRouter>
      </Store>
    
  );
}

export default App;
