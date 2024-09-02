import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getApiWithToken, putApiWithToken, deleteApiWithToken } from "../utils/api";
import SideNav from "../components/sideBar";

function GetWorkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]); // State to store workouts
  const [showEditModal, setShowEditModal] = useState(false); // State to manage modal visibility
  const [currentWorkout, setCurrentWorkout] = useState(null); // State to store current workout to be edited
  const [updatedWorkoutData, setUpdatedWorkoutData] = useState({
    exercise_id: "",
    sets: "",
    reps: "",
    weight: "",
  }); // State to store form data for editing

  // Fetch workouts
  async function getWorkouts() {
    try {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not found");
      }

      const { data } = await getApiWithToken("http://localhost:5000/workouts", token); // Destructure 'data' from response
      console.log("Fetched Workouts:", data);

      setWorkouts(data.workouts); // Set workouts state with the fetched data
    } catch (error) {
      console.error("Failed to fetch workouts:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Open Edit Modal and set current workout
  function openEditModal(workout) {
    setCurrentWorkout(workout);
    setUpdatedWorkoutData({
      exercise_id: workout.exercise_id || "", // Ensure default values to avoid undefined
      sets: workout.sets || "",
      reps: workout.reps || "",
      weight: workout.weight || "",
    });
    setShowEditModal(true);
  }

  // Close Edit Modal
  function closeEditModal() {
    setShowEditModal(false);
    setCurrentWorkout(null);
  }

  // Handle form input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUpdatedWorkoutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Edit a workout
  async function saveWorkoutChanges() {
    try {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not found");
      }

      console.log("Updated workout data to send:", updatedWorkoutData); // Log the data being sent

      // Use PUT instead of POST for editing
      const response = await putApiWithToken(
        `http://localhost:5000/workouts/${currentWorkout.log_id}`,
        updatedWorkoutData,
        token
      );

      console.log("Response from server:", response); // Log the response from the server

      if (response.status === 200) {
        console.log("Workout edited successfully");
        setWorkouts(
          workouts.map((workout) =>
            workout.log_id === currentWorkout.log_id
              ? { ...workout, ...updatedWorkoutData }
              : workout
          )
        ); // Update state locally
        closeEditModal(); // Close modal after saving
      } else {
        console.error("Failed to edit workout: ", response.data); // Log the response data if status is not 200
      }
    } catch (error) {
      console.error("Error editing workout:", error); // Log the entire error object
      if (error.response) {
        console.log("Error response data:", error.response.data); // Log the error response data
        console.log("Error response status:", error.response.status); // Log the error response status
        console.log("Error response headers:", error.response.headers); // Log the error response headers
      } else if (error.request) {
        console.log("Error request:", error.request); // Log the request that caused the error
      } else {
        console.log("Error message:", error.message); // Log a generic error message
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Delete a workout
  async function deleteWorkout(log_id) {
    try {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await deleteApiWithToken(`http://localhost:5000/workouts/${log_id}`, token);

      if (response.status === 200) {
        console.log("Workout deleted successfully");
        setWorkouts(workouts.filter((workout) => workout.log_id !== log_id)); // Update state locally
      } else {
        console.error("Failed to delete workout");
      }
    } catch (error) {
      console.error("Error deleting workout:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div>
      <main className="p-4 ml-64 transition-margin-left duration-300 ease-in-out"></main>
      <SideNav />
      {isLoading ? (
        <p>Loading workouts...</p>
      ) : (
        <div className="grid-container">
          {workouts.map((workout) => (
            <div key={workout.log_id} className="card">
              <div className="card-content">
                <h5 className="card-title">Exercise: {workout.exercise_name}</h5>
                <p className="card-text">Sets: {workout.sets}</p>
                <p className="card-text">Reps: {workout.reps}</p>
                <p className="card-text">Weight: {workout.weight} kg</p>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => openEditModal(workout)} // Open modal with current workout
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteWorkout(workout.log_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Workout Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Workout</h3>
            <form>
              <label htmlFor="exercise_id">Exercise ID:</label>
              <input
                type="text"
                id="exercise_id"
                name="exercise_id"
                value={updatedWorkoutData.exercise_id}
                onChange={handleInputChange}
              />
              <label htmlFor="sets">Sets:</label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={updatedWorkoutData.sets}
                onChange={handleInputChange}
              />
              <label htmlFor="reps">Reps:</label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={updatedWorkoutData.reps}
                onChange={handleInputChange}
              />
              <label htmlFor="weight">Weight (kg):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                step="0.01"
                value={updatedWorkoutData.weight}
                onChange={handleInputChange}
              />
              <button type="button" onClick={saveWorkoutChanges}>
                Save Changes
              </button>
              <button type="button" onClick={closeEditModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetWorkout;
