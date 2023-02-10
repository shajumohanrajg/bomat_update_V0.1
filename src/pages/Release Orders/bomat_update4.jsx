import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Container,
  Grid,
  Select,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";

// import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
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
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const history = createBrowserHistory();

  const [material_price, setMaterial_price] = React.useState(0);
  const [material, setMaterial] = React.useState("");
  const [material_type, setMaterial_type] = React.useState("");
  const [vendors, setVendors] = React.useState([]);
  const [idofvendor, setIdofvendor] = React.useState(0);
  const [vendorValue, setVendorValue] = React.useState("");
  const [vendorValue1, setVendorValue1] = React.useState("");
  const [matData, setMatData] = React.useState([
    {
      material_type: "",
      material: "",
      material_price: "",
    },
  ]);

  const url = "http://10.8.1.170:4545/api/v1/bill_of_meterial/";
  useEffect(() => {
    // const id=props.match.params.id
    Axios.get(url + id)
      .then((res) => {
        // console.log(res.data)
        const matData = res.data;
        setMatData(matData);
      })
      .catch((err) => console.error(err));
  }, [id]);

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
  const handleChange = (e) => {
    const newdata = { ...matData };
    newdata[e.target.id] = e.target.value;

    setMatData(newdata);
  };
  React.useEffect(() => {
    vendors.map((v) => (vendorValue === v.name ? setIdofvendor(v.id) : null));
  }, [vendorValue, vendors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`, {
      material_type: idofvendor,
      material: matData.material,
      material_price: matData.material_price,
    }).then(
      (response) => {
        enqueueSnackbar("Data Entry Successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        console.log(response);
       history.push("/dashboard/bomat_table1");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        enqueueSnackbar("Please fill all fields", {
          variant: "Error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        console.log(error);
      }
    );
  };

  return (
    <Page title="Poorvika | Release Order">
      <Container maxWidth="xl">
        <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
          <Stack spacing={5}>
            <Typography
              sx={{ paddingTop: 5, paddingLeft: 3 }}
              variant="h4"
            ></Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              {/*  <Grid item xs={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    id="material"
                   
                    type="text"
                    value={'Material Type -'+matData.material_type}
                    disabled
                    variant="outlined"
                  />     <TextField
                  fullWidth
                  id="material_type"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  select
                defaultValue="choose"
                  value={vendorValue}
                  onChange={(e) => setVendorValue(e.target.value)}
                  variant="outlined"
                ><MenuItem value="">
                <em>{matData.material_type}</em>
              </MenuItem>
                 <MenuItem id="choose" disabled>{matData.material_type}</MenuItem>
                  {vendors.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                     {option.id} - {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                  </Grid>      <Autocomplete
        value={vendorValue}
        id="material_type"
        freeSolo
        
        options={vendors}
        getOptionLabel={(option) => option.name}
    
        onChange={(e) => setVendorValue(e.target.value)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />*/}
            
              <Grid item xs={12} md={12} xl={12}>
         
                <InputLabel htmlFor="material_type">Material Type</InputLabel>
                <TextField
                
                  fullWidth
                  value={vendorValue}
                  id="material_type"
                 select
                  onChange={(e) => setVendorValue(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    <em>Material Type - {matData.material_type}</em>
                  </MenuItem>
                  {vendors.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.id} - {option.name}
                    </MenuItem>
                  ))}
                </TextField>
               
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <InputLabel htmlFor="material_type">Material</InputLabel>
                <TextField
                  fullWidth
                  id="material_type"
                  type="text"
                  value={matData.material_type}
                  onChange={(e) => handleChange(e)}
                  variant="outlined" disabled
                />
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <InputLabel htmlFor="material">Material</InputLabel>
                <TextField
                  fullWidth
                  id="material"
                  type="text"
                  value={matData.material}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <InputLabel htmlFor="material_type">Material Price</InputLabel>
                <TextField
                  fullWidth
                  id="material_price"
                  type="number"
                  variant="outlined"
                  value={matData.material_price}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ maxWidth: 0.5 }}
          >
            Submit
          </Button>
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
