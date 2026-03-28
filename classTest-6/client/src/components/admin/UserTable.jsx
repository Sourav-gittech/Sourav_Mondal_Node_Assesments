import UserRow from "./UserRow";

const UserTable = ({ users, onStatusChange, onPasswordChange }) => {
    return (
        <div className="bg-[#020617] border border-blue-500/30 rounded-xl overflow-hidden mx-30">
            <table className="w-full text-left">
                <thead className="bg-blue-500/10 text-blue-400 text-center">
                    <tr className="uppercase">
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Last Login</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users?.map(user => (
                        <UserRow key={user?._id} user={user} onStatusChange={onStatusChange} onPasswordChange={onPasswordChange} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;