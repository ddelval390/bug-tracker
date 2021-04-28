import React, { useState, useEffect, useContext, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'
import Table from '../components/Table'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { getProject, updateTeam } from '../apis/project-api'
import { getAllUsers, getUserProjects } from '../apis/user-api'
import { Context } from '../global/Store'
import HeaderLabel from '../components/HeaderLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'
import {OPENSNACKBAR, snackbarPayload} from '../helpers/constants'


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
    formControl: {
        display: 'inline-block',
        margin: theme.spacing(1),
        minWidth: 100,
    },
    button: {

    }
}))

const AdminTeams = () => {
    const classes = useStyles()

    const [selectedProjectId, setSelectedProjectId] = useState('')
    const [projectData, setProjectData] = useState([])
    const [store, dispatch] = useContext(Context)


    const [team, setTeam] = useState([])
    const [tempSelected, setTempSelected] = useState([])
    const [selectedNewMembers, setSelectedNewMembers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [makeUpdate, setMakeUpdate] = useState(false)
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [loadingTeam, setLoadingTeam] = useState(false)

 
    /**
     * Loads all projects and loads all users.
     */
    useEffect(() => {
        setLoadingProjects(true)
        const func = async () => {
            const projects = await getUserProjects(store.userId)
                .then(res => res.data.projects)
            const users = await getAllUsers()
                .then(res => res.data.userList)
            setProjectData(projects)
            setAllUsers(users)
            setLoadingProjects(false)

        }

        func()
        // eslint-disable-next-line
    }, [])

    /**
     * When a new project is selected, load the project and set the team.
     */
    useEffect(() => {
        if (selectedProjectId) {
            setLoadingTeam(true)
            setTeam([])
            getProject(selectedProjectId)
                .then(res => {
                    setLoadingTeam(false)
                    const project = res.data.project
                    setTeam(project.team)
                })
                .catch(err => console.log(err))
        }
    }, [selectedProjectId])

    /**
     * When a the addmembers or remove members button is clicked,
     * send an api request to update the selected project's team.
     */
    useEffect(() => {
        if (makeUpdate) {
            const newTeam = []
            for (let member of team) {
                newTeam.push(member._id)
            }
            updateTeam(selectedProjectId, newTeam)
                .then(res => {
                    snackbarPayload.snackbarText = 'Successfully updated the team'
                    snackbarPayload.snackbarSeverity = 'success'
                })
                .catch(err => {
                    snackbarPayload.snackbarText = 'Could not update the team. Try again later.'
                    snackbarPayload.snackbarSeverity = 'error'
                })
                .finally(() => {
                    dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
                  })
            setMakeUpdate(false)

        }

        // eslint-disable-next-line
    }, [makeUpdate])


    /**
     * Handles the selection of a project on the table.
     * @param {object} event - Capture the event.
     * @param {string} id - The id of the newly selected project.
     */
    const handleSelectProject = (event, id) => {
        if (selectedProjectId === id) {
            setSelectedProjectId('')
        } else {
            setSelectedProjectId(id)
        }
    }


   /**
    * Adds a user to a temporary list to set the checkbox as selected.
    * @param {object} member - Object containing values from the member selected
    */
    const handleSelectTeamMember = (member) => () => {
        const currentIndex = tempSelected.findIndex(i => i.email === member.email)
        const newChecked = [...tempSelected]

        if (currentIndex === -1) {
            newChecked.push(member)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setTempSelected([...newChecked])
    }

    /**
     * Removes the users that are checked and triggers an api request.
     */
    const handleRemoveMembers = () => {
        const selectedTeamMembers = [...tempSelected]
        const newTeam = [...team]

        selectedTeamMembers.forEach(checkedMember => {
            const index = newTeam.findIndex(teamMember => teamMember.email === checkedMember.email)
            newTeam.splice(index, 1)
        })
        setTeam([...newTeam])
        setTempSelected([])
        setMakeUpdate(true)
    }

    /**
     * Adds the users that were selected in the autocomplete textbox
     * to the team and triggers an api request to update the team.
     */
    const handleAddMembers = () => {
        const newTeam = [...team, ...selectedNewMembers]
        setTeam([...newTeam])
        setSelectedNewMembers([])
        setMakeUpdate(true)
    }

    /**
     * Sets the users selected in the autocomplete textbox into an array.
     * @param {array} newMembers - Array of the users selected in the autocomplete textbox
     */
    const handleSelectNewMembers = (newMembers) => {
        setSelectedNewMembers([...newMembers])
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderLabel text='Manage Project Teams' />
                </Grid>

                <Grid item md={8} xs={12}>
                    <Table
                        emptyTableText='There are no projects to display'
                        tableHeight='70vh'
                        loading={loadingProjects}
                        selected={selectedProjectId}
                        handleSelect={handleSelectProject}
                        title='Projects'
                        data={projectData}
                        hover={true}
                        dense={false}
                        rowKey='title'
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <Box component={Paper}>
                        <Autocomplete
                            disabled={!selectedProjectId}
                            multiple
                            limitTags={2}
                            disableListWrap
                            disableCloseOnSelect={true}
                            id="tags-outlined"
                            options={allUsers}
                            getOptionLabel={(option) => {
                                return <Fragment>{option.name}&nbsp;&nbsp;&nbsp;<em>{option.email}</em></Fragment>
                            }}
                            filterOptions={(options, state) => {
                                const newOptions = options.filter((option) => team.findIndex((currMember) => option.email === currMember.email) === -1)
                                return newOptions
                            }}
                            filterSelectedOptions
                            value={selectedNewMembers}
                            getOptionSelected={(option, value) => option.email === value.email}
                            onChange={(event, value) => handleSelectNewMembers(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Add a team member"
                                    placeholder="Search for new member"
                                />
                            )}
                        />
                        <List width={1} className={classes.root} style={{ minHeight: '30vh' }}>
                            {
                                loadingTeam &&
                                <ListItem style={{ paddingLeft: '8rem' }}>
                                    <CircularProgress size='10rem' />
                                </ListItem>
                            }
                            {
                                team.length ?
                                    team.map((member) => {
                                        const labelId = `checkbox-list-secondary-label-${member.name}`
                                        return (
                                            <ListItem
                                                key={member.email}
                                                button
                                                onClick={handleSelectTeamMember(member)}
                                            >
                                                <ListItemText id={labelId} primary={`${member.name}`} secondary={`${member.email}`} />
                                                <Checkbox
                                                    edge="start"
                                                    checked={tempSelected.findIndex(i => i.email === member.email) !== -1}
                                                />
                                            </ListItem>
                                        )
                                    })
                                    :
                                    <ListItem>
                                        <Typography variant='h4' className={classes.span}>
                                            {(!loadingTeam && selectedProjectId) && 'This team is empty'}
                                            {(!loadingTeam && !selectedProjectId) && 'Select a project'}
                                        </Typography>
                                    </ListItem>
                            }
                        </List>
                        <Button onClick={handleRemoveMembers} color="primary">
                            Remove Members
                        </Button>
                        <Button onClick={handleAddMembers} color="primary">
                            Add Members
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminTeams