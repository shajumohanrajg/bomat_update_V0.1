import { Button, Card, CardActions, CardContent, Grid, Typography,Stack,Box,IconButton } from "@mui/material";
import React from "react";
import Page from "../../components/Page";
import axios from "axios";
import {createBrowserHistory} from 'history';
import { SnackbarProvider,useSnackbar } from 'notistack';
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Branches = (props) => {

  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  const url="http://10.8.1.170:4545/api/v1/branches";
  const [branchData,setBranchData]= React.useState([]);
  const columns = [
   
    {
      field: "name",
      valueFormatter: ({value}) => value,
      headerName: "Branch Name",
     
      headerClassName: 'super-app-theme--header',
      flex: 0.9,
      // cellClassName: "name-column--cell",

    },
    {
      field: "phone",
      valueFormatter: ({value}) => value.name,
      headerName: "Phone",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "email",
        headerName: "Email",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },

  
    {
        field: "GST_number",
        headerName: "GST No",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },
      {
        field: "city" ,
        headerName: "City",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      }, 
      {
        field: "state",
        headerName: "State",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },  
     {/* {
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
  useEffect(()=> {
    axios.get(url)
    .then((res) => setBranchData(res.data));
      // console.log("v",vendorData);
    }, []);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
      axios.delete(`${url}/${id}`).then(()=> {
          // console.log("deleted",res)
          enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
      })
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/branches/update/${id}`)
    window.location.reload();
  }
  
  return (
  
      <Page title="Poorvika | Branches">
         <Box sx={{boxShadow:20,padding:5,}}>
      <Stack direction="row" >
       
       <Typography variant="h5" color="initial"><Box sx={{ fontWeight: 'bold', m: 1 }}>Branches Table</Box></Typography>
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
     <Button
            href="/dashboard/branches/add"
            variant="contained"
            color="primary"
          >
            Add Branch
          </Button>
              
               </Stack>
   
    
     
         <DataGrid  
         showQuickFilter
           rows={branchData}
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
              
         </Box></Box>
      {/*  <div className="branches_head">
          <Typography variant="h4">Branches</Typography>
          <br />
          <Button
            href="/dashboard/branches/add"
            variant="contained"
            color="primary"
          >
            Add Branch
          </Button>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {branchData.map((b)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ maxWidth:1, borderRadius: 5, minHeight: '25vh', m:'1vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {b.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                {b.name}
                </Typography>
                <Typography color="text.secondary">
                {b.phone}
                </Typography>
                <Typography color="text.secondary">
                {b.GST_number}
                </Typography>
                <Typography sx={{ mb:1.5}} color="text.secondary">
                {b.email}
                </Typography>
                <Typography>
                  Address
                </Typography>
                <Typography noWrap variant="body2" color="text.secondary">
                {b.address1},{b.address2},{b.city},{b.state},{b.country}-{b.pincode}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(b.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(b.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid> */}
      </Page>
   
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Branches />
    </SnackbarProvider>
  );
}
