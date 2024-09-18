import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar
import NavbarComponent from './NavbarComponent'; // Import NavbarComponent

function SidebarLayout() {
  return (
    <div className="container-fluid vh-100">
      {/* Navbar */}
      <NavbarComponent /> {/* Reusable NavbarComponent */}
      
      <div className="row h-100">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="col-9 p-4">
          <Outlet /> {/* This renders the matched route's component */}
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
