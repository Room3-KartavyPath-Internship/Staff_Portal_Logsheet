import { Routes, Route } from "react-router-dom"; 
import "./App.css";

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
import Home from "./pages/Home";


import BatchCycleList from "./pages/BatchCycle/BatchCycleList";
import AddBatchCycle from "./pages/BatchCycle/AddBatchCycle"; 
import EditBatchCycle from "./pages/BatchCycle/EditBatchCycle";
import Premises from "./pages/Premises";
import CourseType from "./pages/CourseType"
import TopicList from "./pages/Topic/TopicList";
import AddTopic from "./pages/Topic/AddTopic";
import Modules from "./pages/Modules";
import GroupMaster from "./pages/GroupMaster";
import CourseProgressReport from "./pages/CourseProgressReport";
import CourseCoordinator from "./pages/CourseCoordinator";
import LogsheetType from "./pages/LogsheetTypePage";
import Logsheet from "./pages/Logsheet";
import VerifyLogsheet from "./pages/VerifyLogsheet";
import ApproveLogsheet from "./pages/ApproveLogsheet"



import RolePermissions from "./pages/RolePermissions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <SubjectsProvider>
        <Navbar />
        <div className="container">
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            

            <Route element={<PrivateRoute requiredPath="/dashboard" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>


            <Route element={<PrivateRoute requiredPath="/batch-cycles" />}>
              <Route path="/batch-cycles" element={<BatchCycleList />} />
             <Route path="/batch-cycles/add" element={<AddBatchCycle />} />
             <Route path="/batch-cycles/edit/:id" element={<EditBatchCycle />} />
            </Route>

            
             <Route element={<PrivateRoute requiredPath="api/premises" />}>
              <Route path="api/premises" element={<Premises />} />
             </Route> 

             
             <Route element={<PrivateRoute requiredPath="api/course-types" />}>
              <Route path="api/course-types" element={<CourseType />} />
             </Route> 

              <Route element={<PrivateRoute requiredPath="/modules" />}>
              <Route path="/modules" element={<Modules />} />
             </Route> 


             
              <Route element={<PrivateRoute requiredPath="/groups" />}>
              <Route path="/groups" element={<GroupMaster />} />
             </Route>


              <Route element={<PrivateRoute requiredPath="/reports/course-progress/:courseName" />}>
              <Route path="/reports/course-progress/:courseName" element={<CourseProgressReport />} />
             </Route>  
             

             
              <Route element={<PrivateRoute requiredPath="/course-coordinator" />}>
              <Route path="/course-coordinator" element={<CourseCoordinator />} />
             </Route> 


             
              <Route element={<PrivateRoute requiredPath="/logsheet-types" />}>
              <Route path="/logsheet-types" element={<LogsheetType />} />
             </Route>



             <Route element={<PrivateRoute requiredPath="/logsheets" />}>
              <Route path="/logsheets" element={<Logsheet />} />
              <Route path="/logsheets/verify" element={<VerifyLogsheet />} />
              <Route path="/logsheets/approve" element={<ApproveLogsheet />} />
             </Route>


            <Route element={<PrivateRoute requiredPath="/subjects" />}>
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

            
            
            <Route element={<PrivateRoute requiredPath="/topics" />}>
             <Route path="/topics" element={<TopicList />} />
            <Route path="/topics/add" element={<AddTopic />} />
            <Route path="/topics/edit/:id" element={<AddTopic />} />
            </Route>


            <Route element={<PrivateRoute requiredPath="/roles" />}>
            <Route path="/roles" element={<RolePermissions />} />
            </Route>
          </Routes>
        </div>

        <ToastContainer position="top-right" autoClose={2000}/>
      </SubjectsProvider>
    </AuthProvider>
  );
}

export default App;
