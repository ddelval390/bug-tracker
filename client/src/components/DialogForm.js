import React, {  Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        minHeight: '40vh',
        minWidth: '40vw',
    },
    input: {
        display: 'none',
    },
    formControl: {
        display: 'inline-block',
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}))


const BugForm = ({children, isOpen, handleOpen, dialogTitle, dialogDescription, titleTFValue,  descriptionTFValue, handleChange, handleSubmit }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Dialog classes={{ paper: classes.dialogPaper }} open={isOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       {dialogDescription}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Title"
                        type="text"
                        value={titleTFValue}
                        onChange={(e) => handleChange(e.target.value, 'title')}
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        id="name"
                        label="Description"
                        type="text"
                        variant="filled"
                        multiline
                        rows={10}
                        value={descriptionTFValue}
                        onChange={(e) => handleChange(e.target.value, 'description')}
                        fullWidth
                        
                    />
                    {children}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default BugForm