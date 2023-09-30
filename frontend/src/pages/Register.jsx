import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = ({ users }) => {
  const getUserData = JSON.parse(localStorage.getItem("userz"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    accountNumber: "",
    accountBalance: "",
    income: "",
    expenseCategories: [],
    transactionHistory: [],
  });

  const { userName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // users.push(formData);
    const listUsers = [...users, formData];
    localStorage.setItem("userz", JSON.stringify(listUsers));
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
            />
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>

        {getUserData
          ? getUserData.map((user) => <li>{user.userName}</li>)
          : users.map((user) => <li>{user.userName}</li>)}
      </section>
    </>
  );
};

export default Register;
