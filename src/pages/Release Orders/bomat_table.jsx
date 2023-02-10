import { Box,  Typography,IconButton,Modal} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
//import Modal from '@mui/material/Modal';
//import MatForm from "./MatForm"

import axios from "axios";
import { createBrowserHistory } from 'history';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ColorLensIcon from '@mui/icons-material/ColorLens';


const history = createBrowserHistory();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
   borderBottom:2,
   borderBottomColor: 'green',
    boxShadow: 25,
    borderTopLeftRadius: 50,
  
    borderBottomRadius: 8,
    p: 4,
  };

  
const Contacts = () => {
   
  //const {enqueueSnackbar} = useSnackbar();
  const [matList, setMatList] = useState([]);
  //const [matList1, setMatList1] = useState([]);

  const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

 
  const [modeldata,setModeldata] = React.useState([{
    id:'',
   
   }
   
  ])

 const showDetail = (id) => {
 
  axios.get(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`).then((response)=>{
    const modeldata = response.data;
    setModeldata(modeldata);
    setOpen(true);
      console.log("rolist",response)
      //enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      //setTimeout(() => {
       // window.location.reload();
      //}, 1000); 
    }).catch (err => console.log(err))
}

 
      const deleteVendor = (id) => {
        if(window.confirm("Are you sure you want to delete")){
        axios.delete(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`).then(()=>{
            
            // console.log("deleted",res)
            //enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
            setTimeout(() => {
              window.location.reload();
            }, 1000); 
          }).catch (err => console.log(err))
      }}

    
      const updateVendor = (id) => {
        // console.log(id) 
        history.push(`/bomat_update4/${id}`)
        window.location.reload();
        
      }
  
  const columns = [
   
    {
      field: "material_code",
      valueFormatter: ({value}) => value,
      headerName: "Material Code",
     
      headerClassName: 'super-app-theme--header',
      flex: 0.4,
      // cellClassName: "name-column--cell",

    },
    {
      field: "material_type",
      valueFormatter: ({value}) => value.name,
      headerName: "Material Type",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
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
        renderCell: (record) => <div>
            <IconButton aria-label="edit" color="success" size="large" onClick={(e)=>showDetail(record.id)} >
  <ViewIcon fontSize="small" />
</IconButton>
            
<IconButton aria-label="delete" color="error" size="large" onClick={() => deleteVendor(record.id)}>
  <DeleteIcon fontSize="small" />
</IconButton>
          
        
        </div>
        
      },
      {/*{
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
     
       
  
  
    
  ]
 

  useEffect(() => {
    fetch("http://10.8.1.170:4545/api/v1/list")
    .then((response) => response.json())
    .then((result) => setMatList(result))
    .catch((error) => console.log(error));
  }, []);

 
  return (
 <Box  
 sx={{boxShadow:20,padding:5,}}>
    <Stack direction="row" >
       
      <Typography variant="h5" color="initial"><Box sx={{ fontWeight: 'bold', m: 1 }}>Bill of Materials Table</Box></Typography>
       </Stack>
      <Box
       height="80vh"  fontWeight={10}
        sx={{ 
          "& .MuiDataGrid-root": {
            border: "none", 
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
    
        
      >  <Stack direction="row" justifyContent="end" >
  
              <Button variant="contained" href="/dashboard/bomat_add" color="success" sx={{fontWeight:"bold"}} >Add Items</Button>
              </Stack>
  
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      > 
      <Box sx={style}> {modeldata.map((item) => (
       
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={item.id}>
                <Typography variant="h4">Release Order RO{item.id} Details</Typography>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
               <DateRangeIcon   color="primary"/> 
              </ListItemAvatar>
              <ListItemText
                primary="Releaser Order Date"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    
                    </Typography>
                   
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
               <BookmarkBorderIcon  color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary="Releaser Order Type"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    
                    </Typography>
                   
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <AspectRatioIcon   color="primary"/>
              </ListItemAvatar>
              <ListItemText
                primary="Size"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    
                    </Typography>
                   
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
               <ColorLensIcon  color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary="Color"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    
                    </Typography>
                   
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" /></List>
         ))}
    </Box>

      </Modal>
    
        <DataGrid  
        showQuickFilter
          rows={matList}
          columns={columns}
          getRowId={(row) => row.material_code}
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
};

export default Contacts;