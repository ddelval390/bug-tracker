import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    span: {
        borderRadius: '3px',
        backgroundColor: '#00adb5',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '.4rem',

    },
}))


const HeaderLabel = ({ text }) => {
    const classes = useStyles()
    return (
        <Typography variant='h3' component='span' className={classes.span}>
           {text}
        </Typography>
    )
}

export default HeaderLabel