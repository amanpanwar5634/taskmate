import React, { useState } from "react";
import EditForm from "../EditTask/EditForm";
import { useAuth } from "../../components/AuthProvider";
import toast from "react-hot-toast";

export default function TaskCard({ item }) {
  const [authUser] = useAuth();
  const [status, setStatus] = useState("To Do"); // Default status

  // Define border colors for different statuses
  const statusColors = {
    "To Do": "border-blue-500",
    "In Progress": "border-yellow-500",
    "Blocked": "border-red-500",
    "Completed": "border-green-500",
  };

  // Function to update task status
  const changeStatus = (newStatus) => {
    setStatus(newStatus);
    toast.success(`Status changed to: ${newStatus}`);
  };

  return (
    <div
      className={`max-w-md w-full mx-auto p-5 mb-6 bg-white shadow-lg rounded-lg border-4 ${
        statusColors[status] || "border-gray-300"
      } transition-all duration-300`}
    >
      {/* Title & Description */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>

      {/* Status Buttons */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {Object.keys(statusColors).map((st) => (
          <button
            key={st}
            onClick={() => changeStatus(st)}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              st === status ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {st}
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
          onClick={() => toast.error("Delete functionality is disabled in frontend")}
          className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
