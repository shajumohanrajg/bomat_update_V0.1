import { Button, Card, CardActions, CardContent, Grid, Typography,Stack,Box,IconButton } from "@mui/material";
import { SnackbarProvider,useSnackbar } from "notistack";
import React from "react";
import {createBrowserHistory} from 'history';
import axios from "axios";
import Page from "../../components/Page";
import ViewIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Pdf from "react-to-pdf";
import { PDFViewer } from '@react-pdf/renderer';
//import MyDocument from "./purchase_order_pdf";
//import ReactPDF from '@react-pdf/renderer';
//ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
const Orders = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  // const [vendorData, setVendorData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [poData, setPoData] = React.useState([]);
  const ref = React.createRef();
  React.useEffect(()=>{
    axios.get("http://10.8.1.170:4545/api/v1/items_list").then((res)=>{
      // console.log(res.data)
      setItems(res.data)
    });
  }, []);

  React.useEffect(() => {
    // console.log("fetched");
    axios.get("http://10.8.1.170:4545/api/v1/po_list").then((res) => {
      // console.log(res.data)
      setPoData(res.data)
    });
  }, []);
  
  const columns = [
   
    {
      field: "vendor",
      valueFormatter: ({value}) => value.name,
      headerName: "Vendor Name",
     
      headerClassName: 'super-app-theme--header',
      flex: 0.7,
      // cellClassName: "name-column--cell",

    },
    {
      field: "sender_reference",
      valueFormatter: ({value}) => value.name,
      headerName: "Ref",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "branches",
      valueFormatter: ({value}) => value.name,
      headerName: "Branch Name",
     
      headerClassName: 'super-app-theme--header',
      flex: 0.7,
      // cellClassName: "name-column--cell",

    },
    {
        field: "gst_amount",
        headerName: "Gst Amount",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },

  
    {
        field: "net_amount",
        headerName: "Net Amount",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      }, 
     {/* {
        headerName: "Actions", field: "action", flex:1,
        renderCell: (params) => <div>
            <IconButton aria-label="delete" color="success" size="large" onClick={() => updateVendor(params.id)}>
  <ViewIcon fontSize="small" />
</IconButton>
            
<IconButton aria-label="delete" color="error" size="large" onClick={() => deleteVendor(params.id)}>
  <DeleteIcon fontSize="small" />
</IconButton>
          
        
        </div>
        
      },*/}
     
       
  
  
    
  ]
  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
    axios.delete(`http://10.8.1.170:4545/api/v1/po/${id}`).then(()=>{
        // console.log("deleted",res)
        enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }).catch (err => console.log(err))
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/purchase_order_pdf/${id}`)
    window.location.reload();
  }

  // console.log("Check", items);
  return (
    <Page title="Poorvika | Purchase Order">
      <Box sx={{boxShadow:20,padding:5,}}>
         <Stack direction="row" >
      {/* <Pdf targetRef={ref} filename="code-example.pdf">
      {({ toPdf }) => <Button onClick={toPdf}>Generate Pdf</Button>}
  </Pdf>*/}
  
  
       <Typography variant="h5" color="initial"><Box  sx={{ fontWeight: 'bold', m: 1 }}>Purchase Orders Table</Box></Typography>
        </Stack>  <Box ref={ref}
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
    
        
      > <Stack direction="row" justifyContent="end" >
   <Button variant="contained" color="primary" href="po/add">
          Add Purchase Order
        </Button>
              
              </Stack>
  
   
    
        <DataGrid  
        showQuickFilter
          rows={poData}
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
      {/*<div className="navigation_purchase">
   
        <Typography variant="h4">Purchase Orders</Typography>
        <Button variant="contained" color="primary" href="po/add">
          Add Purchase Order
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {poData.map((p)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card
              elevation={3}
              sx={{ width:1, borderRadius: 5, minHeight: '25vh', m:'2vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {p.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                Vendor Name: {p.vendor.name} 
                </Typography>
                <Typography>
                  {p.title}
                </Typography>
                {
                  items.map((i)=>
                  p.id===i.Purchase_order.id ?
                  <div>
                  <Typography variant="h5" component="div">
                  Items
                  </Typography>
                  <Typography color="text.secondary">
                  Title: {i.title}
                  </Typography>
                  <Typography color="text.secondary">
                  Price: {i.unit_price}
                  </Typography>
                  <Typography color="text.secondary">
                  Quantity: {i.quantity}
                  </Typography>
                  <Typography color="text.secondary">
                  GST: {i.gst}%
                  </Typography>
                  <Typography color="text.secondary">
                  Net Amount: {i.net_amount}
                  </Typography>
                  </div> : null
                  )
                }
                <Typography sx={{ mt:1.5 , textAlign:'center'}}>
                Sender Reference: {p.sender_reference}
                </Typography>
                <Typography>
                GST Amount: {p.gst_amount}
                </Typography>
                <Typography>
                Gross Amount: {p.net_amount}
                </Typography>
                <Typography>
                Branch: {p.branches.name},{p.branches.state}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(p.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(p.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
              </div>*/}

    </Page>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Orders />
    </SnackbarProvider>
  );
}

