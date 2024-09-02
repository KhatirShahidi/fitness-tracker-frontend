import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Exercises from "../pages/Exercises";
import CreateWorkout from "../pages/CreateWorkout";
import CreateExercise from "../pages/CreateExercise";
import SideNav from "../components/sideBar";
import GetWorkout from "../pages/GetWorkout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/workouts" element={<GetWorkout />} />
        <Route path="/createworkout" element={<CreateWorkout />} />
        <Route path="/createexercise" element={<CreateExercise />} />
        <Route path="/sidenav" element={<SideNav />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
