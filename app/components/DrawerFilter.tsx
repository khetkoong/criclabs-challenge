import { Box, Button, Checkbox, Container, Drawer, FormControlLabel, FormGroup, InputBase, InputLabel, Paper, Stack, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { LegacyRef, memo, useEffect, useRef, useState } from 'react'
import Input, { OptionsType } from './Input'
import { createClient } from '../utils/supabase/client'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useSnackbar } from '../context/SnackbarContext'
import MyButton from './Button'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SearchIcon from '@mui/icons-material/Search'

interface DrawerFilterProps {
  open: boolean
  onClose: (shouldFetchNewData?: boolean) => void
}

const initialValues = {
  title: '',
  description: '',
  department: '',
  data_subject_type: []
}

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  department: z.string().min(1),
  data_subject_type: z.array(z.string())
})

const DrawerFilter = (props: DrawerFilterProps) => {
  const {
    open,
    onClose
  } = props

  const { message } = useSnackbar()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [departmentOptions, setDepartmentOptions] = useState<OptionsType[]>([])
  const [dataSubjectTypeOptions, setDataSubjectTypeOptions] = useState<OptionsType[]>([])
  const submitRef = useRef<HTMLButtonElement | null>()
  const supabase = createClient()

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<typeof initialValues>({
    defaultValues: initialValues,
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<typeof initialValues> = async (data) => {
    try {
      const submitValues = {
        ...data,
        data_subject_type: data?.data_subject_type.join(', ')
      }
      await supabase
        .from('data_mappings')
        .insert([
          { ...submitValues }
        ])
      message('success', 'Create Success!')
      reset()
      onClose(true)
    } catch (error) {
      message('error', 'Something went wrong!')
    }
  }

  const fetchDepartmentOptions = async () => {
    const { data: departments } = await supabase.from('departments').select('id,name')
    setDepartmentOptions(departments as OptionsType[])
  }

  const fetchDataSubjectTypeOptions = async () => {
    const { data: data_subject_types } = await supabase.from('data_subject_types').select('id,name')
    setDataSubjectTypeOptions(data_subject_types as OptionsType[])
  }

  useEffect(() => {
    if (open) {
      if (departmentOptions.length < 1) {
        fetchDepartmentOptions()
      }
      if (dataSubjectTypeOptions.length < 1) {
        fetchDataSubjectTypeOptions()
      }
    }
  }, [open])

  const handleDrawerAddClose = () => {
    reset()
    onClose()
  }

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={handleDrawerAddClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box width={isMobile ? 'auto' : 400}>
        <Toolbar sx={{ borderBottom: "1px solid #F0F0F0" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" spacing={1}>
              <FilterListRoundedIcon />
              <Typography>
                Filter
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <MyButton variant="text" color="inherit" onClick={handleDrawerAddClose} disabled={isSubmitting}>
                Reset
              </MyButton>
              <MyButton variant="contained" color="success" onClick={() => submitRef?.current?.click?.()} disabled={isSubmitting}>
                Apply Filter
              </MyButton>
            </Stack>
          </Box>
        </Toolbar>
        <Box sx={{ borderBottom: "1px solid #F0F0F0" }}>
          <Stack direction="row" spacing={1} p={2}>
            <SearchIcon fontSize="large" color="disabled" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search filter"
            />
          </Stack>
        </Box>
        <Box p={3}>
          <Box>
            <Typography color="textDisabled">
              DEPARTMENT
            </Typography>
            <FormGroup>
              {departmentOptions.map((d) => (
                <FormControlLabel key={d?.id} control={<Checkbox color="success" />} label={d?.name} />
              ))}
            </FormGroup>
          </Box>
          <Box mt={2}>
            <Typography color="textDisabled">
              DATA SUBJECT TYPE
            </Typography>
            <FormGroup>
              {dataSubjectTypeOptions.map((d) => (
                <FormControlLabel key={d?.id} control={<Checkbox color="success" />} label={d?.name} />
              ))}
            </FormGroup>
          </Box>
        </Box>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit" ref={submitRef as any} hidden />
          <Stack direction="column" spacing={1} p={3}>
            <Input
              label="Title"
              name="title"
              control={control}
              type="text"
              error={!!errors?.title?.message}
              helperText={errors?.title?.message}
              disabled={isSubmitting}
            />
            <Input
              label="Description"
              name="description"
              control={control}
              type="text"
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
              disabled={isSubmitting}
            />
            <Input
              label="Department"
              name="department"
              control={control}
              type="select"
              error={!!errors?.department?.message}
              helperText={errors?.department?.message}
              options={departmentOptions}
              disabled={isSubmitting}
            />
            <Input
              label="Data Subject type (Optional)"
              name="data_subject_type"
              control={control}
              type="multipleSelect"
              options={dataSubjectTypeOptions}
              disabled={isSubmitting}
            />
          </Stack>
        </form> */}
      </Box>
    </Drawer>
  )
}

export default memo(DrawerFilter)