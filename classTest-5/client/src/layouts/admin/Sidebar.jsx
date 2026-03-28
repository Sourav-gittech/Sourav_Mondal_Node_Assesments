import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
    };

    const menu = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Profile", path: "/admin/profile" },
        { name: "Managers", path: "/admin/managers" },
        { name: "Employees", path: "/admin/employees" },
        { name: "Products", path: "/admin/products" },
    ];

    return (
        <aside className="w-64 bg-[#020617] border-r border-blue-500/30 p-5">
            <h1 className="text-xl font-bold text-red-500 mb-8">
                ADMIN PANEL
            </h1>

            <nav className="space-y-2">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded transition ${isActive
                                ? "bg-blue-500/20 text-blue-400"
                                : "hover:bg-blue-500/10"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={logout}
                className="mt-10 w-full py-2 bg-red-500 hover:bg-red-600 rounded text-black font-semibold"
            >
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;