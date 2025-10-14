// src/App.js
import React, { useState } from "react";

// CSS Bootstrap & Icons (import 1 lần cho toàn app)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AppNavbar from "./components/Nav/AppNavbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";       
import ContactPage from "./pages/ContactPage";   
import AccountPage from "./pages/AccountPage";
import FooterPage from "./pages/FooterPage";
import AppToaster from "./components/Toast/AppToaster";

export default function App() {
  // Đồng bộ Quick search (NavBar) -> Filter (Home)
  const [quickSearch, setQuickSearch] = useState("");

  return (
    <>
      <AppNavbar onQuickSearch={setQuickSearch} />

      {/* Anchor cho href="#home" */}
      <div id="home">
        <HomePage externalSearch={quickSearch} />
      </div>



      {/* Anchor cho href="#account" */}
      <div id="account">
        <AccountPage />
      </div>
      {/* Anchor cho href="#about" */}
      <div id="about">
        <AboutPage />
      </div>

      {/* Anchor cho href="#contact" */}
      <div id="contact">
        <ContactPage />
      </div>

      <FooterPage />
      <AppToaster />
    </>
  );
}
