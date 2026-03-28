import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateProfileModal = ({ isOpen, onClose, user, onUpdate }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: user?.name || "",
        },
    });

    const submitHandler = (data) => {
        onUpdate(data);
        reset();
        onClose();
    };

    useEffect(() => {
        reset({
            name: user?.name
        })
    }, [user]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#020617] border border-blue-500/30 rounded-xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold text-blue-400 mb-4">
                    Update Profile
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Minimum 2 characters",
                                },
                            })}
                            className="w-full px-4 py-2 bg-[#020617] border border-blue-500/40 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email (Read Only) */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-4 py-2 bg-[#020617] border border-blue-500/20 text-gray-500 rounded cursor-not-allowed"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded font-semibold cursor-pointer"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;