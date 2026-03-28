import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { clearUserData, profileSlice } from "../redux/slice/userSlice";

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isProfileLoading, profileData, hasProfileError } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(profileSlice())
      .then(res => {
        // console.log("Response for fetching profile", res);
      })
      .catch(err => {
        console.log('Error occured', err);
      })
  }, []);

  const logoutHandler = () => {
    sessionStorage.removeItem("auth-token");
    dispatch(clearUserData());
    navigate("/");
  };

  // console.log('Fetched profile details', profileData);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-500"><Link to="/">Role-Auth App</Link></h1>

      <div className="flex gap-4 items-center text-gray-300">
        {!profileData ? (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-green-400">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-green-400">
              Hi, {profileData?.data?.name?.split(" ")[0]}
            </span>
            <button
              onClick={logoutHandler}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;