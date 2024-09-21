import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <Box
      display="flex"
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#f5f5f5"
      }}
    >
      <CircularProgress color="success" />
    </Box>
  )
}