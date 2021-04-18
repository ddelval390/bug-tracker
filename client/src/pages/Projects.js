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
import { createProject } from '../apis/project-api'
import { getUsersByRole, getUserProjects } from '../apis/user-api';
import { Context } from '../global/Store';
import {Link } from 'react-router-dom';


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

    },
    button: {

    }
}));

export default function CenteredGrid() {
    const classes = useStyles();

    const initialDialog = {
        title: '',
        description: '',
        projectManager: {},

    }
    const [dialogIsOpen, setDialogOpen] = useState(false)
    const [dialog, setDialog] = useState({ ...initialDialog })
    const [selected, setSelected] = useState('');
    const [managerList, setManagerList] = useState([])
    const [projectData, setProjectData] = useState([])
    const [state] = useContext(Context);
    const projectManagerSelection = useRef()

    useEffect(() => {
        getUserProjects(state.userId)
            .then(res => {
                setProjectData(res.data.projects)
            })
    }, [])

    useEffect(() => {
        if (!dialogIsOpen) {
            setManagerList([])
        } else {
            getUsersByRole('Project Manager')
                .then(res => setManagerList([...res.data.userList]))
        }
    }, [dialogIsOpen])

    const handleSelect = (event, name) => {
        if (selected === name) {
            setSelected('');
        } else {
            setSelected(name)
        }
    }

    const handleOpen = () => {
        setDialogOpen(prevState => !prevState)
        setDialog(initialDialog)
    }

    const handleChange = (event, name) => {
        setDialog(prevState => ({ ...prevState, [name]: event.target.value }))
    }

    const handleSubmit = () => {
        const newProject = {
            title: dialog.title,
            description: dialog.description,
            manager: projectManagerSelection.current._id,
        }
        createProject(newProject)
            .then(res => handleOpen())
    }
    const isSelected = selected === ''


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h3' component='span' className={classes.span}>
                        My Projects
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' fullWidth classes={{ root: classes.button }} onClick={handleOpen}>
                        Create a new project
                        </Button>
                </Grid>
                <Grid item xs={12}>
                    <Table
                        selected={selected}
                        handleSelect={handleSelect}
                        title='Projects'
                        rows={projectData}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        Select a project!
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                <Link to={`/dashboard/projects/project-details/${selected}`} className={classes.link}><Button variant='contained' fullWidth disabled={isSelected}>Project Details</Button></Link>
                </Grid>
                <Grid item md={6} xs={12}>
                <Link to={`/dashboard/projects/project-details/${dialog.title}`}><Button variant='contained' fullWidth disabled={isSelected}>Manage Assigned Users</Button></Link>
                </Grid>
            </Grid>
            <Dialog
                isOpen={dialogIsOpen}
                handleOpen={handleOpen}
                handleChange={handleChange}
                titleTFValue={dialog.title}
                descriptionTFValue={dialog.description}
                dialogTitle='Create a new project'
                dialogDescription='Please enter the project details'
                handleSubmit={handleSubmit}
            >
                <FormControl variant="filled" className={classes.formControl} fullWidth>
                    <Autocomplete
                        id="combo-box-demo"
                        options={managerList}
                        onChange={(e, newValue) => { projectManagerSelection.current = newValue }}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    />
                </FormControl>
            </Dialog>


        </div>
    );
}
