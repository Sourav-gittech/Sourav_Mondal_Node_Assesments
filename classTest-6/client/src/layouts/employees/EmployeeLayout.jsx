import { Outlet, useNavigate } from "react-router-dom";
import EmployeeNavbar from "./Navbar";
import EmployeeFooter from "./Footer";
import toast from "react-hot-toast";

const EmployeeLayout = () => {

    const navigate = useNavigate();

    const onLogout = () => {
        sessionStorage.removeItem('auth-token');
        navigate('/');
        toast.success("Log out successfully");
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col">
            <EmployeeNavbar onLogout={onLogout} />

            <main className="flex-1 p-6">
                <Outlet />
            </main>

            <EmployeeFooter />
        </div>
    );
};

export default EmployeeLayout;