import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const Email = email.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setShowError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: Email, password }),
      });

      if (response.ok) {
        const user = await response.json();

        if (user.error) {
          toast.warn("User already exists. Try with a different email");
        } else {
          toast.success("Registration successful.");
          localStorage.setItem("token", user.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        }
      } else {
        console.error("Failed to register user:", response.status);
      }
    } catch (error) {
      toast.error("An error occurred while registering user:", error);
    }
  };

  return (
    <div className="SignupContainer">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {showError && (
        <span className="fill-fields-error">Please Fill all the fields</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Register;
