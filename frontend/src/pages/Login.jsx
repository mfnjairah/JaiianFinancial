import { FaSignInAlt } from "react-icons/fa";

const Login = ({ loginFormData, handleLoginChange, handleLoginSubmit }) => {
  const { userName, password } = loginFormData;

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please, login</p>
      </section>

      <section className="form">
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
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
              className="form-control"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleLoginChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
