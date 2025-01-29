import React, { useState } from "react";
import EditForm from "../EditTask/EditForm";
import { useAuth } from "../../components/AuthProvider";
import axiosInstance from "../../service";
import toast from "react-hot-toast";

export default function TaskCard({ item }) {
  const [authUser] = useAuth();
  const [status, setStatus] = useState("To Do"); // Default status

  const date = new Date(item.createdAT);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Define status styles (colors, gradients)
  const statusStyles = {
    "To Do": "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
    "In Progress": "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black",
    "Blocked": "bg-gradient-to-r from-red-500 to-red-700 text-white",
    "Completed": "bg-gradient-to-r from-green-500 to-green-700 text-white",
  };

  return (
    <div className="max-w-md w-full mx-auto p-5 mb-6 bg-white shadow-lg rounded-lg border-l-8 border-gray-300 transition-all hover:shadow-2xl">
      {/* Title & Description */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>

      {/* Date */}
      <div className="text-sm text-gray-400 mt-3">{formattedDate}</div>

      {/* Status Selection Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(statusStyles).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              status === s ? statusStyles[s] : "bg-gray-200 text-gray-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-between">
        <button
          onClick={() => document.getElementById("my_modal_4").showModal()}
          className="px-4 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-all"
        >
          Edit
        </button>
        <EditForm taskId={item._id} />
        <button
          onClick={() =>
            axiosInstance.delete(`/task/deletetask/${item._id}`, {
              headers: { id: authUser._id },
            }).then(() => {
              toast.success("Task deleted successfully");
              setTimeout(() => window.location.reload(), 1000);
            })
          }
          className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
