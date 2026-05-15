import { NavLink } from "react-router-dom";

export default function Navbar() {
    return <div className="flex gap-4 p-4 bg-gray-200">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/contact-us">Contact Us</NavLink>
      <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/client-home">Client Home</NavLink>
        <NavLink to="/client-requests">Client Requests</NavLink>
  </div>;
}
