import { useState } from 'react'
import { CardActionArea, Stack, Typography } from '@mui/material'
import MergeTypeRoundedIcon from '@mui/icons-material/MergeTypeRounded'
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'

export default function MyButtonToggle() {
  const [selected, setSelected] = useState('dataMapping')

  return (
    <Stack direction="row" spacing={1} sx={styles.container}>
      <CardActionArea
        sx={{
          ...styles.button,
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
          <Typography color={selected === 'dataMapping' ? 'black' : '#878787'} noWrap>
            Data Mapping
          </Typography>
        </Stack>
      </CardActionArea>
      <CardActionArea
        sx={{
          ...styles.button,
          ...(selected === 'connectionSources' ? {
            borderBottom: '2px solid #2e7d32'
          } : {
            paddingTop: '2px'
          })
        }}
        onClick={() => setSelected('connectionSources')}>
        <Stack direction="row" spacing={1} overflow="auto">
          <FolderOpenRoundedIcon
            {...(selected !== 'connectionSources') && ({
              color: 'disabled'
            })}
          />
          <Typography color={selected === 'connectionSources' ? 'black' : '#878787'} noWrap>
            Collection sources
          </Typography>
        </Stack>
      </CardActionArea>
    </Stack>
  )
}

const styles = {
  container: {
    borderBottom: '1px solid #E0E0E0'
  },
  button: {
    width: 'fit-content',
    padding: 0.5,
  }
} as const
