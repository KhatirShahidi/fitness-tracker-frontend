import React, { useState } from "react";
import Register from "./Register";
import { useForm } from "react-hook-form";
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   try {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem("token", data.token);
//       window.location.href = "/dashboard";
//     } else {
//       alert("Login failed: " + data.message);
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//   }
// };

function Login() {
  const {handleSubmit, login, formState: { errors }} = useForm();
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
          {...Register("email", { required: "Enter email" })}
            type="email"
            required
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password: </label>
          <input
          {...Register("password", { required: "Enter password" })}
            type="password"
            required
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
