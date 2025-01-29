import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthProvider";
import axiosInstance from "../../service";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import AddForm from "./AddForm"; // Import AddForm component

export default function AllTaskContent() {
    const [authUser] = useAuth();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getTasks = async () => {
            try {
                if (authUser) {
                    const res = await axiosInstance.get("/task/alltask", {
                        headers: { id: authUser._id },
                    });
                    setTasks(res.data.userData.tasks || []); // Set to an empty array if no tasks exist
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };

        getTasks();
    }, [authUser]); // Dependency ensures that the effect runs when `authUser` changes

    // Function to update the task list dynamically
    const addTaskToState = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the list
    };

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

                {/* Add Task Form */}
                <AddForm onTaskAdded={addTaskToState} />

                {/* Conditional Rendering */}
                {tasks.length > 0 ? (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tasks.map((item) => (
                            <Card key={item._id} item={item} />
                        ))}
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
            </div>
        </div>
    );
}
