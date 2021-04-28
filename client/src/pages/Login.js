
import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connUser } from '../apis/auth-api'
import { Context } from '../global/Store'
import { Redirect} from 'react-router-dom'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
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
   * Validates inputs and then submits user data to login.
   */
  const handleSubmit = () => {
    const newValues = { ...values }
    if (!newValues.password || !newValues.email) {
      setValues({ ...values, error: "Please fill in all fields" })
    } else {
      const userData = {
        email: newValues.email,
        password: newValues.password,
        isSignUp: false,
      }
      connUser(userData).then((res) => {
        const user = res.data.user
        const payload = {
          isLoggedIn: true,
          role: user.role,
          userId: user._id
        }
        dispatch({ type: LOGIN, payload: payload })
      })
        .catch(e => {
          console.log(e)
          setValues({ ...values, error: 'Incorrect email or password' })
        })
    }

  }

  const handleDemoUser = () => {
    const userData = {
      email: 'demoUser@demoMail.com',
      password: '123456DemoUser',
      isSignUp: false,
    }
    connUser(userData).then((res) => {
      const user = res.data.user
      const payload = {
        isLoggedIn: true,
        role: user.role,
        userId: user._id,
        isDemoUser: true,
      }
      dispatch({ type: LOGIN, payload: payload })
    })
      .catch(e => {
        console.log(e)
        setValues({ ...values, error: 'Incorrect email or password' })
      })
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
          Log In
        </Typography>
        {
          values.error && (<Typography component="p" color="error">
            {values.error}
          </Typography>)
        }
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!values.email && values.error}
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!values.password && values.error}
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#47e344'}}
            className={classes.submit}
            onClick={handleDemoUser}
          >
            Demo
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default Login