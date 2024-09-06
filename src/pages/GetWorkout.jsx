import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  getApiWithToken,
  putApiWithToken,
  deleteApiWithToken,
} from '../utils/api';

function GetWorkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [updatedWorkoutData, setUpdatedWorkoutData] = useState({
    sets: '',
    reps: '',
    weight: '',
  });

  async function getWorkouts() {
    try {
      setIsLoading(true);
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const { data } = await getApiWithToken('workouts', token);
      console.log('Fetched Workouts:', data);

      setWorkouts(data.workouts);
    } catch (error) {
      console.error('Failed to fetch workouts:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function openEditModal(workout) {
    setCurrentWorkout(workout);
    setUpdatedWorkoutData({
      sets: workout.sets || '',
      reps: workout.reps || '',
      weight: workout.weight || '',
    });
    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
    setCurrentWorkout(null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUpdatedWorkoutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function saveWorkoutChanges() {
    try {
      setIsLoading(true);
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await putApiWithToken(
        `workouts/${currentWorkout.log_id}`,
        updatedWorkoutData,
        token,
      );

      if (response.status === 200) {
        console.log('Workout edited successfully');
        await getWorkouts();
        closeEditModal();
      } else {
        console.error('Failed to edit workout: ', response.data);
      }
    } catch (error) {
      console.error('Error editing workout:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteWorkout(log_id) {
    try {
      setIsLoading(true);
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await deleteApiWithToken(`workouts/${log_id}`, token);

      if (response.status === 200) {
        console.log('Workout deleted successfully');
        await getWorkouts();
      } else {
        console.error('Failed to delete workout');
      }
    } catch (error) {
      console.error('Error deleting workout:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div className="get-workout">
      <h2> Your Workouts</h2>
      {showEditModal && (
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">Edit Workout</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveWorkoutChanges();
              }}
            >
              <input
                type="number"
                name="sets"
                value={updatedWorkoutData.sets}
                onChange={handleInputChange}
                placeholder="Sets"
                className="input-field"
              />
              <input
                type="number"
                name="reps"
                value={updatedWorkoutData.reps}
                onChange={handleInputChange}
                placeholder="Reps"
                className="input-field"
              />
              <input
                type="number"
                name="weight"
                value={updatedWorkoutData.weight}
                onChange={handleInputChange}
                placeholder="Weight (kg)"
                className="input-field"
              />
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={saveWorkoutChanges}
                  className="edit-button"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="delete-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Loading workouts...</p>
      ) : (
        <div className="grid-container">
          {workouts.map((workout) => (
            <div key={workout.log_id} className="card">
              <div className="card-content">
                <h5 className="card-title">
                  Exercise: {workout.exercise_name}
                </h5>
                <p className="card-text">Sets: {workout.sets}</p>
                <p className="card-text">Reps: {workout.reps}</p>
                <p className="card-text">Weight: {workout.weight} kg</p>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => openEditModal(workout)}
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
    </div>
  );
}

export default GetWorkout;
