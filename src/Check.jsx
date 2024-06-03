import { useState } from "react";
import "./App.css";
import SimpleSpinner from "./SimpleSpinner";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DrawerAppBar from "./DrawerAppBar";
import CheckContent from "./CheckContent";
import { Typography } from "@mui/material";

function Check() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loadingStatus) => {
    setIsLoading(loadingStatus);
  };

  return (
    <>
      <DrawerAppBar />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <SimpleSpinner isLoading={isLoading} />
          <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
            ตรวจสอบผลการลงทะเบียน
          </Typography>
          <CheckContent onLoadingChange={handleLoadingChange} />
        </CardContent>
      </Card>
    </>
  );
}

export default Check;
