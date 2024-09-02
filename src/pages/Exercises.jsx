import { useState } from "react";
import { useForm } from "react-hook-form";
import SideNav from "../components/sideBar";

function Exercises() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);

  const apiKey = "ngDWR9BxMFsEyRiDa75gFw==T53pMh8jkulv7Fs7";
  const exerciseAPIurl = "https://api.api-ninjas.com/v1/exercises?muscle=";

  async function fetchExerciseApi(muscle) {
    if (!muscle) {
      alert("Please enter a muscle");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        exerciseAPIurl + encodeURIComponent(muscle),
        {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API Fetch Successful", data);
      setExerciseData(data); // assuming the API returns an array of exercises
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setIsLoading(false);
    }
  }

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    fetchExerciseApi(data.muscle);
  }

  return (
    <div>
      <main className="p-4 ml-64 transition-margin-left duration-300 ease-in-out">
        <SideNav />
        <h1>Exercises</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("muscle", { required: "Enter a muscle" })}
            type="text"
            placeholder="Enter a muscle"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
        <div>
          {exerciseData.length > 0 ? (
            exerciseData.map((exercise, index) => (
              <ul key={index} style={{ listStyleType: "none", padding: "0" }}>
                <li>
                  <h3 style={{ marginBottom: "10px", color: "orange" }}>
                    {exercise.name}
                  </h3>
                </li>
                <li>
                  <p>
                    <strong>Type:</strong> {exercise.type}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Muscle:</strong> {exercise.muscle}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Equipment:</strong> {exercise.equipment}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Difficulty:</strong> {exercise.difficulty}
                  </p>
                </li>
              </ul>
            ))
          ) : (
            <p>
              {isError
                ? "Failed to fetch data from the API."
                : "No data available or try another muscle."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Exercises;
