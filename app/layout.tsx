'use client'

import "./globals.css"
import { ThemeProvider, createTheme } from '@mui/material/styles'

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
            },
            // {
            //   props: {
            //     variant: 'outlined',
            //   },
            //   style: {
            //     borderColor: '#C0C0C0',
            //     color: 'black'
            //   }
            // }
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
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
