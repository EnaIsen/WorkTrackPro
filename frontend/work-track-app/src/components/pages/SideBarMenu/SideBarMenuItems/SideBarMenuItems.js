import React from "react";
import { Link } from "react-router-dom";

const SidebarMenuItems = ({ to, icon, label, onClick }) => (
  <Link to={to} className="menu_item" onClick={onClick}>
    {to ? (
      <div className="sidebar_links">
        {icon} <span>{label}</span>
      </div>
    ) : (
      <>
        {icon} <span>{label}</span>
      </>
    )}
  </Link>
);

export default SidebarMenuItems;
