import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ requiredPath }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (user.role === "Admin") {
    // Admin has access to all pages
    return <Outlet />;
  }

  // Check if user has permission for the required path
  const hasAccess = user.menus?.some((menu) => menu.path === requiredPath);

  if (hasAccess) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default PrivateRoute;
