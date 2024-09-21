/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import { InputLabel, Box, TextField, FormHelperText, Select, MenuItem } from '@mui/material'
import { Controller } from 'react-hook-form'

export interface OptionsType {
  name: string
  id: number
}

interface InputProps {
  label: string
  name: string
  error?: boolean
  helperText?: string
  type?: 'text' | 'textArea' | 'select' | 'multipleSelect'
  options?: OptionsType[]
  control: any
  disabled?: boolean
}

const Input = (props: InputProps) => {
  const {
    label,
    name,
    error,
    helperText,
    type = 'text',
    options,
    control
  } = props

  const isTextArea = type === 'textArea'
  const isSelect = ['select', 'multipleSelect'].includes(type)
  const isMultipleSelect = type === 'multipleSelect'

  return (
    <>
      <InputLabel sx={styles?.textBlack} error={error}>
        {label}
      </InputLabel>
      <Box mt={1}>
        {!isSelect ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field as any}
                {...props}
                label=""
                fullWidth
                size="small"
                {...(isTextArea) && ({
                  rows: "4",
                  multiline: true
                })}
              />
            )}
          />
        ) : (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  {...props}
                  {...isMultipleSelect && {
                    multiple: true
                  }}
                  fullWidth
                  sx={styles.removeLabel}
                  size="small"
                >
                  {options && options.map((o) => <MenuItem key={o?.id} value={o?.name}>{o?.name}</MenuItem>)}
                </Select>
                <FormHelperText error={error} sx={styles.helperBox}>
                  {helperText}
                </FormHelperText>
              </>
            )}
          />
        )}
      </Box>
    </>
  )
}

const styles = {
  textBlack: {
    color: 'black'
  },
  removeLabel: {
    '& legend': {
      display: 'none'
    },
    '& fieldset': {
      top: 0
    },
  },
  helperBox: {
    mt: "4px",
    mx: "14px"
  }
} as const

export default memo(Input)