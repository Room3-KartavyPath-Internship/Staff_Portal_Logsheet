import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export default function Navbar() {
  const { user, setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (!user) return null;

 
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const fullMenu = [
    {
      title: "Course Management",
      subMenu: [
        { title: "Batch Cycle", path: "/batch-cycles" },
        { title: "Premises", path: "api/premises" },
        { title: "Course Types", path: "api/course-types" },
        { title: "Course", path: "/courses" },
      ],
    },
    {
      title: "Course Module Management",
      subMenu: [
        { title: "Subject", path: "/subjects" },
        { title: "Section", path: "/sections" },
        { title: "Topic", path: "/topics" },
        { title: "Module", path: "/modules" },
      ],
    },
    {
      title: "Course Group Management",
      subMenu: [{ title: "Group", path: "/groups" }],
    },
    {
      title: "Report Management",
      subMenu: [
        { title: "Course Progress Report", path: "/reports/course-progress/:courseName" },
      ],
    },
    {
      title: "User Management",
      subMenu: [
        { title: "Role", path: "/roles" },
        { title: "Staff", path: "/staffs" },
      ],
    },
    {
      title: "Course Administration",
      subMenu: [{ title: "Assign Course-Coordinator", path: "/course-coordinator" }],
    },
    {
      title: "LogSheet Management",
      subMenu: [
        { title: "Log Sheet Types", path: "/logsheet-types" },
        { title: "Log", path: "/logsheets" },
        { title: "Verify Logs", path: "/logsheets/verify" },
        { title: "Approve Logs", path: "/logsheets/approve" },
      ],
    },
  ];

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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
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
                <ul className="dropdown-menu shadow-sm">
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

          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1"></i>
                {user.name}
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userDropdown">
                <li>
                  <span className="dropdown-item-text">
                    <strong>Role:</strong> {user.role}
                  </span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
