import { Box, Checkbox, Drawer, FormControlLabel, FormGroup, InputBase, Stack, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { OptionsType } from './Input'
import { createClient } from '../utils/supabase/client'
import { useSnackbar } from '../context/SnackbarContext'
import MyButton from './Button'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SearchIcon from '@mui/icons-material/Search'
import { Rows } from '../page'

interface DrawerFilterProps {
  open: boolean
  onClose: (shouldFetchNewData?: boolean) => void
  setRows: Dispatch<SetStateAction<Rows[]>>
}

const initialValues = {
  search_text: '',
  department: {} as Record<string, boolean>,
  data_subject_type: {} as Record<string, boolean>
}

const DrawerFilter = (props: DrawerFilterProps) => {
  const {
    open,
    onClose,
    setRows
  } = props

  const { message } = useSnackbar()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [departmentOptions, setDepartmentOptions] = useState<OptionsType[]>([])
  const [dataSubjectTypeOptions, setDataSubjectTypeOptions] = useState<OptionsType[]>([])
  const supabase = createClient()
  const [values, setValues] = useState(initialValues)

  const onSubmit = async () => {
    try {
      const instanceSupabase = supabase
        .from('data_mappings')
        .select("*")
        .order('created_at', { ascending: false })

      let findDepartment = ''
      for (const [key, value] of Object.entries(values?.department)) {
        if (value) {
          findDepartment = findDepartment + `department.ilike.%${key}%,`
        }
      }

      let findDataSubject = ''
      for (const [key, value] of Object.entries(values?.data_subject_type)) {
        if (value) {
          findDataSubject = findDataSubject + `data_subject_type.ilike.%${key}%,`
        }
      }

      if (values?.search_text.length > 0) {
        instanceSupabase.or(
          `title.ilike.%${values?.search_text}%,description.ilike.%${values?.search_text}%`
        )
      }

      if (findDepartment.length > 0) {
        instanceSupabase.or(findDepartment.replace(/,$/, ""))
      }

      if (findDataSubject.length > 0) {
        instanceSupabase.or(findDataSubject.replace(/,$/, ""))
      }

      const { data: data_mappings } = await instanceSupabase

      const formattedData = data_mappings?.map((d) => ({
        id: d?.id,
        title: d?.title,
        description: d?.description || '-',
        department: d?.department,
        data_subject_type: d?.data_subject_type || '-',
      })) as Rows[]

      setRows(formattedData)
      onClose()
    } catch (error) {
      message('error', `Something went wrong!: ${error}`)
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

  const handleDrawerAddClose = (shouldFetchNewData = false) => {
    setValues(initialValues)
    onClose(shouldFetchNewData)
  }

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, fieldName: 'department' | 'data_subject_type') => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        [event.target.name]: event.target.checked
      },
    }))
  }

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={() => handleDrawerAddClose()}
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
              <MyButton variant="text" color="inherit" onClick={() => handleDrawerAddClose(true)} disabled={false}>
                Reset
              </MyButton>
              <MyButton variant="contained" color="success" onClick={onSubmit} disabled={false}>
                Apply Filter
              </MyButton>
            </Stack>
          </Box>
        </Toolbar>
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}>
          <Box sx={{ borderBottom: "1px solid #F0F0F0" }}>
            <Stack direction="row" spacing={1} p={2}>
              <SearchIcon fontSize="large" color="disabled" />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search filter"
                value={values?.search_text}
                onChange={(e) => setValues((prev) => ({ ...prev, search_text: e.target.value }))}
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
                  <FormControlLabel key={d?.id} control={<Checkbox checked={values?.department[d?.name]} color="success" name={d?.name} onChange={(e) => handleChangeCheckbox(e, 'department')} />} label={d?.name} />
                ))}
              </FormGroup>
            </Box>
            <Box mt={2}>
              <Typography color="textDisabled">
                DATA SUBJECT TYPE
              </Typography>
              <FormGroup>
                {dataSubjectTypeOptions.map((d) => (
                  <FormControlLabel key={d?.id} control={<Checkbox checked={values?.data_subject_type[d?.name]} color="success" name={d?.name} onChange={(e) => handleChangeCheckbox(e, 'data_subject_type')} />} label={d?.name} />
                ))}
              </FormGroup>
            </Box>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default memo(DrawerFilter)