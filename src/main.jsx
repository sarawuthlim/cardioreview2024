import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home.jsx";
import Company from "./Company.jsx";
import CompanyHome from "./CompanyHome.jsx";
import CompanyRegister from "./CompanyRegister.jsx";

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
    path: "/companyregister/:companyId",
    element: <CompanyRegister />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
