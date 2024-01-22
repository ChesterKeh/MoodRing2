import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <NavLink to="/calendar">calendar</NavLink>/
        <NavLink to="/journal">journal</NavLink>
      </nav>
    </>
  );
}
