import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { loginSlice } from "../../redux/slice/auth/authSlice";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { profileSlice } from "../../redux/slice/userSlice";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthLoading, hasAuthError } = useSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    // console.log("Validated Login Data", data);

    dispatch(loginSlice(data))
      .then(res => {
        // console.log('Response for login data', res);

        if (res.meta.requestStatus === "fulfilled") {

          sessionStorage.setItem('auth-token', res?.payload?.token);
          dispatch(profileSlice());
          navigate('/');
          toast.success('Logged in successfully');
        }
        else {
          Swal.fire({
            title: 'Oops!',
            text: res?.payload?.message,
            icon: 'info'
          });
        }
      })
      .catch(err => {
        console.log('Error occured', err);
        Swal.fire({
          title: 'Error',
          text: err?.message,
          icon: 'error'
        });
      })
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-slate-800 border border-slate-700 p-6 w-96 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input mt-3"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">
            {errors.password.message}
          </p>
        )}

        {/* {hasAuthError && (
          <p className="text-red-500 text-sm mt-2">
            Invalid email or password
          </p>
        )} */}

        <button
          type="submit"
          disabled={isAuthLoading}
          className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-4 
            ${isAuthLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
          {isAuthLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;