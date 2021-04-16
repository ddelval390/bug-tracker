import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BarChart from '../components/BarChart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '15rem',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <BarChart/>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}