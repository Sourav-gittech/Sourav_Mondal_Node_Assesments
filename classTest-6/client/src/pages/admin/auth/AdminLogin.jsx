import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminLoginSlice } from "../../../redux/slice/auth/adminAuthSlice";

const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAdminAuthLoading } = useSelector(state => state.adminAuth);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        dispatch(adminLoginSlice(data))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    sessionStorage.setItem("auth-token", res?.payload?.token);
                    toast.success("Logged in successfully");
                    navigate("dashboard");
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="w-full max-w-md bg-[#020617] border border-blue-500/30 rounded-xl shadow-xl p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-blue-400 mb-2">
                    Admin Login
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Sign in to your admin dashboard
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
                            className="w-full px-4 py-2 rounded-md bg-[#020617] border border-blue-500/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-md bg-[#020617] border border-blue-500/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isAdminAuthLoading}
                        className="w-full py-2 rounded-md font-semibold bg-green-500 hover:bg-green-600 text-black transition duration-200 disabled:opacity-50 cursor-pointer"
                    >
                        {isAdminAuthLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Authorized access only
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;