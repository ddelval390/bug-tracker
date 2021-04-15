import { createMuiTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#AED1E3',
    },
    secondary: {
      main: '#AED1E3',
    },
    background: {
      default: '#414554',
    },
    
    openTitle: '#3f4771',
    protectedTitle: pink['400'],
    type: 'dark'
    
  },
  

  
})

export default theme