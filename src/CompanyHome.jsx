import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComanyById } from "./util";
import { Button, Card, Grid, Typography } from "@mui/material";

import { fetchDataFromFirebase, filterDataByCompany } from "./util";

function CompanyHome() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sponsorCount, setSponsorCount] = useState(0);
  const [overQuotaCount, setOverQuotaCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        const dataByCompany = filterDataByCompany(data, companyId);
        setData(dataByCompany);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const { companyId } = useParams();
  const company = getComanyById(companyId);
  return (
    <>
      <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
        {company.name}
        {company.product && ` - ${company.product}`}
      </Typography>

      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ minWidth: 270, maxWidth: 700, padding: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            โควตาลงทะเบียน: {company.quota}
          </Typography>
          <Typography variant="ิbody1">
            ลงทะเบียนแล้ว: {company.quota}
          </Typography>
        </Card>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, mb: 2 }}
      >
        <Card sx={{ minWidth: 270, maxWidth: 700, padding: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            รายชื่อผู้ลงทะเบียนแล้ว
          </Typography>
          <hr />
        </Card>
      </Grid>

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
        <Button size="large" variant="contained" fullWidth>
          ลงทะเบียนตามโควตา
        </Button>
      </Grid>
    </>
  );
}

export default CompanyHome;
