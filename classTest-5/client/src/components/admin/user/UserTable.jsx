const UserTable = ({ users = [], onToggle, onDelete }) => {
    if (!users.length) {
        return (
            <p className="text-center text-gray-500 mt-6">
                No records found
            </p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-blue-500/30 rounded">
                <thead className="bg-blue-500/10">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr
                            key={u._id}
                            className="border-t border-blue-500/20"
                        >
                            <td className="p-3">{u.name}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs ${u.is_active
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {u.is_active ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="p-3 space-x-2">
                                <button
                                    onClick={() => onToggle(u._id)}
                                    className="text-blue-400 hover:underline"
                                >
                                    Toggle
                                </button>
                                <button
                                    onClick={() => onDelete(u._id)}
                                    className="text-red-400 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;