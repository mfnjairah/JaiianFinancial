// import { FaSignInAlt } from "react-icons/fa";
import { BiLogIn, BiSolidUserCircle } from "react-icons/bi";
import "./Login.css";

const Login = ({ loginFormData, handleLoginChange, handleLoginSubmit }) => {
  const { userName, password } = loginFormData;

  return (
    <div className="login-div">
      <div>
        <section className="heading-login">
          <BiSolidUserCircle className="login-logo" />
          <h1>Login</h1>
        </section>

        <section className="form">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control-login"
                name="userName"
                value={userName}
                placeholder="Enter your username"
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control-login"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <button type="submit" className="login-btn">
                <BiLogIn />
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
