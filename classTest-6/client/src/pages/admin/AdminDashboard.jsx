import { useEffect } from "react";
import UserTable from "../../components/admin/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { allEmployeeSlice, resetEmployeePasswordByAdminSlice, updateEmployeeStatusSlice } from "../../redux/slice/employeeSlice";
import { Loader } from 'lucide-react';
import toast from "react-hot-toast";

const AdminDashboard = () => {

  const dispatch = useDispatch();

  const { isEmployeeLoading, employeeData, hasEmployeeError } = useSelector(state => state.employee);

  useEffect(() => {
    dispatch(allEmployeeSlice())
      .then(res => {
        // console.log('Response for fetching all employee', res);
      })
  }, [dispatch]);

  const handleStatusChange = (id) => {
    dispatch(updateEmployeeStatusSlice(id))
      .then(res => {
        // console.log('Response for updating status', res);

        if (res?.meta?.requestStatus === "fulfilled") {
          toast.success("Status changes successfully");
        }
        else {
          toast.error("Something went wrong");
        }
        dispatch(allEmployeeSlice())
      })
  };

  const handleChangePassword = (id) => {
    dispatch(resetEmployeePasswordByAdminSlice(id))
      .then(res => {
        // console.log('Response for updating status', res);

        if (res?.meta?.requestStatus === "fulfilled") {
          toast.success("Password changes mail sent successfully");
        }
        else {
          toast.error("Something went wrong");
        }
        dispatch(allEmployeeSlice())
      })
  };

  return (
    <>
      {isEmployeeLoading ?
        <Loader className="inline w-full my-12 mx-auto text-white animate-spin w-12 h-12" />
        : (employeeData?.data?.length > 0 ? (
          <UserTable
            users={employeeData?.data} onStatusChange={handleStatusChange} onPasswordChange={handleChangePassword} />
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No employee available
          </p>
        ))}
    </>
  );
};

export default AdminDashboard;