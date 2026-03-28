const ProfileCard = ({ user, onEdit, onChangePassword }) => {
    return (
        <div className="bg-[#020617] border border-blue-500/30 rounded-xl p-6 max-w-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">
                Profile Details
            </h2>

            <div className="space-y-2 text-gray-300">
                <p>
                    <span className="text-gray-400">Name:</span> {user?.name ?? 'N/A'}
                </p>
                <p>
                    <span className="text-gray-400">Email:</span> {user?.email ?? 'N/A'}
                </p>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                >
                    Update Profile
                </button>

                <button
                    onClick={onChangePassword}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded font-semibold cursor-pointer"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;