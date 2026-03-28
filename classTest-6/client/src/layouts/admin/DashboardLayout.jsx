import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddEmployeeModal from "../../components/admin/AddEmployeeModal";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerEmployeeSlice } from "../../redux/slice/auth/employeeAuthSlice";
import Swal from "sweetalert2";
import { allEmployeeSlice } from "../../redux/slice/employeeSlice";

const DashboardLayout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);

    const onAddEmployee = () => {
        setModalOpen(true);
    }

    const handleAddEmployee = (data) => {
        dispatch(registerEmployeeSlice(data))
            .then(res => {
                // console.log('Response for adding  employee', res);

                if (res.meta.requestStatus === "fulfilled") {
                    toast.success("Employee added successfully");
                        dispatch(allEmployeeSlice());
                } else {
                    Swal.fire({
                        title: "Oops!",
                        text: res?.payload?.message || "Invalid credentials",
                        icon: "info",
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text: err?.message || "Something went wrong",
                    icon: "error",
                });
            });
    };

    const onLogout = () => {
        sessionStorage.removeItem('auth-token');
        navigate('/admin');
        toast.success("Log out successfully");
    }

    return (
        <>
            <div className="min-h-screen bg-[#0f172a] flex flex-col">
                <Navbar onAddEmployee={onAddEmployee} onLogout={onLogout} />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>

                <Footer />
            </div>

            <AddEmployeeModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddEmployee}
            />
        </>
    );
};

export default DashboardLayout;