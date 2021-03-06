import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Context } from '../global/Store'
import { connUser } from '../apis/auth-api'
import {Redirect} from 'react-router-dom'
import {LOGIN} from '../helpers/constants'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Signup = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    error: null,
  })
  const [store, dispatch] = useContext(Context)

  /**
   * Handles form input
   * @param {string} name - Name of the property to be changed.
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  /**
   * Validates inputs and then submits user data to create an account.
   */
  const handleSubmit = () => {
    const newValues = { ...values }
    if (!newValues.password || !newValues.email || !newValues.name) {
      setValues({ ...values, error: "Please fill in all fields" })
    } else {
      const userData = {
        email: newValues.email,
        password: newValues.password,
        name: newValues.name,
        isSignUp: true,
      }
      connUser(userData).then(() => {
        
      })
        .catch(e => {
          setValues({ ...values, error: 'This email is already in use please login' })
        })
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      {store.isLoggedIn && <Redirect to='/dashboard' />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {
          values.error && (<Typography component="p" color="error">
            {values.error}
          </Typography>)
        }
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                error={!values.name && values.error}
                value={values.name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!values.email && values.error}
                value={values.email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!values.password && values.error}
                values={values.pasword}
                onChange={handleChange('password')}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default Signup