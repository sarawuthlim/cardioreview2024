import { useState } from "react";
import "./App.css";
import ImageUploadForm from "./ImageUploadForm";
import SimpleSpinner from "./SimpleSpinner";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "./DrawerAppBar";

function App() {
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
          <ImageUploadForm onLoadingChange={handleLoadingChange} />
        </CardContent>
      </Card>
    </>
  );
}

export default App;
