import UserTable from "../../components/admin/user/UserTable";

const ManageEmployees = () => {
    const employees = []; // fetch from API

    return (
        <>
            <h2 className="text-xl text-blue-400 mb-4">
                Manage Employees
            </h2>
            <UserTable users={employees} />
        </>
    );
};

export default ManageEmployees;