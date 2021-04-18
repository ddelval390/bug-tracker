import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

export default function CenteredGrid({Match}) {
  const classes = useStyles();

  const [details, setDetails] = useState([])
  const [history, setHistory] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {

  })

  

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h3' component='span' className={classes.span}>
            Project Details
          </Typography>
        </Grid>

        {/* Project Details section */}

        <Grid container item xs={6} spacing={3} className={classes.border}>
          <Grid item xs={6}>
            <Typography variant='h6' component='span' className={classes.span}>
              Ticket Title
          </Typography>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>




        <Grid item xs={6}>
          <Typography variant='h6' component='span' className={classes.span}>
            Ticket Comments
          </Typography>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>



        <Grid item xs={6}>
          <Typography variant='h6' component='span' className={classes.span}>
            Ticket History
          </Typography>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>


        <Grid item xs={6}>
          <Typography variant='h6' component='span' className={classes.span}>
            Add attachment
          </Typography>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>

      </Grid>
    </div>
  );
}
