import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'

export const DialogWrapper = ({
  open,
  title,
  body,
  setModal,
}: {
  open: boolean
  title: string
  body: string
  setModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element => {
  const handleClose = () => setModal(false)
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      aria-describedby="simple-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
