import React from 'react';
import SideNav from './sideBar';
import { Outlet } from 'react-router-dom'; // Outlet to render child routes

function Layout() {
  return (
    <div className="flex">
      <SideNav /> {/* The sidebar is always visible */}
      <div className="main-content flex-1 p-4 overflow-auto">
        {' '}
        {/* Main content area */}
        <Outlet /> {/* Renders the matching child route */}
      </div>
    </div>
  );
}

export default Layout;
