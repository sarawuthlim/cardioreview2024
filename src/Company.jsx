import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React from "react";

import { companyList } from "./util";
import { Link } from "react-router-dom";

function Company() {
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 2 }} />
      <Typography variant="h4">เลือก ชื่อบริษัท/Product</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        เพื่อลงทะเบียน
      </Typography>

      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ minWidth: 275, maxWidth: 600, padding: 3 }}>
          {/* sort companyList by quata desc and the by name before map */}
          {companyList
            .sort((a, b) => b.quota - a.quota || a.name.localeCompare(b.name))
            .map((item) => (
              <Link key={item.id} to={`/company/${item.id}`}>
                <Button
                  key={item.id}
                  variant="contained"
                  color={
                    item.quota == 15
                      ? "primary"
                      : item.quota == 10
                      ? "secondary"
                      : "warning"
                  }
                  size="large"
                  fullWidth={true}
                  sx={{ m: 1 }}
                >
                  {item.name}
                  {item.product && ` (${item.product})`}
                </Button>
              </Link>
            ))}
        </Card>
      </Grid>
    </>
  );
}

export default Company;
