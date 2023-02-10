import { Button, Card, CardActions, CardContent, Grid, Typography,Stack,Box,IconButton,Breadcrumbs,Link } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import React from "react";
import Page from "../../components/Page";
import axios from "axios";
import {createBrowserHistory} from 'history';
import { SnackbarProvider,useSnackbar } from 'notistack';
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Vendors = (props) => {

  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  const url="http://10.8.1.170:4545/api/v1/vendor";
  const [vendorData,setVendorData]= React.useState([]);

  useEffect(()=> {
    axios.get(url)
    .then((res) => setVendorData(res.data));
      // console.log("v",vendorData);
    }, []);



  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
      axios.delete(`${url}/${id}`).then(()=> {
          // console.log("deleted",res)
          enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          setTimeout(() => {
            window.location.reload(false)
          },1000);
      })
  }}
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/dashboard/homepage">
      Home
    </Link>
,
    <Typography key="3" color="text.primary">
      Vendors
    </Typography>,
  ];
  const columns = [
   
    {
      field: "Supplier_code",
      valueFormatter: ({value}) => 'V' + value,
      headerName: "Vendor Code",
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      flex: 0.7,
      // cellClassName: "name-column--cell",

    },
    {
      field: "name",
      valueFormatter: ({value}) => value.name,
      headerName: "Vendor Name",
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
        field: "phone",
        headerName: "Phone",
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

     
       
  
  
    
  ]
  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/vendors/update/${id}`)
    window.location.reload();
  }
  
  return (
   
      <Page title="Poorvika | Vendors">
      <Box sx={{boxShadow:20,padding:5,}}>
      <Stack direction="row" >
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
        
      }, */}
       <Typography variant="h5" color="initial"><Box sx={{ fontWeight: 'bold', m: 1 }}>Vendors Table</Box></Typography>
        </Stack>  <Breadcrumbs sx={{  m: 1 }} 
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>  <Box
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
          '& .super-app-theme--cell': {
            //backgroundColor: 'primary',
            color: '#1a3e72',
            fontWeight: '600',
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
            href="/dashboard/vendors/add"
            variant="contained"
            color="primary"
          >
            Add Vendor
          </Button>
              
              </Stack>
  
   
    
        <DataGrid  
        showQuickFilter
          rows={vendorData}
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
      {/*  <div className="vendors_head">

          <Typography variant="h4">Vendors</Typography>
          <br />
          <Button
            href="/dashboard/vendors/add"
            variant="contained"
            color="primary"
          >
            Add Vendor
          </Button>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {vendorData.map((v)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ maxWidth:1, borderRadius: 5, minHeight: '25vh', m:'1vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {v.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                {v.name}
                </Typography>
                <Typography color="text.secondary">
                {v.phone}
                </Typography>
                <Typography sx={{ mb:1.5}} color="text.secondary">
                {v.email}
                </Typography>
                <Typography>
                  Address
                </Typography>
                <Typography noWrap variant="body2" color="text.secondary">
                {v.address1},{v.address2},{v.city},{v.state},{v.country}-{v.zipcode}
                </Typography>
                <Typography sx={{ mt:1.5 , textAlign:'center'}}>
                Contact Person
                </Typography>
                <Typography color="text.secondary">
                {v.contact_person}
                </Typography>
                <Typography>
                Contact Reference
                </Typography>
                <Typography color="text.secondary">
                {v.contact_reference}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(v.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(v.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>*/}
      </Page>
       
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Vendors />
    </SnackbarProvider>
  );
}
