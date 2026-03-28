import React from 'react'
import formatDateTime from '../../utils/formatDateTime'

const UserRow = ({ user, onStatusChange, onPasswordChange }) => {
    return (
        <tr
            className="border-t border-blue-500/20 hover:bg-blue-500/5 text-center"
        >
            <td className="p-4 text-white">{user?.name ?? 'N/A'}</td>
            <td className="p-4 text-gray-400">{user?.email ?? 'N/A'}</td>
            <td className="p-4 text-gray-400">{user?.lastLogin ? formatDateTime(user?.lastLogin) : 'N/A'}</td>
            <td className="p-4">
                <span
                    className={`px-4 py-1 rounded-full text-sm ${user?.isActive
                        ? "bg-green-500/20 text-green-400 px-5"
                        : "bg-red-500/20 text-red-400"
                        }`}
                >
                    {user?.isActive ? 'Active' : 'Block'}
                </span>
            </td>

            <td className="p-4 flex gap-2 items-center justify-center">
                <button
                    onClick={() => onStatusChange(user?._id)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                >
                    Change Status
                </button>

                <button
                    onClick={() => onPasswordChange(user?._id)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded cursor-pointer">
                    Change Password
                </button>
            </td>
        </tr>
    )
}

export default UserRow