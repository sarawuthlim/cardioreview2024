import React, { useEffect, useState } from "react";
import { fetchDataFromFirebase, getComanyById } from "./util";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

function CompanyRegister() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { companyId } = useParams();
  const company = getComanyById(companyId);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
        {company.name}
        {company.product && ` - ${company.product}`}
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        ลงทะเบียน
      </Typography>
    </>
  );
}

export default CompanyRegister;
