/*import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // clear user from context
    localStorage.removeItem("user"); // optional: clear from storage if you persist
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Logsheet
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user &&
              user.menus &&
              user.menus.map((menu, idx) => (
                <li key={idx} className="nav-item">
                  <Link className="nav-link" to={menu.path}>
                    {menu.name}
                  </Link>
                </li>
              ))}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;*/
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null; // no navbar if not logged in

  // Full menu structure
  const fullMenu = [
    {
      title: "Course Management",
      subMenu: [
        { title: "Add Batch Cycle", path: "/batch-cycles" },
        { title: "Add Premises", path: "api/premises" },
        { title: "Add Course Types", path: "api/course-types" },
        { title: "Add Course", path: "/courses" },
      ],
    },
    {
      title: "Course Module Management",
      subMenu: [
        { title: "Add Subject", path: "/subjects" },
        { title: "Add Section", path: "/sections" },
        { title: "Add Topic", path: "/topics" },
        { title: "Add Module", path: "/modules" },
      ],
    },
    {
      title: "Course Group Management",
      subMenu: [
        { title: "Add Group", path: "/groups" }
        // { title: "Add Course Group", path: "/course-groups" },
      ],
    },
    {
      title: "Report Management",
      subMenu: [
        // { title: "Module Progress Report", path: "/module-report" },
        { title: "Course Progress Report", path: "/reports/course-progress/:courseName" },
      ],
    },
    {
      title: "User Management",
      subMenu: [
        // { title: "Add Menu Items", path: "/menu-items" },
        { title: "Add Role", path: "/roles" },
        { title: "Add Staff", path: "/staffs" },
      ],
    },
    {
      title: "Course Administration",
      subMenu: [
        { title: "Assign Course-Coordinator", path: "/course-coordinator" },
      ],
    },
    {
      title: "LogSheet Management",
      subMenu: [
        { title: "Add Log Sheet Types", path: "/logsheet-types" },
        { title: "Add Log", path: "/logsheets" },
        { title: "Verify Logs", path: "/verify-logs" },
        { title: "Approve Logs", path: "/approve-logs" },
      ],
    },
  ];

  // Filter menu based on user's allowed paths (for staff)
  const menuToRender =
    user.role === "Admin"
      ? fullMenu
      : fullMenu
          .map((menu) => {
            const allowedSubMenu = menu.subMenu.filter((sub) =>
              user.menus?.some((m) => m.path === sub.path)
            );
            if (allowedSubMenu.length > 0) return { ...menu, subMenu: allowedSubMenu };
            return null;
          })
          .filter(Boolean);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Logsheet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuToRender.map((menu) => (
              <li className="nav-item dropdown" key={menu.title}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {menu.title}
                </a>
                <ul className="dropdown-menu">
                  {menu.subMenu.map((sub) => (
                    <li key={sub.path}>
                      <Link className="dropdown-item" to={sub.path}>
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link">Hello, {user.name}</span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

