import { Routes, Route } from "react-router-dom"; // no BrowserRouter here
import { SubjectsProvider } from "./contexts/SubjectsContext";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import SubjectPage from "./pages/SubjectPage";
import SectionPage from "./pages/SectionPage";
import StaffList from "./pages/StaffList";
import StaffForm from "./pages/StaffForm";
import CourseList from "./pages/CourseList";
import CourseForm from "./pages/CourseForm";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";
import BatchCycleList from "./pages/BatchCycle/BatchCycleList";
import AddBatchCycle from "./pages/BatchCycle/AddBatchCycle"; 
import EditBatchCycle from "./pages/BatchCycle/EditBatchCycle";
import TopicList from "./pages/Topic/TopicList";
import AddTopic from "./pages/Topic/AddTopic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <SubjectsProvider>
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute requiredPath="/dashboard" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<PrivateRoute requiredPath="/" />}>
              <Route path="/subjects" element={<SubjectPage />} />
            </Route>

            <Route element={<PrivateRoute requiredPath="/sections" />}>
              <Route path="/sections" element={<SectionPage />} />
            </Route>

            <Route element={<PrivateRoute requiredPath="/staffs" />}>
              <Route path="/staffs" element={<StaffList />} />
              <Route path="/add-staff" element={<StaffForm />} />
              <Route path="/edit-staff/:id" element={<StaffForm />} />
            </Route>

            <Route element={<PrivateRoute requiredPath="/courses" />}>
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/add" element={<CourseForm />} />
              <Route path="/courses/edit/:id" element={<CourseForm />} />
            </Route>

            <Route element={<PrivateRoute requiredPath="/batch-cycles" />}>
              <Route path="/batch-cycles" element={<BatchCycleList />} />
             <Route path="/batch-cycles/add" element={<AddBatchCycle />} />
             <Route path="/batch-cycles/edit/:id" element={<EditBatchCycle />} />
            </Route>

            
            <Route element={<PrivateRoute requiredPath="/topics-list" />}>
             <Route path="/topics-list" element={<TopicList />} />
            <Route path="/topics/add" element={<AddTopic />} />
            <Route path="/topics/edit/:id" element={<AddTopic />} />
            </Route>
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </SubjectsProvider>
    </AuthProvider>
  );
}

export default App;
