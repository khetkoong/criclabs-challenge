import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import LaptopIcon from '@mui/icons-material/Laptop'
import TvIcon from '@mui/icons-material/Tv'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import Stack from '@mui/material/Stack'
import ToggleButton, { ToggleButtonTypeMap } from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ReactNode, useState } from 'react'
import { Box, Button, CardActionArea, Typography } from '@mui/material'
import MergeTypeRoundedIcon from '@mui/icons-material/MergeTypeRounded'
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'

export default function MyButtonToggle() {
  const [selected, setSelected] = useState('dataMapping')
  // const [alignment, setAlignment] = useState('left')
  // const [devices, setDevices] = useState(() => ['phone'])

  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: string | null,
  // ) => {
  //   if (newAlignment !== null) {
  //     setAlignment(newAlignment)
  //   }
  // }

  // const handleDevices = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newDevices: string[],
  // ) => {
  //   if (newDevices.length) {
  //     setDevices(newDevices)
  //   }
  // }

  const buttonStyle = {
    width: 'fit-content',
    padding: 0.5,
  }

  console.log('selected: ', selected)

  return (
    <Stack direction="row" spacing={1} sx={{ borderBottom: '1px solid #C0C0C0' }}>
      <CardActionArea sx={{
        ...buttonStyle,
        ...(selected === 'dataMapping' ? {
          borderBottom: '2px solid #2e7d32'
        } : {
          paddingTop: '2px'
        })
      }}
        onClick={() => setSelected('dataMapping')}>
        <Stack direction="row" spacing={1}>
          <MergeTypeRoundedIcon
            {...(selected !== 'dataMapping') && ({
              color: 'disabled'
            })}
          />
          <Typography color={selected === 'dataMapping' ? 'black' : '#878787'}>
            Data Mapping
          </Typography>
        </Stack>
      </CardActionArea>
      <CardActionArea sx={{
        ...buttonStyle,
        ...(selected === 'connectionSources' ? {
          borderBottom: '2px solid #2e7d32'
        } : {
          paddingTop: '2px'
        })
      }}
        onClick={() => setSelected('connectionSources')}>
        <Stack direction="row" spacing={1}>
          <FolderOpenRoundedIcon
            {...(selected !== 'connectionSources') && ({
              color: 'disabled'
            })}
          />
          <Typography color={selected === 'connectionSources' ? 'black' : '#878787'}>
            Collection sources
          </Typography>
        </Stack>
      </CardActionArea>
    </Stack>
  )
}
