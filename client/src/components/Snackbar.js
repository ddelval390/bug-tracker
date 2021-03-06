import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


export default function CustomizedSnackbars({ open, handleClose, severity, text }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar
       open={open}
        autoHideDuration={6000}
         onClose={handleClose}
         anchorOrigin={{ vertical:'top', horizontal:'center' }}
         >
        <Alert onClose={handleClose} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  )
}