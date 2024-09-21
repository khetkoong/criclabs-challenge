import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { createClient } from '../utils/supabase/client'
import { useSnackbar } from '../context/SnackbarContext'
import { useMemo } from 'react'

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

  const generateColumns = () => {
    return [
      { field: 'title', headerName: 'Title', flex: 1, filterable: false, hideable: false },
      { field: 'description', headerName: 'Description', flex: 1, filterable: false, hideable: false },
      { field: 'department', headerName: 'Departments', flex: 1, filterable: false, hideable: false },
      { field: 'data_subject_type', headerName: 'Data Subject Types', flex: 1, filterable: false, hideable: false },
      {
        field: 'action', headerName: '', flex: 1, filterable: false, hideable: false,
        type: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<BorderColorOutlinedIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => console.log('edit id: ', id)}
              color="inherit"
            />,
            <GridActionsCellItem
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
    try {
      const supabase = createClient()
      await supabase
        .from('data_mappings')
        .delete()
        .eq('id', id)
      message('success', 'Delete Success')
      fetchDataMapping()
    } catch (error) {
      message('error', 'Something went wrong')
    }
  }


  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  )
}
