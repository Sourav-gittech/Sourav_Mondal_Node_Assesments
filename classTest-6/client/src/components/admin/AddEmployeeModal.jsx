import { useForm } from "react-hook-form";

const AddEmployeeModal = ({ isOpen, onClose, onSubmit }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const submitHandler = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#020617] border border-blue-500/30 rounded-xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold text-blue-400 mb-4">
                    Add Employee
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Employee Name"
                            className="w-full px-4 py-2 bg-[#020617] border border-blue-500/40 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email",
                                },
                            })}
                            placeholder="Employee Email"
                            className="w-full px-4 py-2 bg-[#020617] border border-blue-500/40 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 rounded text-white cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded font-semibold cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;