import React from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function registerApi(data) {
    // Additional password confirmation validation
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await postApi("http://localhost:5000/register", data);
      if (res.status !== 201) { // Assuming 201 Created for a successful registration
        throw new Error(res.statusText);
      }

      const resData = res.data;  // Axios response contains JSON data in res.data
      console.log(resData);
      alert("Registration Successful");
      navigate("/dashboard");
      reset();
    } catch (error) {
      console.error("Registration Error:", error.response ? error.response.data : error.message);
      alert("Registration Failed. Please try again.");
    }
  }

  function onSubmit(data) {
    registerApi(data);
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username: </label>
          <input
            {...register("username", { required: "Enter username" })}
            type="text"
            required
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
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
        <div>
          <label>Confirm Password: </label>
          <input
            {...register("confirmPassword", { required: "Enter password" })}
            type="password"
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Register</button>
        <p>
          <Link to="/login">Already a user?</Link>
        </p>
      </form>
      </div>
  );
}

export default Register;
