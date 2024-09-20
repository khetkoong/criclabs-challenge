'use client'

import { useContext, useEffect, useState } from 'react'
import DrawerWrapper from './components/Drawer'
import IconBreadcrumbs from './components/Breadcrumbs'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import MyButton from './components/Button'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded'
import VerticalAlignTopRoundedIcon from '@mui/icons-material/VerticalAlignTopRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MyButtonToggle from './components/ToggleButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DataTable from './components/DataTable'
import DrawerAddData from './components/DrawerAddData'
import { createClient } from './utils/supabase/client'

interface Rows {
  id: number
  title: string
  description: string
  department: string
  data_subject_type: string
}

const initRows = [] as Rows[]

export default function Page() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [openDrawerAdd, setOpenDrawerAdd] = useState(false)
  const [rows, setRows] = useState<Rows[]>(initRows)

  const onCloseDrawerAdd = (shouldFetchNewData = false) => {
    setOpenDrawerAdd(false)
    if (shouldFetchNewData) {
      fetchDataMapping()
    }
  }

  const onOpenDrawerAdd = () => {
    setOpenDrawerAdd(true)
  }

  const fetchDataMapping = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('data_mappings').select('*')
    const formattedData = data?.map((d) => ({
      id: d?.id,
      title: d?.title,
      description: d?.description,
      department: d?.department,
      data_subject_type: d?.data_subject_type,
    })) as Rows[]
    setRows(formattedData)
  }

  useEffect(() => {
    fetchDataMapping()
  }, [])

  return (
    <DrawerWrapper>
      <IconBreadcrumbs />
      <Box mt={2} display={{ sx: 'block', sm: 'flex' }} justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Data Mapping
        </Typography>
        <Stack direction="row" spacing={2} mt={{ md: 0, xs: 2 }} width="auto">
          {!isMobile ? (
            <>
              <MyButton variant="outlined" startIcon={<FilterListRoundedIcon />}>
                Filter
              </MyButton>
              <MyButton variant="outlined" startIcon={<VerticalAlignBottomRoundedIcon />}>
                Export
              </MyButton>
              <MyButton variant="outlined" startIcon={<VerticalAlignTopRoundedIcon />}>
                Import
              </MyButton>
            </>
          ) : (
            <>
              <MyButton variant="outlined">
                <FilterListRoundedIcon />
              </MyButton>
              <MyButton variant="outlined">
                <VerticalAlignBottomRoundedIcon />
              </MyButton>
              <MyButton variant="outlined">
                <VerticalAlignTopRoundedIcon />
              </MyButton>
            </>
          )}
          <MyButton variant="contained" color="success"
            startIcon={<AddRoundedIcon />}
            {...isMobile && {
              fullWidth: true
            }}
            onClick={onOpenDrawerAdd}
          >
            New Data
          </MyButton>
        </Stack>
      </Box>
      <Box mt={2}>
        <MyButtonToggle />
      </Box>
      <Box mt={2}>
        <Stack direction="row" spacing={2}>
          <MyButton variant="outlined" isGreen>
            <EditOutlinedIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
            <Typography color="success">
              Edit
            </Typography>
          </MyButton>
          <MyButton variant="outlined">
            <RemoveRedEyeOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
            Visualize
          </MyButton>
        </Stack>
      </Box>
      <Box mt={2} sx={{ height: '60%' }}>
        <DataTable rows={rows} />
      </Box>
      <DrawerAddData
        open={openDrawerAdd}
        onClose={onCloseDrawerAdd}
      />
    </DrawerWrapper>
  )
}
