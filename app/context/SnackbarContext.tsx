import { AlertColor } from '@mui/material'
import { createContext, useContext } from 'react'

interface SnackbarContextType {
  message: (type: AlertColor, message: string) => void
}

const initialContext = {
  message: () => undefined
}

export const SnackbarContext = createContext<SnackbarContextType>(initialContext)

export const useSnackbar = () => useContext(SnackbarContext)