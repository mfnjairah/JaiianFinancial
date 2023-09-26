import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = () => {};

  const { userName, email, password, confirmPassword } = formData;
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please, create an account</p>
      </section>

      <section className="form">
        <div className="form-group">
          <form>
            <input
              type="text"
              className="form-control"
              value={userName}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </form>
        </div>

        <div className="form-group">
          <form>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </form>
        </div>

        <div className="form-group">
          <form>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </form>
        </div>

        <div className="form-group">
          <form>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </form>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </section>
    </>
  );
};

export default Register;
