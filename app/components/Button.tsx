import { Button, ButtonProps } from '@mui/material'

interface MyButtonType extends ButtonProps {
  isGreen?: boolean
}

export default function MyButton(props: MyButtonType) {
  return (
    <Button
      {...props}
      sx={(theme) => ({
        ...styles.button,
        ...props?.isGreen && {
          border: `1px solid ${theme.palette.success.main}`
        }
      })}
    >
      {props.children}
    </Button>
  )
}

const styles = {
  button: {
    textTransform: 'none',
    minWidth: 'max-content',
    whiteSpace: 'nowrap',
  }
} as const