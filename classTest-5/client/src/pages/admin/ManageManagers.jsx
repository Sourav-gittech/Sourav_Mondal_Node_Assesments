const managers = [
    { _id: 1, name: "Rahul Sharma", email: "rahul@corp.com", is_active: true },
    { _id: 2, name: "Anita Verma", email: "anita@corp.com", is_active: false },
];

const ManageManagers = () => {
    return (
        <div>
            <h2 className="text-xl text-blue-400 mb-4">Managers</h2>

            <table className="w-full border border-blue-500/30 rounded">
                <thead className="bg-blue-500/10">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((m) => (
                        <tr key={m._id} className="border-t border-blue-500/20">
                            <td className="p-3">{m.name}</td>
                            <td className="p-3">{m.email}</td>
                            <td className="p-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs ${m.is_active
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {m.is_active ? "Active" : "Inactive"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageManagers;