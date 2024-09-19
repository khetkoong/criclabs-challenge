'use client'

// import { useEffect, useState } from 'react'
import DrawerWrapper from './components/Drawer'
import IconBreadcrumbs from './components/Breadcrumbs'
// import { createClient } from './utils/supabase/client'
import { Box, Button, Typography } from '@mui/material'
import MyButton from './components/Button'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded'
import VerticalAlignTopRoundedIcon from '@mui/icons-material/VerticalAlignTopRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

export default function Page() {
  // const [departments, setDepartments] = useState([{ id: '', name: '' }])

  // useEffect(() => {
  //   (async () => {
  //     const supabase = createClient()
  //     const { data } = await supabase.from('departments').select('id,name')
  //     setDepartments(data as typeof departments)
  //   })()
  // }, [])

  // console.log('departments: ', departments)

  return (
    <DrawerWrapper>
      <IconBreadcrumbs />
      <Box mt={2} display={{ sx: 'block', sm: 'flex' }} justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Data Mapping
        </Typography>
        <Box display="flex" gap={2}>
          <MyButton variant="outlined">
            <FilterListRoundedIcon sx={{ mr: 0.5 }} />
            Filter
          </MyButton>
          <MyButton variant="outlined">
            <VerticalAlignBottomRoundedIcon sx={{ mr: 0.5 }} />
            Export
          </MyButton>
          <MyButton variant="outlined">
            <VerticalAlignTopRoundedIcon sx={{ mr: 0.5 }} />
            Import
          </MyButton>
          <MyButton variant="contained" color="success">
            <AddRoundedIcon sx={{ mr: 0.5 }} />
            New Data
          </MyButton>
        </Box>
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
