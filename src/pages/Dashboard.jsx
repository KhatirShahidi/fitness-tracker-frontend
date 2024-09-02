import React, { useEffect, useState } from "react";
import CreateExercise from "./CreateExercise";
import CreateWorkout from "./CreateWorkout";
import GetWorkout from "./GetWorkout";
import SideNav from "../components/sideBar";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]); // State to store workouts

  // Fetch workouts
  

  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1 p-4 ml-16 transition-margin-left duration-300 ease-in-out">
        <div className="dashboard-container">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <h2>Step 1</h2>
          <CreateExercise />
          <h2>Step 2</h2>
          <CreateWorkout />
          <GetWorkout />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
