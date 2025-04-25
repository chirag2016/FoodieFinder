import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2000/auth/forgotpassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        setMessage(data.message || "Password updated successfully.");
        toast.success("Password updated successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 4000);
      } else {
        const errorMsg = data.error || "An error occurred while updating the password.";
        setMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("A network error occurred. Please try again later.");
      toast.error("Network error");
    }
  };

  return (
    <div className="update-password-container">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <ToastContainer />
    </div>
  );
};

export default UpdatePassword;
