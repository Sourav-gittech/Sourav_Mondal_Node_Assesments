import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginEmployeeSlice } from "../../../redux/slice/auth/employeeAuthSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const EmployeeLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isEmployeeAuthLoading } = useSelector(state => state.employeeAuth);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // console.log("Employee Login:", data);

        dispatch(loginEmployeeSlice(data))
            .then((res) => {
                // console.log('Response for employee login', res);

                if (res.meta.requestStatus === "fulfilled") {
                    sessionStorage.setItem("auth-token", res?.payload?.token);
                    toast.success("Logged in successfully");
                    navigate("/dashboard");
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
                    Employee Login
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Sign in to your employee panel
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="employee@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email",
                                },
                            })}
                            className="w-full px-4 py-2 rounded-md bg-[#020617] border border-blue-500/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
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
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            className="w-full px-4 py-2 rounded-md bg-[#020617] border border-blue-500/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md font-semibold bg-green-500 hover:bg-green-600 text-black transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Authorized employees only
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;