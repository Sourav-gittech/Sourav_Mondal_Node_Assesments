import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageManagers from "../pages/admin/ManageManagers";
import ManageEmployees from "../pages/admin/ManageEmployees";
import Products from "../pages/admin/Products";
import Profile from "../pages/admin/Profile";
import AdminLogin from "../pages/admin/auth/AdminLogin";

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin/" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="managers" element={<ManageManagers />} />
                    <Route path="employees" element={<ManageEmployees />} />
                    <Route path="products" element={<Products />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routing;