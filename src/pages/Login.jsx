import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../utils/api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function navigateToDashboard() {
    navigate("/dashboard");
  }

  async function loginApi(data) {
    try {
      const res = await postApi("http://localhost:5000/login", data);
      
      if (res.status !== 200) {  // Checking the status from Axios response
        throw new Error(res.statusText);
      }
      
      const resData = res.data;  // Axios already parses JSON
      const token = resData.data.token;
      console.log(resData);

      alert("Login Successful");
      
      // Save token in cookie
      Cookies.set("authToken", token);
      navigateToDashboard();
      reset();
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login Failed. Please check your credentials.");
    }
  }

  function onSubmit(data) {
    loginApi(data);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label>Email: </label>
          <input
            {...register("email", { required: "Enter email" })}
            type="email"
            required
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password: </label>
          <input
            {...register("password", { required: "Enter password" })}
            type="password"
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? Click{" "}
          <Link to="/register">here</Link> to Register
        </p>
      </form>
    </div>
  );
}

export default Login;
