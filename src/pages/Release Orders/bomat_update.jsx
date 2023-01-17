import React, { useRef } from "react";
//import Page from "../../components/Page";
import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
  Autocomplete,
  MenuItem,
  InputLabel,
  Avatar,
  Chip,
} from "@mui/material";
import { Select, Option } from "@mui/joy";

import Axios from "axios";
import { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
//import AsyncSelect from 'react-select/async';
//import Select from 'react-select';
import OutlinedInput from "@mui/material/OutlinedInput";
//import SelectCategory from './SelectCategory';
//import { useForm, Controller } from "react-hook-form";

const MatUpdate = (props) => {
  let { id } = useParams();

  //const { control } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const history = createBrowserHistory();

  const [vendors, setVendors] = useState([]);

  const [idofvendor, setIdofvendor] = useState("");

  const [vendorValue, setVendorValue] = useState("");

  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const [matData, setMatData] = useState([
    {
      material_type: "125",
      material: "",
      material_price: "",
    },
  ]);
  useEffect(() => {
    Axios.get('http://10.8.1.170:4545/api/v1/bill_of_meterial/')
      .then(res => setOptions(res.data))
      .catch(err => console.log(err));
  }, []);
  const url = "http://10.8.1.170:4545/api/v1/bill_of_meterial/";
  useEffect(() => {
    // const id=props.match.params.id
    Axios.get(url + id)
      .then((res) => {
        // console.log(res.data)
        setMatData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  React.useEffect(() => {
    vendors.map((v) => (vendorValue === v.name ? setIdofvendor(v.id) : null));
  }, [vendorValue, vendors]);

  useEffect(() => {
    Axios.get("http://10.8.1.170:4545/api/v1/material_type", {}).then(
      (response) => {
        //console.log("vendor",response.data);
        const vendors = response.data;
        setVendors(vendors);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleUpdate = (e) => {
   
    e.preventDefault();
    // const id= props.match.params.id
    Axios.put(url + id, matData).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          //history.push("/bomat_table")

          enqueueSnackbar("Succesfully Updated", {
            variant: "success",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          });
          //setTimeout(() => {
          // window.location.reload();
          //  }, 1000);
        }
      },
      (error) => {
        enqueueSnackbar("Check Data and Try Again", {
          variant: "Error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        console.log(error);
      }
    );
  };
  const inputRef = useRef(null);
  const handleChange = (e) => {
    const newdata = { ...matData };
    newdata[e.target.id] = e.target.value;
   
    setMatData(newdata);
    
  };
  return (
    <Container maxWidth="xl">
      <Box
        component="form"
        sx={{ paddingRight: 3, paddingLeft: 3 }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={5}>
          <Typography sx={{ paddingTop: 3, paddingLeft: 3 }} variant="h4">
            Update Material Code Data {id}
          </Typography>
          <Grid container spacing={3} sx={{ pr: 5 }}>
            <Grid item xs={12} md={12} xl={12}>
              {/*   <select
            disabled={false}
            value={vendorValue}
            onChange={(e) => setSelected(e.currentTarget.value)}
        ><option >{matData.material_type}</option>
            {vendors.map((item) => (
            <option key={item._id} value={item.id}>
                {item.id}
            </option>
            ))}
        </select>
       
        <AsyncSelect
    cacheOptions
    defaultOptions={colourOptions}
    loadOptions={promiseOptions}
  />   
            <Autocomplete
       
       id="material_type"
      
       options={vendors}
       getOptionLabel={(option) => option.name.toString()}
       onChange={(e)=>setVendorValue(e.target.value)}
       renderInput={params => (
         <TextField
           {...params}
           value={vendorValue}
           label="Search options"
           variant="outlined"
         />
       )}
     />
         <Select
          labelId="clearable-select-label"
          label={score.length ? "Score": ""}
          id="clearable-select"
          value={score}
          onChange={handleChange}
          displayEmpty
          sx={{"& .MuiSelect-iconOutlined": {display: score? 'none': ''}, "&.Mui-focused .MuiIconButton-root": {color: 'primary.main'}}}
          renderValue={(value) => value ? value : <em>Nothing Selected</em>}
          endAdornment={<IconButton sx={{visibility: score? "visible": "hidden"}} onClick={handleClearClick}><ClearIcon/></IconButton>}
        >
          {scoreData.map((scoreValue) => {
            return <MenuItem value={scoreValue}>{scoreValue}</MenuItem>
          })}
        </Select>

        <select    value={vendorValue}
                    
                    onChange={(e)=>setVendorValue(e.target.value)}> <option>{matData.material_type}</option>
                   {vendors.map((option) => { return <option value={option.name}  >
                   {option.name}
                    </option>})}
                   
                </select>
                <input list="data" onChange={(e)=>setVendorValue(e.target.value)}  value={vendorValue} placeholder="Search" />
            <datalist id="data">
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
                <option>Four</option>  <option>{matData.material_type}</option>
                {vendors.map((op)=><option>{op.name}</option>)}
            </datalist>
        
         <TextField
                    fullWidth
                    id=""
                    label="Material Type"
                    select
                    value={vendorValue}
                   
                    onChange={(e)=>setVendorValue(e.target.value)}
                    variant="outlined"
                  >
                   {vendors.map((option) => {
            return <option value={option.name}>{option.name}</option>
          })}
                  
                    </TextField> 
                   
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="material_type"
                 
                  value={vendorValue}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />*/}
            </Grid>
        {vendorValue}
            <TextField
              id="material_type"
              label="material_type"
              select
              value={vendorValue}
              onChange={(e) => setVendorValue(e.target.value)}
              helperText="Please select vendor"
              variant="outlined"
            >
              {vendors.map((option, _index) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <Grid item xs={12} md={6} xl={6}>
              <TextField
                fullWidth
                value={matData.material_type}
                id="material_type"
                onChange={(e) => handleChange(e)}
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6} xl={6}>
              <TextField
                fullWidth
                id="material"
                value={matData.material}
                onChange={(e) => handleChange(e)}
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <TextField
                fullWidth
                id="material_price"
                type="number"
                value={matData.material_price}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={2} md={6} xl={6}></Grid>
          </Grid>
        </Stack>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleUpdate}
          sx={{
            maxWidth: 0.5,
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "green",
          }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <MatUpdate />
    </SnackbarProvider>
  );
}
