import React, { useEffect, useState } from "react";
import { companyList, fetchDataFromFirebase } from "./util";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function CompanyView() {
  const [data, setData] = useState();
  const [companies, setCompanies] = useState();
  const [companyData, setCompanyData] = useState();

  // fetch data from firebase
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchDataFromFirebase();
        setData(response);
        // get companyList
        setCompanies(companyList);
        console.log("CompanyList fetched:", companyList);
        // generate new array
        const compData = companyList.map((company) => {
          return {
            ...company,
            // count number of sponsor
            sponsorCount: response.filter(
              (item) =>
                item.sponsor == company.id && item.applyType == "sponsor"
            ).length,
            // count number of overQuota
            overQuotaCount: response.filter(
              (item) =>
                item.sponsor == company.id && item.applyType == "overQuota"
            ).length,
          };
        });
        setCompanyData(compData);
        console.log("CompanyData fetched:", compData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Companies and Registrations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quota</TableCell>
              <TableCell>Sponsor Count</TableCell>
              <TableCell>Over Quota Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.product || "-"}</TableCell>
                <TableCell>{row.quota}</TableCell>
                <TableCell
                  sx={{
                    color: row.sponsorCount === row.quota ? "green" : "red",
                    fontWeight: "bold", // Optional for emphasis
                  }}
                >
                  {row.sponsorCount}
                </TableCell>
                <TableCell>{row.overQuotaCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CompanyView;
