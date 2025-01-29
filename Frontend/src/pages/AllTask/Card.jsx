import React, { useState, useEffect } from "react";
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

  // Define border colors for different statuses
  const statusBorderColors = {
    "To Do": "border-blue-500",
    "In Progress": "border-yellow-500",
    "Blocked": "border-red-500",
    "Completed": "border-green-500",
  };

  // Load the status from localStorage if it exists
  useEffect(() => {
    const storedStatus = localStorage.getItem(`task-status-${item._id}`);
    if (storedStatus) {
      setStatus(storedStatus);
    }
  }, [item._id]);

  // Handle status change and update localStorage
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem(`task-status-${item._id}`, newStatus);
  };

  return (
    <div
      className={`max-w-md w-full mx-auto p-5 mb-6 bg-white shadow-lg rounded-lg border-l-8 ${
        statusBorderColors[status] || "border-gray-300"
      } transition-all hover:shadow-2xl`}
    >
      {/* Title & Description */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>

      {/* Date */}
      <div className="flex flex-row justify-between items-center">
      <div className="text-sm text-gray-400 mt-3">{formattedDate}</div>

{/* Status Indicator */}
<div className="mt-4 flex items-center">
  <span
    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
      status === "To Do"
        ? "bg-blue-100 text-blue-700"
        : status === "In Progress"
        ? "bg-yellow-100 text-yellow-700"
        : status === "Blocked"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {status}
  </span>
</div>
      </div>
      
      <div className="flex flex-row justify-between mt-3">
        
      <button
          onClick={() => handleStatusChange("In Progress")}
          className="px-2 py-1 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition-all"
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusChange("Blocked")}
          className="px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all"
        >
          Blocked
        </button>
        <button
          onClick={() => handleStatusChange("Completed")}
          className="px-2 py-1 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-all"
        >
          Completed
        </button>

      </div>
      {/* Actions */}
      <hr className="mt-3"></hr>
      <div className="mt-5 flex justify-between">
        <button
          onClick={() => document.getElementById("my_modal_4").showModal()}
          className="btn btn-primary text-white"
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
          className=" btn btn-error text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
