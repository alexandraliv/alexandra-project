import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./store/Context";

import { BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar/Navbar.jsx";
import FooterWithSocialMediaIcons from "./components/Footer/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ResponsiveAppBar />
        <App />
        <FooterWithSocialMediaIcons />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
