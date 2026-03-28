import { useEffect, useState } from "react";
import ProfileCard from "../../components/employees/ProfileCard";
import ChangePasswordModal from "../../components/employees/ChangePasswordModal";
import UpdateProfileModal from "../../components/employees/UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getProfileSlice, updateEmployeeSlice } from "../../redux/slice/employeeSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const EmployeeDashboard = () => {

    const dispatch = useDispatch(),
        { isEmployeeLoading, employeeData } = useSelector(state => state?.employee);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    useEffect(() => {
        dispatch(getProfileSlice())
            .then(res => {
                // console.log('Response for fetching profile', res);
            })
    }, [dispatch]);

    const updateData = (data) => {

        dispatch(updateEmployeeSlice(data))
            .then(res => {
                // console.log('Response for updating profile', res);

                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(getProfileSlice());
                    toast.success("Profile updated successfully");
                }
                else {
                    Swal.fire({
                        title: "Oops!",
                        text: res?.payload?.message || "Invalid credentials",
                        icon: "info",
                    });
                }
            })
            .catch(err => {
                console.log('Error occured', err);
            })
    };

    return (
        <div className="flex items-center justify-center w-full h-[500px]">

            <ProfileCard
                user={employeeData?.data}
                onEdit={() => setShowProfileModal(true)}
                onChangePassword={() => setShowPasswordModal(true)}
            />

            <ChangePasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />

            <UpdateProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                user={employeeData?.data}
                onUpdate={updateData}
            />
        </div>
    );
};

export default EmployeeDashboard;