import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // if not logged in, go to login
    } else if (user.menus && user.menus.length > 0) {
      // redirect to first allowed menu
      navigate(user.menus[0].path || "/unauthorized");
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5 text-center">
      <h2> {user?.fullName || "Guest"} </h2>
      <p>Redirecting you to your dashboard...</p>
    </div>
  );
}
