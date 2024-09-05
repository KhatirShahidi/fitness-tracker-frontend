import React, { useState, useEffect } from 'react';
import { postApiWithToken } from '../utils/api';
import Cookies from 'js-cookie';

const CreateWorkout = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [exercises, setExercises] = useState([]); // State for all exercises
  const [filteredExercises, setFilteredExercises] = useState([]); // State for filtered suggestions

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      setMessage('You must be logged in to add a workout.');
    }
    setToken(authToken || '');

    // Fetch exercises data from backend API
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      // Use the new API URL with endpoint
      const response = await fetch(
        'https://fitness-tracker-backend-vp22.onrender.com/exercises',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }
  };

  const handleExerciseChange = (e) => {
    const input = e.target.value;
    setExerciseName(input);

    // Filter exercises based on input
    const filtered = exercises.filter((exercise) =>
      exercise.exercise_name.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredExercises(filtered);
  };

  const handleSelectExercise = (selectedExercise) => {
    setExerciseName(selectedExercise.exercise_name);
    setFilteredExercises([]); // Clear suggestions after selection
  };

  const validateInputs = () => {
    const setsNum = parseInt(sets);
    const repsNum = parseInt(reps);
    const weightNum = parseFloat(weight);
    if (
      !exerciseName ||
      isNaN(setsNum) ||
      setsNum <= 0 ||
      isNaN(repsNum) ||
      repsNum <= 0 ||
      isNaN(weightNum) ||
      weightNum < 0
    ) {
      setMessage('Please provide complete and valid workout data.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateInputs()) return;

    if (!token) {
      setMessage('You must be logged in to add a workout.');
      return;
    }

    setLoading(true);
    try {
      const workoutData = {
        exercise_name: exerciseName, // Using exercise name for backend submission
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight),
      };

      console.log('Submitting workout data:', workoutData);

      // Use the new API URL with endpoint
      const response = await postApiWithToken('workouts', workoutData, token);

      setMessage('Workout added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding workout log:', error);
      console.error('Error Response Data:', error.response?.data);
      setMessage(
        error.response?.data?.message ||
          'Server error, please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setExerciseName('');
    setSets('');
    setReps('');
    setWeight('');
  };

  return (
    <div className="create-workout">
      <h2>Add a New Workout</h2>
      {message && <p aria-live="polite">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise Name:</label>
          <input
            type="text"
            value={exerciseName}
            onChange={handleExerciseChange}
            required
            autoComplete="off"
          />
          {filteredExercises.length > 0 && (
            <ul className="suggestions">
              {filteredExercises.map((exercise) => (
                <li
                  key={exercise.exercise_id}
                  onClick={() => handleSelectExercise(exercise)}
                >
                  {exercise.exercise_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            min="1"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            min="1"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Workout'}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkout;
