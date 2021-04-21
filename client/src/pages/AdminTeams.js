import React, { useState, useEffect, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Table from '../components/Table';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getProject, updateTeam } from '../apis/project-api'
import { getAllUsers, getUserProjects } from '../apis/user-api';
import { Context } from '../global/Store';
import HeaderLabel from '../components/HeaderLabel'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';




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

    const [selected, setSelected] = useState('');
    const [projectData, setProjectData] = useState([])
    const [state] = useContext(Context);


    const [team, setTeam] = useState([])
    const [tempSelected, setTempSelected] = useState([])
    const [selectedNewMembers, setSelectedNewMembers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [makeUpdate, setMakeUpdate] = useState(false)

    useEffect(() => {
        const func = async () => {
            const projects = await getUserProjects(state.userId)
                .then(res => res.data.projects)
            const users = await getAllUsers()
                .then(res => res.data.userList)

            setProjectData(projects)
            setAllUsers(users)
        }

        func()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (selected !== '') {
            getProject(selected)
                .then(res => {
                    const project = res.data.project
                    setTeam(project.team)
                })
                .catch(err => console.log(err))
        }
    }, [selected])

    useEffect(() => {
        if (makeUpdate) {
            const newTeam = []
            for (let member of team) {
                newTeam.push(member._id)
            }
            updateTeam(selected, newTeam)
                .then(res => console.log(res))
            setMakeUpdate(false)

        }

        // eslint-disable-next-line
    }, [makeUpdate])



    const handleSelect = (event, name) => {
        if (selected === name) {
            setSelected('');
        } else {
            setSelected(name)
        }
    }


    const handleSelectTeamMember = (member) => () => {
        const currentIndex = tempSelected.findIndex(i => i.email === member.email);
        const newChecked = [...tempSelected];

        if (currentIndex === -1) {
            newChecked.push(member);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setTempSelected([...newChecked]);
    };

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

    const handleAddMembers = () => {
        const newTeam = [...team, ...selectedNewMembers]
        setTeam([...newTeam])
        setSelectedNewMembers([])
        setMakeUpdate(true)
    }

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
                        selected={selected}
                        handleSelect={handleSelect}
                        title='Projects'
                        data={projectData}
                        hover={true}
                        dense={false}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <Box component={Paper}>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            disableListWrap
                            disableCloseOnSelect={true}
                            id="tags-outlined"
                            options={allUsers}
                            getOptionLabel={(option) => {

                                return <Fragment>{`${option.first_name} ${option.last_name}`}&nbsp;&nbsp;&nbsp;<em>{option.email}</em></Fragment>
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
                        <List width={1} className={classes.root} style={{ minHeight: '20vh' }}>
                            {
                                team.map((member) => {
                                    const labelId = `checkbox-list-secondary-label-${member.first_name}`;
                                    return (
                                        <ListItem
                                            key={member.email}
                                            button
                                            onClick={handleSelectTeamMember(member)}
                                        >
                                            <ListItemText id={labelId} primary={`${member.first_name}`} secondary={`${member.email}`} />
                                            <Checkbox
                                                edge="start"
                                                checked={tempSelected.findIndex(i => i.email === member.email) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItem>
                                    );
                                })
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
    );
}