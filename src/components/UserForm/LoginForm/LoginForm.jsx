import { useState } from "react";
import { useNavigate } from "react-router-dom";

//! try to put this at user-service/api //
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    // console.log(data);

    try {
      const res = await postData("/api/users/login", data);
      console.log(res);
      localStorage.setItem("token", res.token);
      // Correct the setUser call here

      setUser(res.somebody);
      console.log(setUser);
      console.log(data);

      navigate("/calendar");
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <label>
          Email:{" "}
          <input
            name="email"
            type="email"
            placeholder="Enter Text"
            autoComplete="off"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </fieldset>
    </form>
  );
}
