import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex gap-4 p-4 bg-gray-200">
      // Public
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <NavLink to="/contact-us">Contact Us</NavLink>
      // Client
      <NavLink to="/client-home">Client Home</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/client-requests">Client Requests</NavLink>
      <NavLink to="/client-profile">Client Profile</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      // Worker
      <NavLink to="/worker-dashboard">Worker Dashboard</NavLink>
      <NavLink to="/services">Services</NavLink>
      <NavLink to="/services-management">Services Management</NavLink>
      // Auth
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}
