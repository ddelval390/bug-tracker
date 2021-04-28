import React, { useEffect, useRef, useState, useContext, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField, Typography } from '@material-ui/core'
import HeaderLabel from '../components/HeaderLabel'
import { getTicket, postComment, deleteComment, updateTicket, deleteTicket } from '../apis/project-api'
import { getUsersByRole } from '../apis/user-api'
import Table from '../components/Table'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import { Context, SocketContext } from '../global/Store'
import DialogForm from '../components/DialogForm'
import FormControl from '@material-ui/core/FormControl'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Redirect } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmationDialog from '../components/ConfirmationDialog'
import { OPENSNACKBAR, snackbarPayload } from '../helpers/constants'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  inline: {
    display: 'block',
  },

}))

const TicketDetails = ({ match }) => {
  const classes = useStyles()

  const [store, dispatch] = useContext(Context)
  const socket = useContext(SocketContext)

  const [redirect, setRedirect] = useState(false)

  const [isLoading, setLoading] = useState({
    comments: false,
    history: false,
    details: false,
  })
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    type: '',
    status: '',
    isOpen: false,
    error: '',

  })
  const [newCommentText, setNewCommentText] = useState([])

  const [details, setDetails] = useState([])
  const [history, setHistory] = useState([])
  const [comments, setComments] = useState([])

  const [devList, setDevList] = useState([])
  const devSelection = useRef()

  const [isConfOpen, setConfOpen] = useState(false)
  const [confAction, setConfAction] = useState(() => undefined)


  /**
   * Retrieves ticket data.
   */
  useEffect(() => {
    const source = axios.CancelToken.source()
    setLoading({
      comments: true,
      history: true,
      details: true,
    })
    getTicket(match.params.ticketId, source.token)
      .then(res => {
        const submitterFullName = res.data.ticket.submitter.name
        const devFullName = res.data.ticket.assignedDev ? res.data.ticket.assignedDev.name : ''
        devSelection.current = res.data.ticket.assignedDev
        const localDate = new Date(res.data.ticket.submissionDate)
        setComments(res.data.ticket.comments)
        setHistory(res.data.ticket.history)
        setDetails({
          title: res.data.ticket.title,
          description: res.data.ticket.description,
          status: res.data.ticket.status,
          'assigned dev': devFullName,
          priority: res.data.ticket.priority,
          type: res.data.ticket.type,
          submitter: submitterFullName,
          'submission date': localDate.toLocaleDateString() + ' ' + localDate.toLocaleTimeString(),
        })
        setLoading({
          comments: false,
          history: false,
          details: false,
        })
      })

      return () => {
        source.cancel()
      }
    // eslint-disable-next-line
  }, [])

  /**
   * Gets a list of developers every time the dialog form is opened'
   */
  useEffect(() => {
    if (!form.isOpen) {
      setDevList([])
    } else {
      getUsersByRole('Developer')
        .then(res => setDevList([...res.data.userList]))
    }
  }, [form.isOpen])

  /**
   * Subscribes the socket to new ticket updates
   */
  useEffect(() => {
    socket.emit('ticket updates', match.params.ticketId)
    return () => {
      socket.emit('disconnect ticket updates', match.params.ticketId)
    }
  }, [socket, match.params.ticketId])

  /**
   * Upon recieving a new comment, it is appended to the current comments.
   * Upon recieving any other updates, the ticket details and history are replaced.
   */
  useEffect(() => {
    socket.on('deleteComment', commentId => {
      setComments(prevComments => {
        const newComments = prevComments.filter(comment => comment._id !== commentId)
        return newComments
      })
    })
    socket.on('newComment', comment => {
      setComments(prevComments => { prevComments.unshift(comment); return [...prevComments] })
    })
    socket.on('ticketUpdate', ticket => {
      setHistory(ticket.history)
      setDetails({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        'assigned dev': ticket.assignedDev ? ticket.assignedDev.name : '',
        priority: ticket.priority,
        type: ticket.type,
        submitter: ticket.submitter.name,
        'submission date': ticket.submissionDate,
      })
    })
    return () => {
      socket.off('newComment')
      socket.off('ticketUpdate')
    }
    // eslint-disable-next-line
  }, [])

  /**
   * Handles user input in the comment box.
   * @param {string} value - New comment value
   */
  const handleCommentText = value => {
    setNewCommentText(value)
  }

  /**
   * Opens the dialog form and sets the textfields to the ticket specs.
   */
  const handleOpen = () => {
    setForm(prevForm => ({
      title: details.title,
      description: details.description,
      priority: details.priority,
      type: details.type,
      status: details.status,
      isOpen: !prevForm.isOpen
    }))
  }

  /**
   * Handles user input in the form.
   * @param {string} value - The new value.
   * @param {string} name - name of the property to be updated in the form.
   */
  const handleFormChange = (value, name) => {
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  /**
   * Creates a comment object and submits it to the server.
   */
  const handlePostComment = () => {
    const comment = {
      user: store.userId,
      text: newCommentText,
    }

    postComment(match.params.ticketId, comment)
      .then(res => {
        snackbarPayload.snackbarText = 'Successfully posted comment'
        snackbarPayload.snackbarSeverity = 'success'
      })
      .catch(err => {
        snackbarPayload.snackbarText = 'Could not post comment. Try again later.'
        snackbarPayload.snackbarSeverity = 'error'
      })
      .finally(() => {
        dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
      })
  }

  /**
   * Handles the deletion of a comment.
   * @param {string} commentId - The "_id" field of the comment to be deleted.
   */
  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, match.params.ticketId)
      .then(res => {
        snackbarPayload.snackbarText = 'Successfully deleted comment'
        snackbarPayload.snackbarSeverity = 'success'
      })
      .catch(res => {
        snackbarPayload.snackbarText = 'Could not delete comment. Try again later.'
        snackbarPayload.snackbarSeverity = 'error'
      })
      .finally(() => {
        dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
      })
  }

  /**
   * Handles the submission of a ticket update in the dialog form.
   */
  const handleSubmitTicketUpdate = () => {
    if (!form.title || !form.description) {
      setForm(prevForm => ({ ...prevForm, error: 'Please fill in the required forms' }))
    }
    const ticket = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      type: form.type,
    }
    if (devSelection.current) {
      ticket.assignedDev = devSelection.current._id
    }
    updateTicket(match.params.ticketId, ticket)
      .then(res => {
        snackbarPayload.snackbarText = 'Successfully updated the ticket.'
        snackbarPayload.snackbarSeverity = 'success'
      })
      .catch(err => {
        snackbarPayload.snackbarText = 'Could not update the ticket. Try again later.'
        snackbarPayload.snackbarSeverity = 'error'
      })
      .finally(() => {
        dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
        handleOpen()
      })
  }

  /**
   * Handles the deletion of the ticket.
   */
  const handleDeleteTicket = () => {
    deleteTicket(match.params.ticketId)
      .then(res => {
        snackbarPayload.snackbarText = 'Successfully deleted the ticket.'
        snackbarPayload.snackbarSeverity = 'success'
        setRedirect(true)
      })
      .catch(res => {
        snackbarPayload.snackbarText = 'Could not delete the ticket. Try again later.'
        snackbarPayload.snackbarSeverity = 'error'
      })
      .finally(() => {
        dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
      })

  }

  /**
   * Manages the opening of the confirmation dialog.
   * @param {function} confirmAction - The function to be called upon confirmation.
   */
  const handleOpenConfirmation = (confirmAction) => {
    if (confirmAction) {
      setConfOpen(prevState => !prevState)
      setConfAction(() => confirmAction)
    } else {
      setConfOpen(prevState => !prevState)
      setConfAction(() => undefined)
    }
  }
  return (
    <div className={classes.root}>
      {redirect && <Redirect to='/dashboard' />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderLabel text='Ticket Details' />
        </Grid>

        {/* Project Details section */}

        <Grid container item xs={6}>
          {
            isLoading.details ?
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <CircularProgress size='20rem' />
              </Grid>
              :
              Object.entries(details).map(([key, value]) => {
                return <Grid item xs={6} key={key + ' ' + value}>
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
          <Grid item xs={12} component={Paper} classes={{ root: classes.paper }}>
            <Typography variant='h4'>
              Comments
            </Typography>
            <List style={{ minHeight: '26vh', maxHeight: '26vh', overflow: 'auto' }}>

              {
                isLoading.comments &&
                <ListItem style={{ width: '40%', margin: 'auto' }}>
                  <CircularProgress size='12rem' />
                </ListItem>
              }

              {
                (!isLoading.comments && comments.length) ?
                  comments.map((comment) => (
                    <Fragment key={comment._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={comment.user.name}
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
                        {
                          (comment.user._id === store.userId) &&
                          <IconButton edge='start' color='secondary' onClick={() => handleOpenConfirmation(() => handleDeleteComment(comment._id))}>
                            <DeleteIcon />
                          </IconButton>
                        }

                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  ))
                  :
                  <ListItem style={{ width: '60%', margin: 'auto' }}>
                    <Typography variant='h4'>
                      No Comments Yet!
                  </Typography>
                  </ListItem>
              }

            </List>
            <TextField
              id="name"
              label="Add Comment"
              type="text"
              variant="outlined"
              value={newCommentText}
              onChange={e => handleCommentText(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handlePostComment} disabled={!newCommentText}>
              Submit
            </Button>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Table
            tableHeight='22vh'
            loading={isLoading.history}
            title='Ticket History'
            data={history}
            dense={true}
            handleSelect={() => undefined}
            rowKey={'oldValue'}
          />
        </Grid>

        {
          ((store.role === "Admin") || (store.role === "Project Manager")) &&
          <Fragment>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
                Edit Ticket
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => handleOpenConfirmation(handleDeleteTicket)}>
                Delete
              </Button>
            </Grid>
          </Fragment>

        }

        {
          (store.role === "Developer") &&
          <Fragment>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
                Edit Ticket
              </Button>
            </Grid>
          </Fragment>

        }



      </Grid>
      <DialogForm
        isOpen={form.isOpen}
        handleOpen={handleOpen}
        handleChange={handleFormChange}
        titleTFValue={form.title}
        descriptionTFValue={form.description}
        dialogTitle={'Edit Ticket'}
        dialogDescription={'Edit the values below and click save'}
        handleSubmit={handleSubmitTicketUpdate}
        error={form.error}
      >
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            options={['open', 'closed']}
            value={form.status}
            onChange={(e, newValue) => { handleFormChange(newValue, 'status') }}
            renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            id="combo-box-demo"
            options={devList}
            value={devSelection.current}
            onChange={(e, newValue) => { devSelection.current = newValue}}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Assign a developer" variant="outlined" />}
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            options={['high', 'medium', 'low', 'none']}
            value={form.priority}
            onChange={(e, newValue) => { handleFormChange(newValue, 'priority') }}
            renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <Autocomplete
            options={['bug']}
            value={form.type}
            onChange={(e, newValue) => { handleFormChange(newValue, 'type') }}
            renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
          />
        </FormControl>
      </DialogForm>
      <ConfirmationDialog
        titleText='Confirm Action'
        descriptionText='Are you sure you want to delete this?'
        open={isConfOpen}
        handleOpen={handleOpenConfirmation}
        handleConfirm={confAction}
      />
    </div >
  )
}

export default TicketDetails
