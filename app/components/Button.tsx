import { Button, ButtonProps } from '@mui/material'
import React from 'react'

const MyButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        textTransform: 'none'
      }}
    >
      {props.children}
    </Button>
  )
}

export default MyButton