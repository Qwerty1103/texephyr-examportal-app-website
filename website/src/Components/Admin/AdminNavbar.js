import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div style={{fontFamily: "Chakra Petch", backgroundColor: "black", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center"}} >
      <nav className="navbar navbar-expand-lg bg-*">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link " style={{color: "white", padding: "20px"}} aria-current="page" to="/admin/home">
                Home
              </Link>
              <Link className="nav-link" style={{color: "white", padding: "20px"}} to="/admin/about">
                About Us
              </Link>
              <Link className="nav-link" style={{color: "white", padding: "20px"}} to="/admin/contact">
                Contact Us
              </Link>
              <Link className="nav-link" style={{color: "white", padding: "20px"}} to="/admin/events">       
                Events
              </Link>
              <Link className="nav-link" style={{color: "white", padding: "20px"}} to="/admin/stats">       
                Statistics
              </Link>
              <Link className="nav-link" style={{color: "white", padding: "20px"}} to="/admin/logout">       
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
