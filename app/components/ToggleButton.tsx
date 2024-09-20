import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { CardActionArea, Typography } from '@mui/material'
import MergeTypeRoundedIcon from '@mui/icons-material/MergeTypeRounded'
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'

export default function MyButtonToggle() {
  const [selected, setSelected] = useState('dataMapping')

  const buttonStyle = {
    width: 'fit-content',
    padding: 0.5,
  }

  return (
    <Stack direction="row" spacing={1} sx={{ borderBottom: '1px solid #E0E0E0' }}>
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
