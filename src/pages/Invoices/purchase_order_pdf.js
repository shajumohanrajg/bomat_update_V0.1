import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,List,ListItem,ListItemText
} from "@mui/material";

// import { styled } from "@mui/material/styles";
import React from "react";
//import AdapterDateFns from "@mui/lab/AdapterDateFns";
//import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import PickersDay from "@mui/lab/PickersDay";
//import startOfDay from "date-fns/startOfDay";
//import DatePicker from "@mui/lab/DatePicker";
import Page from "../../components/Page";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import Paper from '@mui/material/Paper';
import Axios from "axios";
import { experimentalStyled as styled } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from "notistack";
//import PercentIcon from "@mui/icons-material/Percent";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";

// const CustomPickersDay = styled(PickersDay, {
//   shouldForwardProp: (prop) => prop !== "selected"
// })(({ theme, selected }) => ({
//   ...(selected && {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     "&:hover, &:focus": {
//       backgroundColor: theme.palette.primary.dark
//     },
//     borderTopLeftRadius: "50%",
//     borderBottomLeftRadius: "50%",
//     borderTopRightRadius: "50%",
//     borderBottomRightRadius: "50%"
//   })
// }));

const RAdd = () => {
  const {id} = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const { enqueueSnackbar } = useSnackbar();

  const history = createBrowserHistory();

  const [material_price, setMaterial_price] = React.useState(0);
  const [material, setMaterial] = React.useState("");
  const [vendors, setVendors] = React.useState([]);
  const [idofvendor, setIdofvendor] = React.useState(0);
  const [vendorValue, setVendorValue] = React.useState("");



const url = "http://10.8.1.170:4545/api/v1/po/";
React.useEffect(() => {
  // const id=props.match.params.id
  Axios.get(url + id)
    .then((res) => {
      // console.log(res.data)
      const vendors = res.data;
      setVendors(vendors);
    })
    .catch((err) => console.error(err));
}, [id]);

  return (
    <Page title="Poorvika | Release Order">
      <Container maxWidth="xl">
        <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="spanning table">
        <TableHead>
         
          <TableRow>
            
            <TableCell align="right">Sr</TableCell>
            <TableCell align="right">Product Description</TableCell>
            <TableCell align="right">Part No</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow >
              
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="left"></TableCell>
             
            </TableRow>
          

            <TableRow>
            <TableCell rowSpan={6}></TableCell>
            <TableCell rowSpan={6}></TableCell>
            <TableCell rowSpan={6}></TableCell>
            <TableCell rowSpan={6}></TableCell>
            <TableCell>Subtotal</TableCell>
          
          </TableRow>
   
          <TableRow>
            
           
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
          <Stack spacing={5}>
            <Typography sx={{ paddingTop: 5, paddingLeft: 3 }} variant="h4" textAlign="center">
            Purchase Order
            </Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}  justifyContent="center"
  alignItems="center">
              <Grid item xs={6} md={6} xl={6}>
              <List>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="" >{vendors.gst_amount }</ListItemText> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary={vendors.address2} /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary={vendors.zipcode} /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary={vendors.city} /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        </List>
              </Grid>
              <Grid item xs={2} md={2} xl={2} sx={{}} >
              <List>
        <ListItem disablePadding>
        <ListItemText  primary="Date: 24-12-2022" /> 
        </ListItem>
       
        </List>
              </Grid>

              <Grid item xs={12} md={12} xl={12}>
              <Typography sx={{ paddingTop: 5, paddingLeft: 3 }} variant="body2" >
            Subject:Work Order For Residential Digital Screen Campaign Of Poorvika Mobiles
            </Typography>
              </Grid>
           
              <Grid item xs={12} md={12} xl={12}>
              <List>
        <ListItem disablePadding>
        <ListItemText primary="Billing To" /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        <ListItem disablePadding>
        <ListItemText primary="To" /> 
        </ListItem>
        </List>
              </Grid>
              <Grid item xs={2} sm={3} md={3} >
      
        <Typography variant="body2">Corporate Office</Typography>
        <Typography variant="subtitle2">Poorvika Mobile Pvt Ltd</Typography>
        <Typography variant="caption">No.32,AGR Plaina,Developed Plot NP,</Typography>
        <Typography variant="caption">Beside Flyover,Ekkatuthangal</Typography>
        <Typography variant="caption">Chennai-600 032</Typography>
       
      
    </Grid>
    <Grid item xs={2} sm={3} md={3} >
      <Typography variant="body2">Regd Office</Typography>
      <Typography  variant="subtitle2">Poorvika Mobile Pvt Ltd</Typography>
        <Typography variant="caption">No.30,Arcot Road,Kodambakkam,</Typography>
        <Typography variant="caption">Chennai-600 024</Typography>
      
    </Grid>
    <Grid item xs={2} sm={3} md={3} >
   <Typography variant="body2">U52100TN2009PTC070845</Typography>
     
        <Typography  variant="caption">www.poorvikamobile.com</Typography>
       
    </Grid>
    <Grid item xs={2} sm={3} md={3} >
     
      <Typography  variant="subtitle2">044 - 43 66 66 66</Typography>
       
    </Grid>
   
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          
        </Box>
      </Container>
    </Page>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <RAdd />
    </SnackbarProvider>
  );
}
