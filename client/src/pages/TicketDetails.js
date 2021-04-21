import React, { useEffect, useRef, useState, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import HeaderLabel from '../components/HeaderLabel';
import { getTicket, postComment, updateTicket } from '../apis/project-api';
import { getUsersByRole } from '../apis/user-api';
import Table from '../components/Table'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { Context } from '../global/Store';
import DialogForm from '../components/DialogForm';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'block',
  },

}));

export default function CenteredGrid({ match }) {
  const classes = useStyles();

  const initialForm = {
    title: '',
    description: '',
    priority: '',
    type: '',
    status:'',

  }
  const [state] = useContext(Context)

  const [details, setDetails] = useState([])
  const [history, setHistory] = useState([])
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState([])

  const [isFormOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [devList, setDevList] = useState([])
  const devSelection = useRef()


  useEffect(() => {
    getTicket(match.params.ticketId)
      .then(res => {
        const fullName = `${res.data.ticket.submitter.first_name} ${res.data.ticket.submitter.last_name}`
        setComments(res.data.ticket.comments)
        setHistory(res.data.ticket.history)
        setDetails({
          title: res.data.ticket.title,
          description: res.data.ticket.description,
          status: res.data.ticket.status,
          'assigned dev': res.data.ticket.assignedDev,
          priority: res.data.ticket.priority,
          type: res.data.ticket.type,
          submitter: fullName,
          'submission date': res.data.ticket.submissionDate,
        })
      })
      // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isFormOpen) {
      setDevList([])
    } else {
      getUsersByRole('Developer')
        .then(res => setDevList([...res.data.userList]))
    }
  }, [isFormOpen])

  const handleCommentText = value => {
    setCommentText(value)
  }


  const handleOpen = () => {
    console.log(details)
    setFormOpen(prevState => !prevState)
    setForm({
      title: details.title,
      description: details.description,
      priority: details.priority,
      type: details.type,
      status: details.status,
    })
  }

  const handleChange = (value, name) => {
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handlePostComment = () => {
    const comment = {
      user: state.userId,
      text: commentText,
    }

    postComment(match.params.ticketId, comment)
      .then(res => console.log(res))
  }

  const handleSubmit = () => {
    const ticket = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      type: form.type,
    }

    updateTicket(match.params.ticketId, ticket)
      .then(res => console.log(res))
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderLabel text='Ticket Details' />
        </Grid>

        {/* Project Details section */}

        <Grid container item xs={6}>
          {Object.entries(details).map(([key, value]) => {
            return <Grid item xs={6} >
              <Grid item xs={12}>
                <Typography variant='h5'>
                  {key}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  {value}
                </Typography>
              </Grid>
            </Grid>
          })
          }

        </Grid>


        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12} component={Paper}>
            <Typography variant='h4'>
              Comments
            </Typography>
            <List style={{ minHeight: '26vh', maxHeight: '26vh', overflow: 'auto' }}>
              <ListItem>

              </ListItem>

              {
                comments.map((comment) => (
                  <Fragment key={comment._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`${comment.user.first_name} ${comment.user.last_name}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              classes={{ root: classes.inline }}
                              color="textPrimary"
                            >
                              {comment.text}
                            </Typography>
                            Posted at: {comment.timePosted}
                          </React.Fragment>
                        }
                      />

                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                ))
              }

            </List>
            <TextField
              id="name"
              label="Add Comment"
              type="text"
              variant="outlined"
              value={commentText}
              onChange={e => handleCommentText(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth onClick={handlePostComment}>
              Submit
            </Button>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Table
            title='Ticket History'
            data={history}
            dense={true}
            handleSelect={() => console.log()}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleOpen}>
            Edit Ticket
        </Button>
        </Grid>
      </Grid>
      <DialogForm
        isOpen={isFormOpen}
        handleOpen={handleOpen}
        handleChange={handleChange}
        titleTFValue={form.title}
        descriptionTFValue={form.description}
        dialogTitle={'Edit Ticket'}
        dialogDescription={'Edit the values below and click save'}
        handleSubmit={handleSubmit}
      >
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            options={['open', 'closed']}
            value={form.status}
            onChange={(e, newValue) => { handleChange(newValue, 'status') }}
            renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            id="combo-box-demo"
            options={devList}
            onChange={(e, newValue) => { devSelection.current = newValue }}
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
            renderInput={(params) => <TextField {...params} label="Assign a developer" variant="outlined" />}
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            options={['high', 'medium', 'low', 'none']}
            value={form.priority}
            onChange={(e, newValue) => { handleChange(newValue, 'priority') }}
            renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            options={['bug']}
            value={form.type}
            onChange={(e, newValue) => { handleChange(newValue, 'type') }}
            renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
          />
        </FormControl>
      </DialogForm>
    </div >
  );
}
