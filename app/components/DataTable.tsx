import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { createClient } from '../utils/supabase/client'
import { useSnackbar } from '../context/SnackbarContext'
import { useMemo, useRef, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import MyButton from './Button'

interface Rows {
  id: number
  title: string
  description: string
  department: string
  data_subject_type: string
}

const paginationModel = { page: 0, pageSize: 5 }

interface DataTableProps {
  rows: Rows[]
  loading?: boolean
  fetchDataMapping: () => void
}

export default function DataTable(props: DataTableProps) {
  const { message } = useSnackbar()
  const {
    rows,
    loading,
    fetchDataMapping
  } = props
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const deleteRef = useRef<number>()
  const [deleteLoading, setDeleteLoading] = useState(false)

  const generateColumns = () => {
    return [
      { field: 'title', headerName: 'Title', flex: 0.5, filterable: false, hideable: false },
      { field: 'description', headerName: 'Description', flex: 1, filterable: false, hideable: false },
      { field: 'department', headerName: 'Departments', flex: 1, filterable: false, hideable: false },
      { field: 'data_subject_type', headerName: 'Data Subject Types', flex: 1, filterable: false, hideable: false },
      {
        field: 'action', headerName: '', flex: 0.5, filterable: false, hideable: false,
        type: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              key={id}
              icon={<BorderColorOutlinedIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => console.log('edit id: ', id)}
              color="inherit"
            />,
            <GridActionsCellItem
              key={id}
              icon={<DeleteOutlineOutlinedIcon color="error" />}
              label="Delete"
              onClick={() => handleDeleteClick(id as number)}
              color="inherit"
            />
          ]
        }
      },
    ] as GridColDef[]
  }

  const columns: GridColDef[] = useMemo(() => generateColumns(), [])

  const handleDeleteClick = async (id: number) => {
    deleteRef.current = id
    setOpenConfirmModal(true)
  }

  const handleDeleteData = async () => {
    setDeleteLoading(true)
    try {
      const supabase = createClient()
      await supabase
        .from('data_mappings')
        .delete()
        .eq('id', deleteRef.current)
      message('success', 'Delete Success')
      fetchDataMapping()
      handleClose()
    } catch (error) {
      message('error', `Something went wrong: ${error}`)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleClose = () => {
    deleteRef.current = undefined
    setOpenConfirmModal(false)
  }

  return (
    <>
      <Paper sx={{ height: '100%', width: '100%', overflowX: 'auto', textWrap: 'nowrap' }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            width: !isMobile ? '100%' : 900,
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden'
            }
          }}
          autosizeOptions={{
            columns: [
              'title',
              'description',
              'department',
              'data_subject_type',
              'action',
            ],
            includeOutliers: true,
            includeHeaders: true,
          }}
        />

      </Paper>
      <Dialog onClose={handleClose} open={openConfirmModal}>
        <DialogTitle>Confirm delete data?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton
            onClick={handleClose}
            color="error"
            disabled={deleteLoading}
          >
            Disagree
          </MyButton>
          <MyButton
            onClick={handleDeleteData}
            autoFocus
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Processing...' : 'Agree'}
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
