import React, { useState, useRef, useEffect, useContext, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '../components/Table'
import Button from '@material-ui/core/Button'
import Dialog from '../components/DialogForm'
import FormControl from '@material-ui/core/FormControl'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { createProject, deleteProject, getProject, createTicket } from '../apis/project-api'
import { getUserProjects } from '../apis/user-api'
import { Context, SocketContext } from '../global/Store'
import { Link } from 'react-router-dom'
import HeaderLabel from '../components/HeaderLabel'
import ConfirmationDialog from '../components/ConfirmationDialog'
import {snackbarPayload, OPENSNACKBAR} from '../helpers/constants'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    span: {
        borderRadius: '3px',
        backgroundColor: '#00adb5',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '.4rem',

    },
    formControl: {
        display: 'inline-block',
        margin: theme.spacing(1),
        minWidth: 100,
    },
    button: {

    }
}))

const Home = () => {
    const classes = useStyles()

    const [form, setForm] = useState({
        title: '',
        description: '',
        isOpen: false,
        isTicketForm: true,
        error: '',
    })
    const [isLoading, setLoading] = useState({
        projects: false,
        tickets: false,
        team: false,

    })
    const [selectedProjectId, setSelectedProjectId] = useState('')
    const [selectedTicketId, setSelectedTicketId] = useState('')
    const previousSelectedProjectId = useRef()
    const [store, dispatch] = useContext(Context)
    const ticketTypeSelection = useRef()
    const ticketPrioritySelection = useRef()

    const [projects, setProjects] = useState([])
    const [tickets, setTickets] = useState([])
    const [team, setTeam] = useState([])

    const [isConfOpen, setConfOpen] = useState(false)
    const [confAction, setConfAction] = useState(() => undefined)

    const socket = useContext(SocketContext)

    /**
     * Loads the user's relevant projects and stores them into an array
     */
    useEffect(() => {
        setLoading(prevLoading => ({ ...prevLoading, projects: true }))
        getUserProjects(store.userId)
            .then(res => {
                setLoading(prevLoading => ({ ...prevLoading, projects: false }))
                setProjects(res.data.projects)
            })
        // eslint-disable-next-line
    }, [])

    /**
     * Upon the selection of a new project, that projects team and tickets will be loaded.
     */
    useEffect(() => {
        if (selectedProjectId !== '') {
            if (previousSelectedProjectId.current) {
                socket.emit('disconnect project updates', previousSelectedProjectId.current)
            }
            socket.emit('project updates', selectedProjectId)
            setLoading(prevLoading => ({ ...prevLoading, team: true, tickets: true }))
            getProject(selectedProjectId)
                .then(res => {
                    setLoading(prevLoading => ({ ...prevLoading, team: false, tickets: false }))
                    const project = res.data.project
                    setTickets(project.tickets)
                    setTeam(project.team)
                })
                .catch(err => console.log(err))
        }
        // eslint-disable-next-line
    }, [selectedProjectId])

    /**
     * Upon the selection of a new project, subscribe that projects updates and disconnect
     * from the previously selected projects updates.
     */
    useEffect(() => {
        if (selectedProjectId) {
            if (previousSelectedProjectId.current) {
                socket.emit('disconnect project updates', previousSelectedProjectId.current)
            }
            socket.emit('project updates', selectedProjectId)
        }
        return function cleanup() {
            socket.emit('disconnect project updates', selectedProjectId)
        }
    }, [selectedProjectId, socket])

    /**
     * Recieves a new ticket from the server and appends it to the 
     * ticket table.
     */
    useEffect(() => {
        socket.on('newTicket', ticket => {
            setTickets(prevState => {
                prevState.push(ticket)
                return [...prevState]
            })
            console.log('recieved the new ticket', ticket)
        })
        socket.on('newTeam', team => {
            setTeam(team)
            console.log('recieved the team', team)
        })

        return function cleanup() {
            socket.off('newTicket')
            socket.off('newTeam')
            socket.emit('disconnect homePage')
        }
    }, [socket])


    /**
     * Handles the selection of a new project and stores the previously
     * selected project in a ref.
     * @param {object} event - Capture the event
     * @param {string} id - The "_id" field of the newly selected project
     */
    const handleSelectProject = (event, id) => {
        if (selectedProjectId === id) {
            setSelectedProjectId('')
        } else {
            setSelectedProjectId(prevState => {
                previousSelectedProjectId.current = prevState
                return id
            })
        }
    }

    /**
     * Handles the selection of a new ticket.
     * @param {object} event - Capture the event.
     * @param {string} name - The "_id" field of the newly selected ticket.
     */
    const handleSelectTicket = (event, name) => {
        if (selectedTicketId === name) {
            setSelectedTicketId('')
        } else {
            setSelectedTicketId(name)
        }
    }

    /**
     * Handles the opening of the dialog form and sets type of form needed
     * to determine the components to be rendered in the form.
     * @param {string} type - The type of form that is needed.
     */
    const handleOpenForm = (type) => {
        let isNewTicket
        if (type === 'project') {
            isNewTicket = false
        } else if (type === 'ticket') {
            isNewTicket = true
        }
        setForm(prevForm => ({
            ...prevForm,
            title: '',
            description: '',
            isOpen: !prevForm.isOpen,
            isTicketForm: isNewTicket,
            error: '',
        }))
    }

    /**
     * Handles form input.
     * @param {string} value - The value that will stored in the state
     * @param {string} name - The property that will be accessed to change the value
     */
    const handleFormChange = (value, name) => {
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    /**
     * Sends an api call to delete a project by ID.
     * @param {string} projectId - The "_id" field of the project that will be deleted
     */
    const handleDeleteProject = (projectId) => {
        deleteProject(projectId)
            .then(res => {
                snackbarPayload.snackbarText = 'Successfully deleted the project'
                snackbarPayload.snackbarSeverity = 'success'

                setProjects(prevProjects => {
                    const newList = prevProjects.filter(project => project._id !== projectId)
                    return newList
                })
            })
            .catch(err => {
                snackbarPayload.snackbarText = 'Something went wrong deleting the project. Try again later.'
                snackbarPayload.snackbarSeverity = 'error'
            })
            .finally(() => {
                dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
                handleOpenForm()
              })
    }

    /**
     * Stores form data in an object and then sends an api request
     * to create a new project. Awaits for response to display the 
     * relevant snackbar and to append the newly created project to
     * the projects table.
     */
    const newProject = () => {
        const newProject = {
            title: form.title,
            description: form.description,
        }
        createProject(newProject)
            .then(res => {
                snackbarPayload.snackbarText = 'Successfully created a project'
                snackbarPayload.snackbarSeverity = 'success'
                const newProject = res.data.project
                setProjects(prevProjects => {
                    prevProjects.push(newProject)
                    return [...prevProjects]
                })

            })
            .catch(err => {
                snackbarPayload.snackbarText = 'Something went wrong creating the project. Try again later.'
                snackbarPayload.snackbarSeverity = 'error'
            })
            .finally(() => {
                dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
              })
            
    }

    /**
    * Stores form data in an object and then sends an api request
    * to create a new ticket. Awaits for response to display the 
    * relevant snackbar.
    */
    const newTicket = () => {
        const newTicket = {
            title: form.title,
            description: form.description,
            submitter: store.userId,
            type: ticketTypeSelection.current,
            priority: ticketPrioritySelection.current,
        }
        createTicket(selectedProjectId, newTicket)
            .then(res => {
                snackbarPayload.snackbarText = 'Successfully created a ticket'
                snackbarPayload.snackbarSeverity = 'success'
            })
            .catch(err => {
                snackbarPayload.snackbarText = 'Something went wrong creating the ticket. Try again later.'
                snackbarPayload.snackbarSeverity = 'error'
           
            })
            .finally(() => {
                dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
              })
    }



    /**
     * Handles the confirmation dialog by opening the dialog and
     * setting the function that will be called upon confirmation.
     * @param {function} confirmAction - The function that will be executed upon confirmation
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



    

    /**
     * Ensures required fields are filled and then calls the appropriate
     * submit function.
     */
    const handleFormSubmit = () => {
        console.log(form.title)
        if (requiredFieldsNotFilled) {
            setForm(prevForm => ({ ...prevForm, error: "please fill the required fields" }))
        } else {
            if (form.isTicketForm) {
                newTicket()
            } else {
                newProject()
            }
            handleOpenForm()
        }
    }

    const requiredFieldsNotFilled = (!form.title || !form.description)
    const dialogTitle = form.isTicketForm ? 'Create a new ticket' : 'Create a new project'
    const dialogDescription = form.isTicketForm ? 'Enter the ticket details' : 'Enter the project details'


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderLabel text='Home' />
                </Grid>

                {
                    store.role === 'Admin' &&
                    <Fragment>
                        <Grid item md={3} xs={12}>
                            <Button variant='contained' color='primary' fullWidth classes={{ root: classes.button }} onClick={() => handleOpenForm('project')}>
                                Create a new project
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Button variant='contained' color='secondary' fullWidth classes={{ root: classes.button }} onClick={() => handleOpenConfirmation(() => handleDeleteProject(selectedProjectId))} disabled={(!selectedProjectId) || store.isDemoUser}>
                                Delete Selected Project
                            </Button>
                        </Grid>
                        <Grid item md={6}>

                        </Grid>
                    </Fragment>

                }


                <Grid item md={6} xs={12}>
                    <Table
                        emptyTableText='No projects available'
                        tableHeight='22vh'
                        loading={isLoading.projects}
                        selected={selectedProjectId}
                        handleSelect={handleSelectProject}
                        title='Projects'
                        data={projects}
                        hover={true}
                        dense={true}
                        rowKey='title'
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Table
                        emptyTableText={selectedProjectId ? "This project's team is empty" : "Select a project to view it's team"}
                        tableHeight='22vh'
                        loading={isLoading.team}
                        title='Team'
                        data={team}
                        hover={false}
                        dense={true}
                        rowKey='email'

                    />
                </Grid>
                <Grid item xs={12}>
                    <Table
                        emptyTableText={selectedProjectId ? "This project has no tickets" : "Select a project to view it's tickets"}
                        tableHeight='22vh'
                        loading={isLoading.tickets}
                        selected={selectedTicketId}
                        handleSelect={handleSelectTicket}
                        title='Tickets'
                        data={tickets}
                        hover={true}
                        dense={true}
                        rowKey='title'
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Link to={`/dashboard/projects/ticket/${selectedTicketId}`} className={classes.link}>
                        <Button variant='contained' color='primary' fullWidth disabled={!selectedTicketId}>
                            Ticket Details
                        </Button>
                    </Link>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Button variant='contained' color='primary' fullWidth disabled={!selectedProjectId} onClick={() => handleOpenForm('ticket')}>
                        Submit a new ticket
                        </Button>
                </Grid>
            </Grid>
            <Dialog
                isOpen={form.isOpen}
                handleOpen={handleOpenForm}
                handleChange={handleFormChange}
                titleTFValue={form.title}
                descriptionTFValue={form.description}
                dialogTitle={dialogTitle}
                dialogDescription={dialogDescription}
                handleSubmit={handleFormSubmit}
                error={form.error}
            >
                {
                    form.isTicketForm &&
                    <React.Fragment>
                        <FormControl variant="filled" className={classes.formControl} fullWidth>
                            <Autocomplete
                                options={['high', 'medium', 'low', 'none']}
                                onChange={(e, newValue) => { ticketPrioritySelection.current = newValue }}
                                renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                            />
                        </FormControl>
                        <FormControl variant="filled" className={classes.formControl} fullWidth >
                            <Autocomplete
                                options={['bug']}
                                onChange={(e, newValue) => { ticketTypeSelection.current = newValue }}
                                renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                            />
                        </FormControl>
                    </React.Fragment>
                }
            </Dialog>

            <ConfirmationDialog
                titleText='Confirm Action'
                descriptionText='Are you sure you want to delete this?'
                open={isConfOpen}
                handleOpen={handleOpenConfirmation}
                handleConfirm={confAction}
            />

        </div>
    )
}

export default Home