import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Exercises from "../pages/Exercises";
import CreateWorkout from "../pages/CreateWorkout";
import CreateExercise from "../pages/CreateExercise";
import GetWorkout from "../pages/GetWorkout";
import Layout from "../pages/Layout";
import SideNav from "../pages/sideBar";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Apply the Layout to routes that need the sidebar */}
        <Route element={<Layout />}>
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/workouts" element={<GetWorkout />} />
          <Route path="/createworkout" element={<CreateWorkout />} />
          <Route path="/createexercise" element={<CreateExercise />} />
        </Route>
        
        {/* Routes that don't require the sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path ="/sideNav" element={<SideNav />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
