const baseUrl = 'http://localhost:4000';

const endPoint_adminRegister = '/auth/admin/register';
const endPoint_adminLogin = '/auth/admin/login';

const endPoint_adminProfile = '/admin/profile';
const endPoint_adminProfileStatusChange = '/admin/profile/status';
const endPoint_adminProfileChangePassword = '/admin/profile/password/change';


const endPoint_managerRegister = '/auth/manager/register';
const endPoint_managerLogin = '/auth/manager/login';

const endPoint_managerProfile = '/manager/profile';
const endPoint_managerProfileStatusChange = '/manager/profile/status';
const endPoint_managerProfileChangePassword = '/manager/profile/password/change';


const endPoint_employeeRegister = '/auth/employee/register';
const endPoint_employeeLogin = '/auth/employee/login';

const endPoint_employeeProfile = '/employee/profile';
const endPoint_employeeProfileStatusChange = '/employee/profile/status';
const endPoint_employeeProfileChangePassword = '/employee/profile/password/change';


const endPoint_addProduct = "/product/addProduct";
const endPoint_getAllProduct = "/product/all";
const endPoint_getSingleProduct = "/product/fetch";
const endPoint_updateProduct = "/product/updateProduct";
const endPoint_deleteProduct = "/product/deleteProduct";

export default baseUrl;
export {
    endPoint_adminRegister, endPoint_adminLogin, endPoint_adminProfile, endPoint_adminProfileStatusChange, endPoint_adminProfileChangePassword,
    endPoint_managerRegister, endPoint_managerLogin, endPoint_managerProfile, endPoint_managerProfileStatusChange, endPoint_managerProfileChangePassword,
    endPoint_employeeRegister, endPoint_employeeLogin, endPoint_employeeProfile, endPoint_employeeProfileStatusChange, endPoint_employeeProfileChangePassword,
    endPoint_addProduct, endPoint_getAllProduct, endPoint_getSingleProduct, endPoint_updateProduct, endPoint_deleteProduct
}