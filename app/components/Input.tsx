import { InputLabel, Box, TextField, FormHelperText, Select, MenuItem } from '@mui/material'
import { memo } from 'react'
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
      <InputLabel sx={{ color: 'black' }} error={error}>
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
                  sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, }}
                  size="small"
                >
                  {options && options.map((o) => <MenuItem key={o?.id} value={o?.name}>{o?.name}</MenuItem>)}
                </Select>
                <FormHelperText error={error} sx={{ mt: "4px", mx: "14px" }}>
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

export default memo(Input)