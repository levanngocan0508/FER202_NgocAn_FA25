import React from "react";
import "../App.css";

export default function Header() {
  return (
    <header className="header bg-fpt text-white">
      <div className="container d-flex justify-content-between align-items-center py-2">
        
        {/* Logo + tên trường */}
        <div className="d-flex align-items-center">
          <img
            src="/images/fpt-logo.png"
            alt="FPT Logo"
            className="header-logo me-2"
          />
         
        </div>

        {/* Menu có icon */}
        <nav className="nav-links d-flex align-items-center">
          <a href="#home"><i className="bi bi-house-door me-1"></i>Trang chủ</a>
          <a href="#major"><i className="bi bi-info-circle me-1"></i>Ngành học</a>
          <a href="#admission"><i className="bi bi-people me-1"></i>Tuyển sinh</a>
          <a href="#students"><i className="bi bi-list me-1"></i>Sinh viên</a>
        </nav>

        {/* Search box */}
        <div className="search-box d-flex align-items-center">
          <label className="me-2 mb-0">Search:</label>
          <input type="text" className="form-control form-control-sm" />
        </div>
      </div>
    </header>
  );
}
