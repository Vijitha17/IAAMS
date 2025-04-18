import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./pages/login/Login";
import Layout from './components/Layout';
import './App.css';

// College components
import Collegelist from './pages/college/Collegelist';
import CreateCollege from './pages/college/CreateCollege';

// Department components
import DepartmentList from './pages/department/Departmentlist';
import CreateDepartment from './pages/department/CreateDepartment';

// User components
import CreateUsers from './pages/user/CreateUsers'; 
import UserList from './pages/user/UserList';
import ManageUsers from './pages/user/ManageUsers';
import EditUser from './pages/user/EditUser'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes with Layout */}
        <Route path="/home" element={<Layout />}>
          {/* User Management Routes */}
          <Route path="dashboard/user/list" element={<UserList />} />
          <Route path="dashboard/user/create" element={<CreateUsers />} />
          <Route path="dashboard/user/manage" element={<ManageUsers />} />
          <Route path="dashboard/user/edit/:id" element={<EditUser />} />
          
          {/* College routes */}
          <Route path="dashboard/user/college" element={<Collegelist />} />
          <Route path="dashboard/user/college/createcollege" element={<CreateCollege />} />
          
          {/* Department routes */}
          <Route path="dashboard/user/department" element={<DepartmentList />} />
          <Route path="dashboard/user/department/createdepartment" element={<CreateDepartment />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;