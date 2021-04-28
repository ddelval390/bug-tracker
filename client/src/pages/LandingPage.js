import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from '../assets/img/background_img.jpg'
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperContainer: {
    backgroundImage:
      `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 42, 127, 0.73)),
      url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    width: '100vw',
    height: '93vh',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  span: {
    borderRadius: '3px',
    backgroundColor: '#00adb5',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '.4rem',

},
}));
const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item xs={12}>
          <Paper className={classes.paperContainer}>
            <Typography variant='h1' component='span' className={classes.span}>
              Welcome to Bugtracker 9000
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage