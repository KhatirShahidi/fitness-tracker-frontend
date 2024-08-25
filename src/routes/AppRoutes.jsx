import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";


function AppRoutes() {
    return (
        <BrowserRouter>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
</Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;