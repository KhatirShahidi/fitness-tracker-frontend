import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch workout data from the backend
    async function fetchWorkouts() {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setWorkouts(data);
    }

    fetchWorkouts();
  }, []);
  
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }

  return (
    <div>
      <h2>Your Workout Dashboard</h2>
      <button onClick={navigateToHome}>Home</button>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.log_id}>
            {workout.exercise_name} - {workout.sets} sets, {workout.reps} reps
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
