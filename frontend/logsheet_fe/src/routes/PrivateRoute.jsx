import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ requiredPath }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "Admin") {
    return <Outlet />;
  }

    const hasAccess = user.menus?.some((menu) =>
    location.pathname === menu.path || location.pathname.startsWith(menu.path)
  );
  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
