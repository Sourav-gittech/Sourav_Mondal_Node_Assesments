const EmployeeNavbar = ({ onLogout }) => {
  return (
    <nav className="bg-[#020617] border-b border-blue-500/30 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400">
        Employee Dashboard
      </h1>

      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer">
        Logout
      </button>
    </nav>
  );
};

export default EmployeeNavbar;