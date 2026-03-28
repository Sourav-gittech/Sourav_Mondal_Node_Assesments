const baseURL = "http://localhost:4000";

const endPointAdminRegister = "/admin/register";
const endPointAdminLogin = "/admin/login";

const endPointAddEmployee = "/employee/auth/create-employee";
const endPointEmployeeLogin = "/employee/auth/login";

const endPointEmployee = "/employee/";
const endPointResetPassword = "/employee/reset-password/";

const endPointEmployeeProfile = "/employee/profile";
const endPointEmployeeChangePassword = "/employee/change-password";

export default baseURL;
export {
    endPointAdminRegister, endPointAdminLogin, endPointAddEmployee, endPointEmployeeLogin, endPointEmployee,
    endPointResetPassword, endPointEmployeeProfile, endPointEmployeeChangePassword
};