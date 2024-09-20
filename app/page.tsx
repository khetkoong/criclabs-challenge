'use client'

// import { useEffect, useState } from 'react'
import DrawerWrapper from './components/Drawer'
import IconBreadcrumbs from './components/Breadcrumbs'
// import { createClient } from './utils/supabase/client'
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

export default function Page() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
        <DataTable />
      </Box>
      {/* {departments.map((d) => (
        <Box key={d?.id}>
          <Typography>
            {d?.name}
          </Typography>
        </Box>
      ))} */}
    </DrawerWrapper>
  )
}
