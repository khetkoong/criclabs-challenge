import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Box from '@mui/material/Box'

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

export default function IconBreadcrumbs() {
  return (
    <Box role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb"
        sx={styles.breadcrumb}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeOutlinedIcon sx={{ color: "black" }} />
        </Link>
        <Typography
          sx={styles.breadcrumbTextPath}
        >
          Current path
        </Typography>
      </Breadcrumbs>
    </Box>
  )
}

const styles = {
  breadcrumb: {
    '& .MuiBreadcrumbs-separator': {
      color: '#D0D0D0'
    }
  },
  breadcrumbTextPath: {
    color: '#D0D0D0',
    display: 'flex',
    alignItems: 'center'
  }
} as const
