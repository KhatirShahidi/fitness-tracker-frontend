import React, { useState } from "react";
import {
  FaHome,
  FaDumbbell,
  FaPlus,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa"; // Example icons
import { useNavigate } from "react-router-dom"; // Correct import

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Correct usage of useNavigate

  function navigateToLogin() {
    navigate("/login");
  }

  function navigateToExercises() {
    navigate("/exercises");
  }

  function navigateToWorkouts() {
    navigate("/workouts");
  }

  function navigateToDashboard() {
    navigate("/dashboard");
  }

  function navigateToAddExercises() {
    navigate("/exercises");
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        id="default-sidebar"
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-screen bg-gray-200 transition-width duration-300 ease-in-out`}
      >
        {/* Sidebar content */}
        <ul>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToDashboard();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaHome className="w-6 h-6" />
              <span className="ml-3">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToWorkouts();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaDumbbell className="w-6 h-6" />
              <span className="ml-3">Workouts</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToExercises();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaList className="w-6 h-6" />
              <span className="ml-3">Exercises</span>
            </a>
          </li>

          {/* Add more sidebar items here */}

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToAddExercises();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaPlus className="w-6 h-6" />
              <span className="ml-3">
                Add
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={ (e) => {
                e.preventDefault();
                navigateToLogin();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaSignOutAlt className="w-6 h-6" />
              <span  className="ml-3">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
      {/* Toggle Button */}

      {/* Main Content */}
    </div>
  );
}

export default SideNav;
