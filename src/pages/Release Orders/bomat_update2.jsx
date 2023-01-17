import {
    Box,
    Button,
    Divider,
    MenuItem,
    Grid,
    Stack,
    TextField,
    Container,
    Typography,
    InputAdornment,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
  import React, { useEffect, useState } from "react";
  import Page from "../../components/Page";
  import Axios from "axios";
  import { SnackbarProvider,useSnackbar } from 'notistack';
  import { createBrowserHistory } from "history";
  import PercentIcon from "@mui/icons-material/Percent";
  
  const IAdd = () => {
  
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const history= createBrowserHistory();
    const [itemList, setItemList] = useState({items: [
      {
      material_type:'',
      material_price:'',
      material:'',
     
      }
    ]
    });
    const [senderRef, setSenderRef] = useState('');
   
    const [vendors, setVendors] =useState([]);
  
    
  
    const [idofvendor,setIdofvendor]=useState(0);
   
  
  
  
  
  
    const [vendorValue,setVendorValue]=useState('');
  
  
   
  
  
   
    useEffect(()=>{
      vendors.map((v) =>(
        vendorValue===v.name?
        setIdofvendor(v.id):null
      ))
    },[vendorValue, vendors])
  

    
    useEffect(()=>{
      Axios.get('http://10.8.1.170:4545/api/v1/list',{
      }).then((response) => {
            // console.log("vendor",response.data);
            const vendors=response.data;
            setVendors(vendors);
          }, (error) => {
            console.log(error);
        });
      },[])
   
    const handleUpdate= async(e)=>{
      e.preventDefault();
      Axios.put(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`,{
        vendor: idofvendor,
        
        items: itemList.items,
       
    }).then((response) => {
          console.log(response);
          enqueueSnackbar('Update Purchase Order', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          //history.push("/dashboard/po")
          setTimeout(() => {
            window.location.reload();
          }, 1000);     
        }, (error) => {
          enqueueSnackbar('Check the data and try again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          console.log(error);
      });
    }
  
  
  
 
  
  const handleItemChange=(e)=>{
    const newdata={...itemList}
    newdata[e.target.id]=e.target.value
    setItemList(newdata)
  }
  

  
    return (
      <Page title="Poorvika | Purchase Order | Add">
        <Container maxWidth="xl">
          <Box
            component="form"
            sx={{ paddingRight: 5, paddingLeft: 5 }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2}>
              <Typography sx={{ paddingTop: 5, paddingBottom: 5 }} variant="h4">
                Update Purchase Order
              </Typography>
              <Typography variant="h6">Vendor</Typography>
              <TextField
                id="vendor"
                label="Vendor"
                select
                value={vendorValue}
                onChange={(e)=>setVendorValue(e.target.value)}
                helperText="Please select vendor"
                variant="outlined"
              >
                {vendors.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
  
  
  
  
  
  
            
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
              <Typography variant="h6">Items</Typography>
              {itemList.items.map((items,index) => (
              <div key={index} className="item-list">
                <Grid container spacing={2} sx={{ pr: 5 }}>
                  <Grid item xs={6} md={6} xl={4}>
                
                  </Grid>
                
                  <Grid item xs={6} md={6} xl={4}><TextField
                    fullWidth
                    id="material"
                    name="material"
                    label="GST Amount"
                    type="text"
                    variant="outlined"
                    value={items.material}
                    
                  /></Grid>
                  <Grid item xs={6} md={6} xl={4}><TextField
                    fullWidth
                    id="material_price"
                    name="material_price"
                    label="Gross Amount"
                    type="number"
                    variant="outlined"
                    value={items.material_price}
                    
                  /></Grid>
                
                </Grid>
            
              </div>
              ))}
           
              <Typography variant="h6">Branches</Typography>
            
              <br />
              <Divider />
              <br />
          
            </Stack>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" size="large" onClick={handleUpdate} sx={{ maxWidth: 0.5 }}>
                UPDATE
              </Button>
            </Box>
          </Box>
        </Container>
      </Page>
    );
  };
  
  
  export default function IntegrationNotistack() {
    return (
      <SnackbarProvider maxSnack={5}>
        <IAdd />
      </SnackbarProvider>
    );
  }
  