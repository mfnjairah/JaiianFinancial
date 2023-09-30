import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const Register = ({ users }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      userName,
      email,
      password,
      accountNumber: "",
      accountBalance: "",
      income: "",
      expenseCategories: [],
      transactionHistory: [],
    };

    // Create a new list of users by adding the newUser
    const updatedUsers = [...users, newUser];

    // Store the updated list of users in localStorage
    localStorage.setItem("userz", JSON.stringify(updatedUsers));

    // Clear the form data
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please, create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="userName"
              value={userName}
              placeholder="Enter your username"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>

        {users.map((user) => (
          <li key={user.userName}>{user.userName}</li>
        ))}
      </section>
    </>
  );
};

export default Register;
