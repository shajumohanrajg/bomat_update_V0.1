import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DateRangeIcon from "@mui/icons-material/DateRange";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box, Breadcrumbs, Button, Link, Modal, Stack, Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { createBrowserHistory } from "history";
import { SnackbarProvider, useSnackbar } from "notistack";
import React from "react";
import Page from "../../components/Page";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ROrders = (props) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/dashboard/homepage">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Release Orders
    </Typography>,
  ];
  const { enqueueSnackbar } = useSnackbar();
  const history = createBrowserHistory();
  // const [vendorData, setVendorData] = React.useState([]);
  const [roData, setRoData] = React.useState([]);
  const [pubData, setPubData] = React.useState([]);
  const [editionData, setEditionData] = React.useState([]);
  //const [modaldata, setmodaldata] = React.useState([]);
  // React.useEffect((id) => {
  //   console.log("fetched");
  //   fetch("https://poorvikadashboard.herokuapp.com/api/v1/vendor")
  //     .then((data) => {
  //       data.json()
  //       console.log(data)
  //       setVendorData(data)
  //     })
  // },[poData]);
  const [modeldata, setModeldata] = React.useState([
    {id:'',}
  ]);

  const showDetail = (id) => {
    axios
      .get(`http://10.8.1.170:4545/api/v1/ro_list/${id}`,{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     }}).then(response => response.json())
      .then((response) => {
        console.log(response)
        const modeldata = response.data;
        setModeldata(modeldata);
        setOpen(true);
        console.log("rolist", response);
        //enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        //setTimeout(() => {
        // window.location.reload();
        //}, 1000);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "id",
      valueFormatter: ({ value }) => 'RO' + value,
      headerName: "ID",
      cellClassName: "super-app-theme--cell",
      headerClassName: "super-app-theme--header",
      flex: 0.7,
      // cellClassName: "name-column--cell",
    },

    {
      field: "Add_type",
      valueFormatter: ({ value }) => value,
      headerName: "Type",

      headerClassName: "super-app-theme--header",
      flex: 0.7,
      // cellClassName: "name-column--cell",
    },
    {
      field: "ro_date",
      valueFormatter: ({ value }) => value,
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Size",
      valueFormatter: ({ value }) => value,
      headerName: "Size",

      headerClassName: "super-app-theme--header",
      flex: 0.7,
      // cellClassName: "name-column--cell",
    },
    {
      field: "color",
      headerName: "Color",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },

    {
      field: "gross_amount",
      headerName: "Gross Amount",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "gst",
      headerName: "GST",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "gst_amount",
      headerName: "GST Amount",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "net_amunt",
      headerName: "Net Amount",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
 
  ];
  React.useEffect(() => {
    // console.log("fetched");
    axios.get("http://10.8.1.170:4545/api/v1/ro_list").then((res) => {
      // console.log(res.data)
      setRoData(res.data);
    });
  }, []);
  React.useEffect(() => {
    // console.log("fetched");
    axios.get("http://10.8.1.170:4545/api/v1/ro_Pub_date_list").then((res) => {
      // console.log(res.data)
      setPubData(res.data);
    });
  }, []);

  React.useEffect(() => {
    // console.log("fetched");
    axios.get("http://10.8.1.170:4545/api/v1/ro_edition_list").then((res) => {
      // console.log(res.data)
      setEditionData(res.data);
    });
  }, []);

  const deleteVendor = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios
        .delete(`http://10.8.1.170:4545/api/v1/ro/${id}`)
        .then(() => {
          enqueueSnackbar("Successfully deleted", {
            variant: "success",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };

  const updateVendor = (id) => {
    //console.log(id)

    history.push(`/dashboard/ro/update/${id}`);
    window.location.reload();
  };

  return (
    <Page title="Poorvika | Release Order">
      <Box sx={{ boxShadow: 20, padding: 5 }}>
        <Stack direction="row">
          {/* {
        headerName: "Actions", field: "action", flex:1,
        renderCell: (id) => <div>
            <IconButton aria-label="edit" color="success" size="large" onClick={(e)=>showDetail(id)} >
  <ViewIcon fontSize="small" />
</IconButton>
            
<IconButton aria-label="delete" color="error" size="large" onClick={() => deleteVendor(id)}>
  <DeleteIcon fontSize="small" />
</IconButton>
          
        
        </div>
        
      },*/}

          <Typography variant="h5" color="initial">
            <Box sx={{ fontWeight: "bold", m: 1 }}>Release Orders Table </Box>
          </Typography>
        </Stack>
        <Breadcrumbs
          sx={{ m: 1 }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>{" "}
        <Box
          height="80vh"
          fontWeight={10}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .super-app-theme--cell": {
              //backgroundColor: 'primary',
              color: "#1a3e72",
              fontWeight: "600",
            },
            "& .name-column--cell": {},
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid grey",

              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-virtualScroller": {},
            "& .MuiDataGrid-footerContainer": {},
          }}
        >
          {" "}
          <Stack direction="row" justifyContent="end">
            <Button
              variant="contained"
              color="primary"
              href="release_orders/add"
            >
              Create Release Order
            </Button>
          </Stack>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={style}>
              {" "}
              {modeldata.map((item) => (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  key={item.id}
                >
                  <Typography variant="h4">
                    Release Order RO{item.id} Details
                  </Typography>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <DateRangeIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Releaser Order Date"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.ro_date}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <BookmarkBorderIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Releaser Order Type"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.Add_type}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AspectRatioIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Size"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.Size}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <ColorLensIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Color"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.color}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))}
            </Box>
          </Modal>
          <DataGrid
            showQuickFilter
            rows={roData}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar, color: "secondary" }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                color: "secondary",
              },
            }}
          />
        </Box>
      </Box>
      {/*
      <div className="navigation_purchase">
        <Typography variant="h4">Release Orders</Typography>
        <Button variant="contained" color="primary" href="release_orders/add">
          Create Release Order
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {roData.map((r)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ width:1, borderRadius: 5, minHeight: '25vh', m:'2vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {r.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                RoDate: {r.ro_date}
                </Typography>
                <Typography>
                Add Type: {r.Add_type}
                </Typography>
                <Typography>
                Size: {r.Size}
                </Typography>
                <Typography>
                Color: {r.color}
                </Typography>
                <Typography>
                Vendor Name: {r.vendor.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Pub Date
                  </Typography>
                {
                pubData.map((p)=>
                  r.id===p.ro.id ?
                  <div>
                  <Typography color="text.secondary">
                  {p.pub_date}
                  </Typography>
                  </div> : null
                  )
                }
                {
                editionData.map((e)=>
                  r.id===e.ro.id ?
                  <div>
                  <Typography variant="h5" component="div">
                  Edition
                  </Typography>
                  <Typography color="text.secondary">
                  {e.edition.edition}
                  </Typography>
                  </div> : null
                  )
                }
                <Typography>
                Gross Amount: {r.gross_amount}
                </Typography>
                <Typography>
                GST: {r.gst}%
                </Typography>
                <Typography>
                Net Amount: {r.net_amunt}
                </Typography>
                <Typography>
                Billing Address: {r.billing_address.name},{r.billing_address.state}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(r.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(r.id)} size="small">Delete</Button>
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
      <ROrders />
    </SnackbarProvider>
  );
}
