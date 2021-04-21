import React, { useState, useRef, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Table from '../components/Table';
import Button from '@material-ui/core/Button';
import Dialog from '../components/DialogForm';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createProject, getProject, createTicket } from '../apis/project-api'
import { getUsersByRole, getUserProjects } from '../apis/user-api';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import HeaderLabel from '../components/HeaderLabel'


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
}));

export default function CenteredGrid() {
    const classes = useStyles();

    const initialForm = {
        title: '',
        description: '',

    }
    const [isFormOpen, setFormOpen] = useState(false)
    const [isTicketForm, setIsTicketForm] = useState(true)
    const [form, setForm] = useState({ ...initialForm })
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedTicket, setSelectedTicket] = useState('');
    const [managerList, setManagerList] = useState([])
    const [projectData, setProjectData] = useState([])
    const [state] = useContext(Context);
    const projectManagerSelection = useRef()
    const ticketTypeSelection = useRef()
    const ticketPrioritySelection = useRef()

    const [tickets, setTickets] = useState([])
    const [team, setTeam] = useState([])

    useEffect(() => {
        getUserProjects(state.userId)
            .then(res => {
                setProjectData(res.data.projects)
            })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (selectedProject !== '') {
            getProject(selectedProject)
                .then(res => {
                    const project = res.data.project
                    setTickets(project.tickets)
                    setTeam(project.team)
                })
                .catch(err => console.log(err))
        }
        // eslint-disable-next-line
    }, [selectedProject])

    useEffect(() => {
        if (!isFormOpen) {
            setManagerList([])
        } else {
            getUsersByRole('Project Manager')
                .then(res => setManagerList([...res.data.userList]))
        }
    }, [isFormOpen])

    const handleSelectProject = (event, name) => {
        if (selectedProject === name) {
            setSelectedProject('');
        } else {
            setSelectedProject(name)
        }
    }

    const handleSelectTicket = (event, name) => {
        if (selectedTicket === name) {
            setSelectedTicket('');
        } else {
            setSelectedTicket(name)
        }
    }

    const getTicketId = (title) => {
        for (let ticket of tickets) {
            if (ticket.title === title) {
                return ticket._id
            }
        }
    }


    const handleOpen = (type) => {
        if (type === 'project') {
            setIsTicketForm(false)
        } else if (type === 'ticket') {
            setIsTicketForm(true)
        }
        setFormOpen(prevState => !prevState)
        setForm(initialForm)
    }

    const handleChange = (event, name) => {
        setForm(prevState => ({ ...prevState, [name]: event.target.value }))
    }

    const newProject = () => {
        const newProject = {
            title: form.title,
            description: form.description,
        }
        createProject(newProject)
            .then(res => handleOpen())
    }

    const newTicket = () => {
        const newTicket = {
            title: form.title,
            description: form.description,
            submitter: state.userId,
            type: ticketTypeSelection.current,
            priority: ticketPrioritySelection.current,
        }
        createTicket(selectedProject, newTicket)
            .then(res => { console.log(res); handleOpen() })
    }

    const isProjectSelected = selectedProject !== ''
    const isTicketSelected = selectedTicket !== ''

    const dialogTitle = isTicketForm ? 'Create a new ticket' : 'Create a new project'
    const dialogDescription = isTicketForm ? 'Enter the ticket details' : 'Enter the project details'
    const handleFormSubmit = isTicketForm ? newTicket : newProject

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderLabel text='My Projects' />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' fullWidth classes={{ root: classes.button }} onClick={() => handleOpen('project')}>
                        Create a new project
                        </Button>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Table
                        selected={selectedProject}
                        handleSelect={handleSelectProject}
                        title='Projects'
                        data={projectData}
                        hover={true}
                        dense={true}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Table
                        title='Team'
                        data={team}
                        hover={false}
                        dense={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Table
                        selected={selectedTicket}
                        handleSelect={handleSelectTicket}
                        title='Tickets'
                        data={tickets}
                        hover={true}
                        dense={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        Select a project!
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Link to={`/dashboard/projects/ticket/${getTicketId(selectedTicket)}`} className={classes.link}>
                        <Button variant='contained' fullWidth disabled={(!isTicketSelected || !isProjectSelected)}>
                            Ticket Details
                        </Button>
                    </Link>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Button variant='contained' fullWidth disabled={!isProjectSelected} onClick={() => handleOpen('ticket')}>
                        Submit a new ticket
                        </Button>
                </Grid>
            </Grid>
            <Dialog
                isOpen={isFormOpen}
                handleOpen={handleOpen}
                handleChange={handleChange}
                titleTFValue={form.title}
                descriptionTFValue={form.description}
                dialogTitle={dialogTitle}
                dialogDescription={dialogDescription}
                handleSubmit={handleFormSubmit}
            >
                {
                    isTicketForm ?
                        <React.Fragment>
                            <FormControl variant="filled" className={classes.formControl} >
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={['high', 'medium', 'low', 'none']}
                                    onChange={(e, newValue) => { ticketPrioritySelection.current = newValue }}
                                    renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                                />
                            </FormControl>
                            <FormControl variant="filled" className={classes.formControl} >
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={['bug']}
                                    onChange={(e, newValue) => { ticketTypeSelection.current = newValue }}
                                    renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                />
                            </FormControl>
                        </React.Fragment>
                        :
                        <FormControl variant="filled" className={classes.formControl} fullWidth>
                            <Autocomplete
                                id="combo-box-demo"
                                options={managerList}
                                onChange={(e, newValue) => { projectManagerSelection.current = newValue }}
                                getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                renderInput={(params) => <TextField {...params} label="Select a manager" variant="outlined" />}
                            />
                        </FormControl>
                }
            </Dialog>
        </div>
    );
}
