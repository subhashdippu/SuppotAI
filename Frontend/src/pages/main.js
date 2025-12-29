import React from "react";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
}

export default HomePage;
