import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/auth/AdminLogin";
import DashboardLayout from "../layouts/admin/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import EmployeeLogin from "../pages/users/auth/EmployeeLogin";
import EmployeeLayout from "../layouts/employees/EmployeeLayout";
import EmployeeDashboard from "../pages/users/EmployeeDashboard";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/" element={<EmployeeLogin />} />

        <Route path="/" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default Routing;