const EmployeeFooter = () => {
    return (
        <footer className="bg-[#020617] border-t border-blue-500/30 text-center py-4 text-gray-400 text-sm">
            © {new Date().getFullYear()} Employee Panel
        </footer>
    );
};

export default EmployeeFooter;