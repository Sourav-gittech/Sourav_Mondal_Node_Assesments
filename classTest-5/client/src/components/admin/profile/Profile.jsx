import { useState } from "react";
import Modal from "../common/Modal";

const Profile = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="max-w-lg bg-[#020617] border border-blue-500/30 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">
                    Admin Profile
                </h2>

                <div className="space-y-2 text-gray-300">
                    <p>
                        <span className="text-gray-400">Name:</span> Admin
                    </p>
                    <p>
                        <span className="text-gray-400">Email:</span> admin@example.com
                    </p>
                    <p>
                        <span className="text-gray-400">Role:</span> Administrator
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="mt-6 w-full py-2 bg-green-500 hover:bg-green-600 text-black rounded-md font-medium transition"
                >
                    Change Password
                </button>
            </div>

            {/* Change Password Modal */}
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Change Password"
            >
                <form className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400">Old Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter old password"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">New Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-500 hover:bg-green-600 text-black rounded-md font-medium"
                    >
                        Update Password
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default Profile;