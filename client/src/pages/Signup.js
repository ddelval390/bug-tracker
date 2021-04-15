import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Context } from '../global/Store';
import { connUser } from '../auth/auth-api';
import {Redirect, Link} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: null,
  });
  const [state, dispatch] = useContext(Context)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  };

  const handleSubmit = event => {

    const newValues = { ...values }
    if (!newValues.password || !newValues.email || !newValues.firstName || !newValues.lastName) {
      setValues({ ...values, error: "Please fill in all fields" })
    } else {
      const userData = {
        email: newValues.email,
        password: newValues.password,
        firstName: newValues.firstName,
        lastName: newValues.lastName,
        isSignUp: true,
      }
      connUser(userData).then(() => {
        dispatch({ type: 'LOGIN', payload: true })
      })
        .catch(e => {
          setValues({ ...values, error: 'This email is already in use please login' })
        })
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      {state.isLoggedIn && <Redirect to='/dashboard' />}
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                error={!values.firstName && values.error}
                value={values.firstName}
                onChange={handleChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={!values.lastName && values.error}
                value={values.lastName}
                onChange={handleChange('lastName')}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login'>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}