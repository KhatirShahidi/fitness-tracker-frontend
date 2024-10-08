import React, { useEffect, useState } from 'react';
import CreateExercise from './CreateExercise';
import CreateWorkout from './CreateWorkout';
import GetWorkout from './GetWorkout';
import { getApiWithToken } from '../utils/api';
import Cookies from 'js-cookie';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(''); // State to store the username

  useEffect(() => {
    async function getUser() {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          throw new Error('Token not found');
        }

        // Use the new API URL with endpoint
        const { data } = await getApiWithToken('me', token);

        setUsername(data.user.username);
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <div className="flex">
      <div className="dashboard-container">
        <h1 className="text-2xl font-bold">
          Welcome {username}, to My Fitness Tracker!
          <br />
        </h1>
        <h2>Step 1: </h2>
        <CreateExercise />
        <h2>Step 2: </h2>
        <CreateWorkout />
        <h2>Step 3: Start Monitoring! </h2>
        <GetWorkout />
      </div>
    </div>
  );
}

export default Dashboard;
