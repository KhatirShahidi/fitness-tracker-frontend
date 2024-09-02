import React from "react";
import { useState } from "react";
import { postApi } from "../utils/api";


function CreateExercise () {
const [exerciseName, setExerciseName] = useState("");
const [exerciseType, setExerciseType] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!exerciseName || !exerciseType) {
        setMessage("Please fill in all fields");
        setLoading(false);
        return;
    }

    try {
        const response = await postApi("http://localhost:5000/exercise", {
            exercise_name: exerciseName,
            exercise_type: exerciseType
        });

        setMessage(`Exercise "${response.data.newExercise.exercise_name}" created successfully!`);
        setExerciseName("");
        setExerciseType("");
    } catch (error) {
        console.error (error);
        setMessage("Failed to create exercise");
        setLoading(false);
    } finally {
        setLoading(false);
    }
}

return (
    <div className="create-exercise">
      <h2>Create a New Exercise</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exerciseName">Exercise Name:</label>
          <input
            type="text"
            id="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            placeholder="Enter exercise name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exerciseType">Exercise Type:</label>
          <input
            type="text"
            id="exerciseType"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            placeholder="Enter exercise type (e.g., cardio, strength)"
            required
          />
        </div>
        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
};

export default CreateExercise;