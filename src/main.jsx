import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home.jsx";
import Company from "./Company.jsx";
import CompanyHome from "./CompanyHome.jsx";
import CompanyRegister from "./CompanyRegister.jsx";
import SuccessSelfRegister from "./SuccessSelfRegister.jsx";
import Check from "./Check.jsx";
import Footer from "./Footer.jsx";
import { Box } from "@mui/material";
import Agenda from "./Agenda.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <App />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/company/:companyId",
    element: <CompanyHome />,
  },
  {
    path: "/companyregister/:companyId/:typeRegister",
    element: <CompanyRegister />,
  },
  {
    path: "/success",
    element: <SuccessSelfRegister />,
  },
  {
    path: "/check",
    element: <Check />,
  },
  {
    path: "agenda",
    element: <Agenda />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 3,
          paddingRight: 3,
          maxWidth: 1024,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <RouterProvider router={router} />
      </Box>

      <Box sx={{ height: 25 }} />

      <Footer />
    </Box>
  </React.StrictMode>
);
