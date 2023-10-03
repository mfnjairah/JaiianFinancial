// import { FaUser } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";

const Register = ({
  registerFormData,
  handleRegisterChange,
  handleRegisterSubmit,
}) => {
  const { userName, email, password, confirmPassword } = registerFormData;

  return (
    <>
      <section className="heading">
        <h1>
          <SiGnuprivacyguard /> Register
        </h1>
        <p>Please, create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="userName"
              value={userName}
              placeholder="Enter your username"
              onChange={handleRegisterChange}
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
              onChange={handleRegisterChange}
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
              onChange={handleRegisterChange}
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
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>

        {/* {users.map((user) => (
          <li key={user.userName}>{user.userName}</li>
        ))} */}
      </section>
    </>
  );
};

export default Register;
