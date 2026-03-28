const Footer = () => {
    return (
        <footer className="bg-[#020617] border-t border-blue-500/30 text-center py-4 text-gray-400 text-sm">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </footer>
    );
};

export default Footer;