// src/App.js
import React, { useState } from "react";
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
  const [quickSearch, setQuickSearch] = useState("");
  const [quickYearRange, setQuickYearRange] = useState("all");
  const [quickSortBy, setQuickSortBy] = useState("year-asc");

  return (
    <>
      <AppNavbar
        onQuickSearch={setQuickSearch}
        onQuickFilters={(yr, sb) => {
          setQuickYearRange(yr);
          setQuickSortBy(sb);
        }}
      />

      <div id="home">
        <HomePage
          externalSearch={quickSearch}
          externalYearRange={quickYearRange}
          externalSortBy={quickSortBy}
        />
      </div>

      <div id="about">
        <AboutPage />
      </div>

      <div id="contact">
        <ContactPage />
      </div>

      <div id="account">
        <AccountPage />
      </div>

      <FooterPage />
      <AppToaster />
    </>
  );
}
