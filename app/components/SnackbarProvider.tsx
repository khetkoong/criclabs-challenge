'use client'

import Button from '@mui/material/Button'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Fragment, ReactNode, useState } from 'react'
import { Alert, AlertColor } from '@mui/material'
import { SnackbarContext } from '../context/SnackbarContext'

interface SnackbarProviderProps {
  children: ReactNode
}

export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success')

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const message = (type: AlertColor, message: string) => {
    setOpen(true)
    setSnackbarMessage(message)
    setSnackbarType(type)
  }

  return (
    <SnackbarContext.Provider value={{ message }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
