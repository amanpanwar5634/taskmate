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

  // Status Colors for UI
  const statusColors = {
    "To Do": "border-blue-500 bg-blue-100",
    "In Progress": "border-yellow-500 bg-yellow-100",
    "Blocked": "border-red-500 bg-red-100",
    "Completed": "border-green-500 bg-green-100",
  };

  const deleteTask = async () => {
    await axiosInstance
      .delete(`/task/deletetask/${item._id}`, { headers: { id: authUser._id } })
      .then((res) => {
        if (res.data.deletedOne) {
          toast.success("Task deleted successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div
      className={`mt-3 mb-3 p-3 w-full max-w-md shadow-xl rounded-md ${statusColors[status]} border-l-8`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="text-gray-700 mt-2">{item.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold">Change Status:</label>
          <select
            className="mt-1 w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {Object.keys(statusColors).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => document.getElementById("my_modal_4").showModal()}
            className="btn btn-primary"
          >
            Edit
          </button>
          <EditForm taskId={item._id} />
          <button onClick={deleteTask} className="btn btn-primary">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
