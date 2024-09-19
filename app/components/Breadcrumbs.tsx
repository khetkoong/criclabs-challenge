import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

export default function IconBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: '#D0D0D0'
          }
        }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeOutlinedIcon sx={{ color: "black" }} />
        </Link>
        <Typography
          sx={{ color: '#D0D0D0', display: 'flex', alignItems: 'center' }}
        >
          Current path
        </Typography>
      </Breadcrumbs>
    </div>
  )
}
