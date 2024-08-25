import React, { useState } from "react";
import { useForm } from "react-hook-form";

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   try {
//     const response = await fetch("/api/auth/Register", {
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
//       alert("Register failed: " + data.message);
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//   }
// };

function Register() {
const {handleSubmit, register, formState: { errors }} = useForm();
  function onSubmit(values) {
    console.log(values);
  }


  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </div>
  );
}

export default Register;
