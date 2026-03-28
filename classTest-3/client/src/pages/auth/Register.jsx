import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { registerSlice } from "../../redux/slice/auth/authSlice";
import Swal from 'sweetalert2';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthLoading, authData, hasAuthError } = useSelector(state => state.auth);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch("password");

  const submitHandler = (data) => {
    // console.log("Receive register data", data);

    dispatch(registerSlice(data))
      .then(res => {
        // console.log('Response for registering data', res);

        if (res.meta.requestStatus === "fulfilled") {
          navigate('/');
          Swal.fire({
            title: 'Success',
            text: 'You have registered successfully',
            icon: 'success'
          });
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
          Register
        </h2>

        {/* Name */}
        <input
          placeholder="Name"
          className="input"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mb-2">{errors.name.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Role */}
        <select
          className="input"
          {...register("role", { required: "Role is required" })}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        {errors.role && (
          <p className="text-red-400 text-sm mb-2">{errors.role.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm mb-2">
            {errors.password.message}
          </p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm mb-2">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit" disabled={isAuthLoading}
          className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-2 ${!isAuthLoading?'cursor-pointer':'cursor-not-allowed'}`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;