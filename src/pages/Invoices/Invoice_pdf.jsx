import {
    Box,
    Button,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
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
  import Axios from "axios";
  import { SnackbarProvider, useSnackbar } from "notistack";
  //import PercentIcon from "@mui/icons-material/Percent";
  import { createBrowserHistory } from "history";
  
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
    const { enqueueSnackbar } = useSnackbar();
  
    const history = createBrowserHistory();
  
    const [material_price, setMaterial_price] = React.useState(0);
    const [material, setMaterial] = React.useState("");
    const [vendors, setVendors] = React.useState([]);
    const [idofvendor, setIdofvendor] = React.useState(0);
    const [vendorValue, setVendorValue] = React.useState("");
  
    React.useEffect(() => {
      Axios.get("http://10.8.1.170:4545/api/v1/material_type", {}).then(
        (response) => {
          // console.log("vendor",response.data);
          const vendors = response.data;
          setVendors(vendors);
        },
        (error) => {
          console.log(error);
        }
      );
    }, []);
  
  
  
    return (
      <Page title="Poorvika | Release Order">
        <Container maxWidth="xl">
          <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
            <Stack spacing={5}>
              <Typography sx={{ paddingTop: 5, paddingLeft: 3 }} variant="h4">
              Purchase Order
              </Typography>
              <Grid container spacing={3} sx={{ pr: 5 }}>
                <Grid item xs={12} md={12} xl={12}>
                <List>
          <ListItem disablePadding>
           
             
              <ListItemText primary="Inbox" />
           
          </ListItem>
          </List>
                </Grid>
  
                <Grid item xs={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    id="material"
                    label="Material"
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
  
                <Grid item xs={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    id="material_price"
                    label="Material Price"
                    type="number"
                    variant="outlined"
                    value={material_price}
                    onChange={(e) => setMaterial_price(e.target.value)}
                  />
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
  