// import { FaUser } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { BiLogIn } from "react-icons/bi";
import "./Register.css";

const Register = ({
  registerFormData,
  handleRegisterChange,
  handleRegisterSubmit,
  }) => {
  const { userName, email, password, confirmPassword, firstName, lastName } =
    registerFormData;

  return (
    <div className="register-div">
      <div>
        <section className="heading-register">
          <SiGnuprivacyguard className="register-logo" />
          <h1>Register</h1>
        </section>

        <section className="form">
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control-register"
                name="firstName"
                value={firstName}
                placeholder="Enter your first name"
                onChange={handleRegisterChange}
                pattern="[a-zA-Z ]+" title="Please Use Only Aphabet Characters and Spaces."
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control-register"
                name="lastName"
                value={lastName}
                placeholder="Enter your last name"
                onChange={handleRegisterChange}
                pattern="[a-zA-Z ]+" title="Please Use Only Aphabet Characters and Spaces."
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control-register"
                name="userName"
                value={userName}
                placeholder="Enter your username"
                onChange={handleRegisterChange}
                pattern = "[a-zA-Z][a-zA-Z0-9-_.]" 
                title="Please Use Only Aphabet Characters and Numbers. Period, dash and underscore are allowed."
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control-register"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control-register"
                name="password"
                value={password}
                placeholder="Enter your password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control-register"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="register-btn">
                <BiLogIn />
              </button>
            </div>
          </form>

          {/* {users.map((user) => (
          <li key={user.userName}>{user.userName}</li>
        ))} */}
        </section>
      </div>
    </div>
  );
};

export default Register;
