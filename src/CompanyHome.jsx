import React, { useEffect, useState, forwardRef } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";

import {
  fetchDataFromFirebase,
  filterByOverQuota,
  filterBySponsor,
  getComanyById,
} from "./util";
import { useSnackbar } from "notistack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SimpleSpinner from "./SimpleSpinner";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyHome() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sponsorCount, setSponsorCount] = useState(0);
  const [overQuotaCount, setOverQuotaCount] = useState(0);
  const [registeredNameList, setRegisteredNameList] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        setData(data);
        setSponsorCount(filterBySponsor(data, companyId).length);
        setOverQuotaCount(filterByOverQuota(data, companyId).length);
        // sort registeredNameList by timestamp
        const registeredNameList = data
          .filter((item) => item.sponsor == companyId)
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((item) => item.name);
        setRegisteredNameList(registeredNameList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const { message, status } = location.state || {};
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (message) {
      setOpenSnackbar(true);
      enqueueSnackbar(message);
      // set timeout to clear the state
      setTimeout(() => {
        navigate(location.pathname, { state: {} });
        handleCloseSnackbar();
      }, 3000);
    }
  }, [enqueueSnackbar, message, status, location.state]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { companyId } = useParams();
  const company = getComanyById(companyId);
  return (
    <>
      <SimpleSpinner isLoading={isLoading} />
      <Box sx={{ flexGrow: 1, mt: 2 }} />
      <Box // Add another box to constrain the inner elements
        sx={{
          flexGrow: 1,
          maxWidth: 1000,
          minWidth: 270,
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
          {company.name}
          {company.product && ` - ${company.product}`}
        </Typography>

        <Grid container justifyContent="center" alignItems="center">
          <Card sx={{ minWidth: 270, maxWidth: 700, padding: 3, flexGrow: 1 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              โควตาลงทะเบียน: {company.quota}
            </Typography>
            <Typography variant="ิbody1" sx={{ display: "block" }}>
              ลงทะเบียนตามโควตาแล้ว: {sponsorCount}
            </Typography>
            {overQuotaCount > 0 && (
              <Typography variant="ิbody1" sx={{ display: "block" }}>
                ลงทะเบียนเพิ่ม: {overQuotaCount}
              </Typography>
            )}
          </Card>
        </Grid>

        {registeredNameList.length > 0 && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Card
              sx={{ minWidth: 270, maxWidth: 700, padding: 3, flexGrow: 1 }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                รายชื่อผู้ลงทะเบียนแล้ว
              </Typography>
              <hr />
              <Box sx={{ textAlign: "left" }}>
                {registeredNameList.sort().map((name, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ display: "block" }}
                  >
                    {index + 1}. {name}
                  </Typography>
                ))}
              </Box>
            </Card>
          </Grid>
        )}

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
            maxWidth: 700,
            minWidth: 270,
            margin: "0 auto",
          }}
          spacing={0}
        >
          <Box sx={{ flexGrow: 1, mt: 2, width: { xs: "100%", sm: "auto" } }}>
            {sponsorCount >= company.quota ? (
              <Button size="large" variant="contained" fullWidth disabled>
                ลงทะเบียนครบตามโควต้าแล้ว
              </Button>
            ) : (
              <Link to={`/companyregister/${companyId}/sponsor`}>
                <Button size="large" variant="contained" fullWidth>
                  ลงทะเบียนตามโควตา
                </Button>
              </Link>
            )}
          </Box>
        </Grid>

        {sponsorCount >= company.quota && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              flexGrow: 1,
              maxWidth: 700,
              minWidth: 270,
              margin: "0 auto",
            }}
            spacing={0}
          >
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <Link to={`/companyregister/${companyId}/overQuota`}>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  fullWidth
                >
                  <Stack spacing={0.5}>
                    <Typography>ลงทะเบียนเพิ่ม</Typography>
                    <Typography variant="caption">
                      *** จ่ายค่าลงทะเบียนเพิ่มภายหลัง ***
                    </Typography>
                  </Stack>
                </Button>
              </Link>
            </Box>
          </Grid>
        )}

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
            maxWidth: 700,
            minWidth: 270,
            margin: "0 auto",
          }}
          spacing={0}
        >
          <Box sx={{ flexGrow: 1, mt: 3, width: { xs: "100%", sm: "auto" } }}>
            <Link to={`/company`}>
              <Button size="small" variant="outlined" fullWidth color="primary">
                กลับไปที่หน้าหลัก
              </Button>
            </Link>
          </Box>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={status}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CompanyHome;
