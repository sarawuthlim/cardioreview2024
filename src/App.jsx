import { useState } from "react";
import "./App.css";
import ImageUploadForm from "./ImageUploadForm";
import SimpleSpinner from "./SimpleSpinner";
import DrawerAppBar from "./DrawerAppBar";

function App() {
  const [count, setCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loadingStatus) => {
    setIsLoading(loadingStatus);
  };

  return (
    <>
      <SimpleSpinner isLoading={isLoading} />
      <DrawerAppBar />
      <ImageUploadForm onLoadingChange={handleLoadingChange} />
    </>
  );
}

export default App;
