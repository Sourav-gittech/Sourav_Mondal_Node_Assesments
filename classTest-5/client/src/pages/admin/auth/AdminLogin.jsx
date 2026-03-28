import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // 🔐 API CALL (replace with real API)
            if (data.email === "admin@example.com" && data.password === "admin123") {
                localStorage.setItem("admin_token", "dummy-jwt-token");
                toast.success("Welcome back, Admin!");
                navigate("/admin/dashboard");
            } else {
                throw new Error("Invalid email or password");
            }
        } catch (err) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617]">
            <div className="w-full max-w-md bg-[#020617] border border-blue-500/30 rounded-xl shadow-xl p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-400">Admin Login</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Sign in to access the admin panel
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
                            className={`w-full px-4 py-2 rounded bg-[#020617] border text-white 
                ${errors.email ? "border-red-500" : "border-blue-500/40"}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email address",
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`w-full px-4 py-2 rounded bg-[#020617] border text-white 
                  ${errors.password ? "border-red-500" : "border-blue-500/40"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters required",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-sm text-gray-400 hover:text-blue-400"
                            >
                                {!showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember Me */}
                    {/* <div className="flex items-center justify-between text-sm text-gray-400">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-green-500" />
                            Remember me
                        </label>
                    </div> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded font-semibold bg-green-500 hover:bg-green-600 text-black transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    Authorized access only • Admin Panel
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;