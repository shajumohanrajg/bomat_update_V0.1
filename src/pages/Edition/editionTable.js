import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
//import { Box,  Typography,IconButton} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  // Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,Box,IconButton,Button
} from '@mui/material';
import Axios from 'axios';
// components
// import Page from '../../components/Page';
// import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
// import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../section/@dashboard/table';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'publication', label: 'Publication', alignRight: false },
  { id: 'edition', label: 'Edition', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_editions) => _editions.edition.edition.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const EditionTable = (props) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('edition');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [edition,setEdition] = useState([]);

  

  // const EDITIONLIST = [...Array(edition.length)].map((_,index) =>({
  //   id: edition.id,
  //   edition: edition.edition,
  //   // publication: edition.edition.pub.pub_name,
  //   district: edition.district,
  //   // state: edition.district.state.state,
  // }));

  const columns = [
   
    {
      field: "id",
      valueFormatter: ({value}) => 'E' + value,
      headerName: "ID",
      headerClassName: 'super-app-theme--header',
      flex: 0.4,
      // cellClassName: "name-column--cell",
      cellClassName: 'super-app-theme--cell',
    },
    
 
    {
      field: "edition",
      valueFormatter: ({value}) => value.edition,
      headerName: "Edition",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
 
    {
      field: "district",
      valueFormatter: ({value}) => value.district,
      headerName: "District",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
   
 

 
  
 
       
  
  
    
  ]
  useEffect(()=>{
    Axios.get('http://10.8.1.170:4545/api/v1/Edition_save_list',{
    }).then((response) => {
      // console.log("edition",response.data);
      const editions=response.data; 
      setEdition(editions);
    }, (error) => {
      console.log(error);
    });
  },[])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = edition.map((n) => n.edition.edition);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, edition) => {
    const selectedIndex = selected.indexOf(edition);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, edition);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - edition.length) : 0;

  const filteredUsers = applySortFilter(edition, getComparator(order, orderBy), props.edition||filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // console.log("test", edition)
  return (
      <Box> {/*    {
        field: "material",
        headerName: "Material",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },

  
    {
        field: "material_price",
        headerName: "Material Price",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      }, 
     {
        headerName: "Actions", field: "action", flex:1,
        renderCell: (params) => <div>
            <IconButton aria-label="delete" color="success" size="large" onClick={() => updateVendor(params.id)}>
  <EditIcon fontSize="small" />
</IconButton>
            
<IconButton aria-label="delete" color="error" size="large" onClick={() => deleteVendor(params.id)}>
  <DeleteIcon fontSize="small" />
</IconButton>
          
        
        </div>
        
      },*/}
     
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
         
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>
 
        <Stack direction="row" >
       
       <Typography variant="h5" color="initial"><Box sx={{ fontWeight: 'bold', m: 1 }}>  Mapped Edition</Box></Typography>
        </Stack>
       <Box
        height="80vh"  fontWeight={10}
         sx={{ 
           "& .MuiDataGrid-root": {
             border: "none", 
           },
           '& .super-app-theme--cell': {
            //backgroundColor: 'primary',
            color: '#1a3e72',
            fontWeight: '600',
          },
           "& .MuiDataGrid-cell": {
             borderBottom: "none",
           },
           "& .name-column--cell": {
          
           },
           "& .MuiDataGrid-columnHeaders": {
            
            borderBottom:"1px solid grey",
 
            fontWeight: "bold !important"
 
           },
           "& .MuiDataGrid-virtualScroller": {
             
           },
           "& .MuiDataGrid-footerContainer": {
           
            
           },
        
         }}
     
         
       > {/* <Stack direction="row" justifyContent="end" >
   
               <Button variant="contained" href="/bomat" color="success" sx={{fontWeight:"bold"}} >Add Items</Button>
        </Stack>*/}
   
    
     
         <DataGrid  
         showQuickFilter
           rows={edition}
           columns={columns}
           getRowId={(row) => row.id}
           components={{ Toolbar: GridToolbar ,color:"secondary", }}
           componentsProps={{
             toolbar: {
               showQuickFilter: true,
               quickFilterProps: { debounceMs: 500 },color:"secondary"
             },
         }}
         />
              
         </Box>
   
      </Box>
  );
} 

export default EditionTable;