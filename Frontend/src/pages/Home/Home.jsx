import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

export default function Home() {
  const [authUser, setAuthUser] = useAuth();
  console.log("authUser from home page ->", authUser);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/task.jpg)",
          backgroundSize: "cover", // Ensures the image covers the entire screen
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition of the image
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-4xl">
            <h1 className="mb-5 text-5xl font-bold">Stay Organized, Achieve More</h1>
            <p className="mb-5 text-lg">
              Welcome to the ultimate task management platform that helps you stay on top of your
              goals, boost your productivity, and organize your day like never before. Our app
              allows you to seamlessly plan, track, and complete tasks with ease. Whether it's a
              simple to-do list or complex project management, we offer tools designed for every
              task, big or small.
            </p>
            <p className="mb-5 text-lg">
              With an intuitive interface, set your priorities, deadlines, and track progress all in
              one place. You can manage tasks on a daily basis, create subtasks, set reminders, and
              visualize your workload with detailed timelines. Collaborate with team members, share
              updates, and ensure that no task is left behind.
            </p>
            <Link to={authUser ? "/alltask" : "/signup"}>
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
