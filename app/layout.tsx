'use client'

import SnackbarProvider from './components/SnackbarProvider'
import "./globals.css"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import DrawerWrapper from './components/Drawer'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {
                variant: 'outlined',
              },
              style: {
                borderColor: '#C0C0C0',
                color: 'black',
                ':hover': {
                  backgroundColor: '#ededed'
                }
              }
            }
          ]
        }
      }
    }
  }
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <DrawerWrapper>
              {children}
            </DrawerWrapper>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
