import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfileSlice, resetEmployeePasswordBySelfSlice } from "../../redux/slice/employeeSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ChangePasswordModal = ({ isOpen, onClose }) => {

    const dispatch = useDispatch(),
        { isEmployeeLoading, employeeData } = useSelector(state => state?.employee);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const submitHandler = (data) => {
        // console.log("Password Change:", data);

        dispatch(resetEmployeePasswordBySelfSlice(data))
            .then(res => {
                // console.log('Response for updating password', res);

                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(getProfileSlice());
                    toast.success("Password updated successfully");
                    reset();
                    onClose();
                }
                else {
                    Swal.fire({
                        title: "Oops!",
                        text: res?.payload?.message || "Invalid credentials",
                        icon: "info",
                    });
                }
            });
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#020617] border border-blue-500/30 rounded-xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold text-blue-400 mb-4">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

                    {/* Old Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Old Password"
                            {...register("oldPassword", {
                                required: "Old password is required",
                            })}
                            className="w-full px-4 py-2 bg-[#020617] border border-blue-500/40 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="New Password"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            className="w-full px-4 py-2 bg-[#020617] border border-blue-500/40 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.newPassword && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded font-semibold cursor-pointer"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;