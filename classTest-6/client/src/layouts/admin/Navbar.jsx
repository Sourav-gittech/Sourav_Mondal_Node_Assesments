const Navbar = ({ onAddEmployee, onLogout }) => {
  return (
    <nav className="bg-[#020617] border-b border-blue-500/30 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400">
        Admin Dashboard
      </h1>

      <div className="flex gap-3">
        <button
          onClick={onAddEmployee}
          className="px-4 py-2 bg-green-500 text-black rounded cursor-pointer"
        >
          + Add Employee
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;