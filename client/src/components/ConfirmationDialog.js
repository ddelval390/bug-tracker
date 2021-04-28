import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmationDialog = ({open, handleOpen, handleConfirm, titleText, descriptionText}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descriptionText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary'onClick={handleOpen}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={() => {handleConfirm(); handleOpen()}}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationDialog