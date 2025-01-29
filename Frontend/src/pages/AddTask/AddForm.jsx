import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useAuth } from "../../components/AuthProvider";
import axiosInstance from "../../service";
import toast from "react-hot-toast";

export default function AddForm({ onTaskAdded }) {
    const [authUser] = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const TaskInfo = {
            title: data.title,
            description: data.description,
        };

        try {
            const res = await axiosInstance.post("/task/create", TaskInfo, {
                headers: { id: authUser._id },
            });

            if (res.data.taskcreated) {
                toast.success("Task added successfully");
                document.getElementById("my_modal_1").close();
                onTaskAdded(res.data.taskcreated); // Notify parent component with the new task
                setTimeout(()=>{window.location.reload();},1000);
                
            }
        } catch (err) {
            console.log("error->",err);
        }
    });

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                    <Link to="/alltask">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById("my_modal_1").close()}
                        >
                            ✕
                        </button>
                    </Link>
                    <h1 className="font-bold text-4xl text-center">Add Task</h1>
                    <div className="mt-2 px-4 py-1">
                        <h3 className="mb-1">Title</h3>
                        <input
                            type="text"
                            placeholder="Enter title"
                            className="w-80 mt-1 outline-none bg-white-300"
                            {...register("title", { required: true })}
                        />
                        <p className="text-red-600 mt-2">{errors.title && <span>This field is required</span>}</p>
                    </div>
                    <div className="mt-2 px-4 py-1">
                        <h3 className="mb-1">Description</h3>
                        <textarea
                            placeholder="Enter description"
                            className="w-80 mt-1 outline-none bg-white-300"
                            {...register("description", { required: true })}
                        ></textarea>
                        <p className="text-red-600 mt-2">{errors.description && <span>This field is required</span>}</p>
                    </div>
                    <div className="flex justify-between mt-3">
                        <button className="mx-2 bg-blue-600 text-white font-bold px-4 py-1 rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
