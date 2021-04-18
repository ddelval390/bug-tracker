import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    paper: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    span: {
        padding: '1rem',
    }
});

export default function BasicTable({ selected, handleSelect, title,  rows}) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = name => selected === name

    
    return (
        <Paper className={classes.paper}>
            <Typography variant='h4' component='span' className={classes.span}>
                {title}
            </Typography>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {   rows[0] &&
                                Object.keys(rows[0]).map((key, index) => {
                                    const titleCaseKey = key.charAt(0).toUpperCase() + key.slice(1)
                                    if (index === 0) {
                                        return <TableCell key={index}>{titleCaseKey}</TableCell>
                                    } else {
                                        return <TableCell key={index} align="right">{titleCaseKey}</TableCell>
                                    }

                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover key={row.title} onClick={(event) => handleSelect(event, row.title)} selected={isSelected(row.title)}>
                                {
                                    Object.keys(row).map((key, index) => {
                                        if (index === 0) {
                                            return <TableCell key={index} component="th" scope="row">
                                                {row[key]}
                                            </TableCell>
                                        } else {
                                            return <TableCell key={index} align="right">{row[key]}</TableCell>
                                        }
                                    })
                                }

                                {/* <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
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
        </Paper>
    );
}
