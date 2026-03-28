import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#020617] w-full max-w-md rounded-lg border border-blue-500/30">
                <div className="flex justify-between items-center px-5 py-3 border-b border-blue-500/20">
                    <h3 className="text-blue-400 font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-400"
                    >
                        <X />
                    </button>
                </div>

                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};

export default Modal;