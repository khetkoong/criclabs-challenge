import { Button, ButtonProps } from '@mui/material'
import React from 'react'

interface MyButtonType extends ButtonProps {
  isGreen?: boolean
}

export default function MyButton(props: MyButtonType) {
  return (
    <Button
      {...props}
      sx={(theme) => ({
        textTransform: 'none',
        minWidth: 'max-content',
        whiteSpace: 'nowrap',
        ...props?.isGreen && {
          border: `1px solid ${theme.palette.success.main}`
        }
      })}
    >
      {props.children}
    </Button>
  )
}
