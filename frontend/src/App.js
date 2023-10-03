import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Pages
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";

// Utils
import PrivateRoute from "./utils/PrivateRoute";

// Data
import data from "./assets/data.json";

function App() {
  const users = JSON.parse(localStorage.getItem("userz")) || data;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Global States

  // Login State
  const [loginFormData, setLoginFormData] = useState({
    userName: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.userName === loginFormData.userName);

    if (user && user.password === loginFormData.password) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      console.log(`Wrong credentials.`);
    }
    setLoginFormData({
      userName: "",
      password: "",
    });
  };

  // Register State
  const [registerFormData, setRegisterFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, email, password, confirmPassword } = registerFormData;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
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
      accountBalance: "500",
      income: "",
      expenseCategories: [],
      transactionHistory: [],
    };

    // Create a new list of users by adding the newUser
    const updatedUsers = [...users, newUser];

    // Store the updated list of users in localStorage
    localStorage.setItem("userz", JSON.stringify(updatedUsers));

    // Clear the form data
    setRegisterFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Logout
  const handleLogoutBtn = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App">
      <div className="container">
        <Header isLoggedIn={isLoggedIn} handleLogoutBtn={handleLogoutBtn} />
        {/* <Route path="/" element={<DashBoard users={users} />} />
          <Route path="/deposit" element={<Deposit users={users} />} />
          <Route path="/withdraw" element={<Withdraw users={users} />} />
          <Route path="/transfer" element={<Transfer users={users} />} /> */}
        <Routes>
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route element={<DashBoard users={users} />} path="/dashboard" />
            <Route element={<Deposit users={users} />} path="/deposit" />
            <Route element={<Withdraw users={users} />} path="/withdraw" />
            <Route element={<Transfer users={users} />} path="/transfer" />
          </Route>

          <Route
            path="/"
            element={
              <Login
                loginFormData={loginFormData}
                handleLoginChange={handleLoginChange}
                handleLoginSubmit={handleLoginSubmit}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                registerFormData={registerFormData}
                handleRegisterChange={handleRegisterChange}
                handleRegisterSubmit={handleRegisterSubmit}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
