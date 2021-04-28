import React, { useState, useEffect, useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import HeaderLabel from '../components/HeaderLabel'
import { getUser, updateUser } from '../apis/user-api'
import { Context } from '../global/Store'
import { OPENSNACKBAR } from '../helpers/constants'

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

const Profile = ({ match }) => {
  const classes = useStyles()
  const [, dispatch] = useContext(Context)
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  })

  const payload = {
    snackbarText: '',
    snackbarSeverity: '',
  }


  /**
   * Gets user data to fill form.
   */
  useEffect(() => {
    getUser(match.params.userId)
      .then(res => {
        const user = res.data.user
        const userFullName = user.name
        const profile = {
          name: userFullName,
          email: user.email,
          password: '',
        }
        setValues(profile)
      })
  }, [match.params.userId])


  /**
   * Sends user input to update the user object in the database.
   */
  const handleSubmit = () => {
    const newValues = {
      name: values.name,
      password: values.password,
      email: values.email,
    }
    updateUser(match.params.userId, newValues)
      .then(res => {
        payload.snackbarText = 'Successfully changed user role'
        payload.snackbarSeverity = 'success'
      })
      .catch(err => {
        payload.snackbarText = 'Could not change users role. Try again later.'
        payload.snackbarSeverity = 'error'

      })
      .finally(() => {
        dispatch({ type: OPENSNACKBAR, payload: payload })
      })
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <React.Fragment>
      <HeaderLabel text="My Profile" />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
          <br /> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  )
}

export default Profile
