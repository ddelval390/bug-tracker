import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Table from '../components/Table';
import { getAllUsers, updateUser } from '../apis/user-api';
import HeaderLabel from '../components/HeaderLabel'
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Context } from '../global/Store';
import {snackbarPayload} from '../helpers/constants'
import {OPENSNACKBAR} from '../helpers/constants';

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

const AdminRoles = () => {
    const classes = useStyles();

    const [selectedUserId, setSelectedUserId] = useState('');
    const [users, setAllUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(false)
    const [role, setRole] = useState('')
    const [, dispatch] = useContext(Context);


/**
 * Retrieves all users and loads them into a table
 */
    useEffect(() => {
        setUsersLoading(true)
        getAllUsers()
            .then(res => {
                setAllUsers(res.data.userList)
                setUsersLoading(false)
            })
        // eslint-disable-next-line
    }, [])

/**
 * Handles the selection of a user on the table.
 * @param {object} event - Captures the event
 * @param {string} id - The ID of the user to be selected
 */
    const handleSelectUser = (event, id) => {
        if (selectedUserId === id) {
            setSelectedUserId('');
        } else {
            setSelectedUserId(id)
            const user = users.find(user => user._id === id)
            setRole(user.role)
        }
    }

    /**
     * Captures the selected role vale and then sends an api request with the
     * selected user to update the user's role.
     * @param {object} event Captures the event
     */
    const handleRoleChange = (event) => {
        const newRole = event.target.value
        setRole(newRole)
        updateUser(selectedUserId, { role: newRole })
        .then(res => {
            snackbarPayload.snackbarText = 'Successfully changed user role'
            snackbarPayload.snackbarSeverity = 'success'
          })
          .catch(err => {
            snackbarPayload.snackbarText = 'Could not change users role. Try again later.'
            snackbarPayload.snackbarSeverity = 'error'
          })
          .finally(() => {
            dispatch({ type: OPENSNACKBAR, snackbarPayload: snackbarPayload })
          })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderLabel text='Manage User Roles' />
                </Grid>

                <Grid item md={8} xs={12}>
                    <Table
                        emptyTableText='There are no users'
                        tableHeight='70vh'
                        loading={usersLoading}
                        selected={selectedUserId}
                        handleSelect={handleSelectUser}
                        title='Users'
                        data={users}
                        hover={true}
                        dense={false}
                        rowKey='_id'
                    />
                </Grid>
                <Grid item md={4} xs={12} spacing={2} style={{ textAlign: 'center' }}>
                    <Box component={Paper} style={{ minHeight: '25vh' }}>
                        <Typography variant='h5'>
                            User role details for user:
                        </Typography>
                        <Typography variant='h5'>
                            {selectedUserId ? users.find(user => user._id === selectedUserId).name : 'No user selected'}
                        </Typography>
                        <FormControl className={classes.formControl} style={{ width: "80%" }}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                disabled={selectedUserId === ''}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                onChange={(e) => handleRoleChange(e)}
                                fullWidth
                            >
                                <MenuItem value='Submitter'>Submitter</MenuItem>
                                <MenuItem value='Developer'>Developer</MenuItem>
                                <MenuItem value='Project Manager'>Project Manager</MenuItem>
                                <MenuItem value='Admin'>Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}

export default AdminRoles