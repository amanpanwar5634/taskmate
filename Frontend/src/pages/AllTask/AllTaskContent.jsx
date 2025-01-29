import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../components/AuthProvider";
import axiosInstance from "../../service";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function AllTaskContent() {
  const [authUser] = useAuth();
  const [tasks, setTasks] = useState(null); // `null` to differentiate between "loading" and "empty"
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [page, setPage] = useState(1); // Pagination state
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (authUser) {
          setIsLoading(true); // Start loading state

          // Load cached tasks first
          const cachedTasks = localStorage.getItem("tasks");
          if (cachedTasks) setTasks(JSON.parse(cachedTasks));

          // Fetch latest tasks from API
          const res = await axiosInstance.get(`/task/alltask?limit=10&page=${page}`, {
            headers: { id: authUser._id },
          });

          setTasks(res.data.userData.tasks || []);
          localStorage.setItem("tasks", JSON.stringify(res.data.userData.tasks));

          setIsLoading(false); // Stop loading state
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setIsLoading(false);
      }
    };

    getTasks();
  }, [authUser, page]); // Fetch when authUser changes or page updates

  // Memoize tasks to prevent unnecessary re-renders
  const renderedTasks = useMemo(() => {
    return tasks ? tasks.map((item) => <Card key={item._id} item={item} />) : null;
  }, [tasks]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 text-center">
        <h1 className="text-2xl md:text-4xl">
          Welcome to Your Task Manager!
          <span className="text-pink-600"> Let's Get Things Done :)</span>
        </h1>
        <p className="mt-12 font-bold">
          Organize, prioritize, and track your tasks with ease.
          No more missed deadlines or forgotten to-dos—stay on top of your work and achieve your goals!
          Here, you'll find all your tasks, neatly organized and ready to be tackled.
        </p>

        {/* Loading Indicator */}
        {isLoading ? (
          <div className="mt-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-600">Loading tasks...</h2>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderedTasks}
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold">
              You don't have any tasks yet!
            </h2>
            <p className="mt-4 text-gray-600">
              Start by adding a new task to stay on track and achieve your goals.
            </p>
          </div>
        )}

        {/* Pagination - Fetch More Tasks Button */}
        {!isLoading && tasks && tasks.length > 0 && (
          <div className="mt-6">
            <button
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Load More Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
