import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { memo, ReactNode } from 'react'
import MergeTypeRoundedIcon from '@mui/icons-material/MergeTypeRounded'
import { Avatar, CardActionArea, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

const drawerWidth = 300

interface DrawerWrapperProps {
  children: ReactNode
}

const MENUS = [
  {
    name: 'Data Mapping',
    icon: <MergeTypeRoundedIcon color="success" />
  },
  {
    name: 'Governance Document',
    icon: <AccountBalanceRoundedIcon />
  },
  {
    name: 'Employee Awareness',
    icon: <PeopleAltOutlinedIcon />
  },
  {
    name: 'Data Processor',
    icon: <StorageRoundedIcon />
  },
  {
    name: 'Subject Access Request',
    icon: <VpnKeyOutlinedIcon />
  },
  {
    name: 'Data breach register',
    icon: <LockOpenRoundedIcon />
  }
]

const DrawerWrapper = (props: DrawerWrapperProps) => {
  const { children } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  console.log('------------------------------> 🦦🧸 ~ isDesktop:', isDesktop)
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        borderBottom: '1px solid #F0F0F0'
      }}
      >
        <Toolbar>
          <Box width="100vw" display="flex" color="black" alignItems="center" justifyContent="space-between">
            <Box display="flex" gap={2} alignItems="center">
              <SecurityRoundedIcon fontSize="large" color="success" />
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="h6" noWrap component="div">
                  PDPA / International School
                </Typography>
                <IconButton sx={{ color: "black" }} aria-label="expand-more" size="small">
                  <ExpandMoreRoundedIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Avatar alt="Remy Sharp" src="https://plus.unsplash.com/premium_photo-1671656333460-793292581bc6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" sx={{
                width: 32,
                height: 32
              }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar >
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              backgroundColor: '#f5f5f5'
            },
            // display: { xs: 'none', sm: 'none', md: 'block' }
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Box padding={2.5}>
              {MENUS.map((menu, index) => (
                <CardActionArea key={index} sx={{
                  marginTop: index !== 0 ? 1.5 : 0,
                  borderRadius: 1,
                  padding: 0.5
                }} >
                  <Box display="flex" gap={1}>
                    {menu?.icon}
                    <Typography color={index === 0 ? 'success' : 'black'}>{menu?.name}</Typography>
                  </Box>
                </CardActionArea>
              ))}
            </Box>
          </Box>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', width: "100%" }}>
        <Toolbar />
        {isMobile && (
          <Box sx={{ overflow: 'auto', pb: 2, borderBottom: '1px solid #E0E0E0' }}>
            <Stack direction="row">
              {MENUS.map((menu, index) => (
                <CardActionArea key={index} sx={{
                  marginRight: index !== MENUS.length - 1 ? 1.5 : 0,
                  borderRadius: 1,
                  padding: 0.5,
                  width: '100%'
                }}>
                  <Box display="flex" gap={1}>
                    {menu?.icon}
                    <Typography noWrap color={index === 0 ? 'success' : 'black'}>{menu?.name}</Typography>
                  </Box>
                </CardActionArea>
              ))}
            </Stack>
          </Box>
        )}
        <Box
          {...isMobile && {
            mt: 3
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(DrawerWrapper)