import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '../components/Table'
import { getUserTickets } from '../apis/user-api'
import HeaderLabel from '../components/HeaderLabel'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Context } from '../global/Store'
import axios from 'axios'

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

const UserTickets = ({ match }) => {
    const classes = useStyles()

    const [selectedTicketId, setSelectedTicketId] = useState('')
    const [store] = useContext(Context)
    const [tickets, setTickets] = useState([])
    const [ticketsLoading, setTicketsLoading] = useState(false)

    /**
     * Loads tickets relevant to the user into a table.
     */
    useEffect(() => {
        const source = axios.CancelToken.source()
        setTicketsLoading(true)
        getUserTickets(store.userId, source.token)
            .then(res => {
                const ticketData = res.data.tickets
                setTickets(ticketData)
                setTicketsLoading(false)
            })
            return () => {
                source.cancel()
            }
        // eslint-disable-next-line
    }, [])


    /**
     * Handles the selection of a ticket in the table.
     * @param {object} event - Captures the event.
     * @param {string} name - The "_id" field of the ticket to be selected.
     */
    const handleSelect = (event, name) => {
        if (selectedTicketId === name) {
            setSelectedTicketId('')
        } else {
            setSelectedTicketId(name)
        }
    }



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderLabel text='My Tickets' />
                </Grid>

                <Grid item md={12} xs={12}>
                    <Table
                        emptyTableText='You currently have no tickets'
                        tableHeight='60vh'
                        loading={ticketsLoading}
                        selected={selectedTicketId}
                        handleSelect={handleSelect}
                        title='Tickets'
                        data={tickets}
                        hover={true}
                        dense={false}
                        rowKey='title'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Link to={`/dashboard/projects/ticket/${selectedTicketId}`} className={classes.link}>
                        <Button variant='contained' color='primary' fullWidth disabled={!selectedTicketId}>
                            Ticket Details
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserTickets