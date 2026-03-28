const Dashboard = () => {
    const stats = [
        { label: "Managers", value: 12, color: "blue" },
        { label: "Employees", value: 48, color: "green" },
        { label: "Products", value: 120, color: "red" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`border border-${stat.color}-500/30 rounded-lg p-6 bg-[#020617]`}
                >
                    <h3 className={`text-${stat.color}-400 text-sm`}>
                        {stat.label}
                    </h3>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;