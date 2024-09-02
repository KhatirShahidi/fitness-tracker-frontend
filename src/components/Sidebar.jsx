import React, { useState } from "react";
import {
  FaHome,
  FaDumbbell,
  FaPlus,
  FaPlusCircle,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const navigate = useNavigate();

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
    navigate("/createexercise");
  }

  function navigateToAddWorkout() {
    navigate("/createworkout");
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        id="default-sidebar"
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-screen bg-gray-200 transition-width duration-300 ease-in-out flex-shrink-0`} 
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
              <span className="ml-3">Dashboard</span>
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
              <span className="ml-3">My Workouts</span>
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
              <span className="ml-3">Exercise Library</span>
            </a>
          </li>

          {/* Add Dropdown */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
            >
              <FaPlusCircle className="w-6 h-6" />
              <span className="ml-3">Add</span>
            </a>
            {isDropdownOpen && (
              <ul className="pl-6">
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
                    <span className="ml-3">New Exercise</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAddWorkout();
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaPlus className="w-6 h-6" />
                    <span className="ml-3">New Workout</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToLogin();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaSignOutAlt className="w-6 h-6" />
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
    </div>
  );
}

export default SideNav;
