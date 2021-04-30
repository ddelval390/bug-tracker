import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles({
    paper: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    hover: {
        "&:hover": {
            backgroundColor: "#0899ba !important"
        }

    },
    selected: {
        backgroundColor: "#607d8b !important"
    },

    span: {
        padding: '1rem',
    }
})

export default function BasicTable({ loading, selected, handleSelect, title, data, hover, dense, rowKey, tableHeight, emptyTableText }) {

    /**
     * Handle cases where a table does not need a select function.
     * Throw an error when key and height are not specified
     */
    if (!handleSelect) {
        handleSelect = () => undefined
    }
    if (!rowKey) {
        throw new Error('Component prop "rowKey" is not defined')
    }
    if (!tableHeight) {
        throw new Error('Component prop "tableHeight" is not defined')
    }

    /**
     * Styling
     */
    const classes = useStyles()

    /**
     * States used to manage the pages and rows displayed on a table
     */
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(25)

    /**
     * Function to handle page changing in the table component.
     * @param {object} event - Capture the event object
     * @param {number} newPage - The number of the new page.
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    /**
     * Modifies the table component to handle the requested rows per page
     * @param {object} event - Capture the event object.
     */
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    /**
     * Determines if the ID selected is the the ID of the current row.
     * @param {string} rowId - The rowId to be compared to the selectedId
     * @returns True if the selected objects Id matches the rowId
     */
    const isSelected = rowId => selected === rowId

    /**
     * Deep copy the table data and remove the "_id" field to avoid it being
     * displayed in the table.
     */
    const rows = JSON.parse(JSON.stringify(data))

    rows.forEach(row => delete row._id)

    return (
        <Paper className={classes.paper}>
            <Typography variant='h4' component='span' className={classes.span}>
                {title}
            </Typography>
            <TableContainer style={{ minHeight: tableHeight, maxHeight: tableHeight }}>
                <Table
                    className={classes.table}
                    aria-label="simple table"
                    size={dense ? 'small' : 'medium'}
                    components={{
                    }}
                >
                    <TableHead>
                        <TableRow>

                            {/* Uses the first object in the array to create the table header */}
                            {
                                rows[0] &&
                                Object.keys(rows[0]).map((key, index) => {
                                    const titleCaseKey = key.charAt(0).toUpperCase() + key.slice(1)
                                    if (index === 0) {
                                        return <TableCell key={key + ' ' + index}>{titleCaseKey}</TableCell>
                                    } else {
                                        return <TableCell key={key + ' ' + index} align="center">{titleCaseKey}</TableCell>
                                    }

                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {/* Maps the data to the table */}
                        {
                            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow
                                    classes={{ hover: classes.hover, selected: classes.selected }}
                                    hover={hover}
                                    key={row[rowKey] + ' ' + index}
                                    onClick={(event) => {
                                        handleSelect(event, data[index]._id)
                                    }}
                                    selected={hover && isSelected(data[index]._id)}
                                >
                                    {
                                        Object.keys(row).map((key, index) => {
                                            if (index === 0) {
                                                return <TableCell key={key + ' ' + index} component="th" scope="row">
                                                    {row[key]}
                                                </TableCell>
                                            } else {
                                                return <TableCell key={key + ' ' + index} align="center">{row[key]}</TableCell>
                                            }
                                        })
                                    }
                                </TableRow>
                            ))
                        }

                        {/* Display spinner when data is loading */}
                        {
                            loading &&
                            <TableRow>
                                <TableCell align="center" style={{ border: 'none' }}>
                                    <CircularProgress size='8.5rem' />
                                </TableCell>
                            </TableRow>
                        }

                        {/* Displays text when table is empty and not loading */}
                        {
                            (!rows.length && !loading) &&
                            <TableRow>
                                <TableCell align="center" style={{ border: 'none' }}>
                                    <Typography variant='h4' className={classes.span}>
                                        {emptyTableText}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper >
    )
}
