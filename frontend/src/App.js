import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Pages
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Transaction from "./pages/Transaction";
import BudgetApp from "./pages/BudgetApp";
import Settings from "./pages/Settings";

// Utils
import PrivateRoute from "./utils/PrivateRoute";

// Data
import data from "./assets/data.json";

function App() {
  const users = JSON.parse(localStorage.getItem("userz")) || data;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  const userID = parseInt(users[users.length - 1].accountNumber);

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
      setLoginFormData({
        userName: "",
        password: "",
      });
      setCurrentUser(user);
    } else {
      alert("Wrong credentials.");
    }
  };

  // Register State
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, email, password, confirmPassword, firstName, lastName } =
    registerFormData;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const isExist = users.findIndex((user) => user.name === firstName + " " + lastName);


  
    if (password === confirmPassword) {
      if(isExist < 0) {
        if (isLoggedIn) {
          const newUser = {
              name: firstName + " " + lastName,
              userName,
              email,
              password,
              role: "user",
              accountNumber: userID + 1,
              accountBalance: 500,
              income: "",
              expenseCategories: [],
              transactionHistory: [],
              budgetApplication: []
            };

            //Create a new list of users by adding the newUser
            const updatedUsers = [...users, newUser];

            // Store the updated list of users in localStorage
            localStorage.setItem("userz", JSON.stringify(updatedUsers));

            // Clear the form data
            setRegisterFormData({
              firstName: "",
              lastName: "",
              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setIsLoggedIn(true);
            localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
            navigate("/dashboard");
        }
        else {
          const newUser = {
            name: firstName + " " + lastName,
            userName,
            email,
            password,
            role: "user",
            accountNumber: userID + 1,
            accountBalance: 500,
            income: "",
            expenseCategories: [],
            transactionHistory: [],
            budgetApplication: []
          };

          //Create a new list of users by adding the newUser
          const updatedUsers = [...users, newUser];

          // Store the updated list of users in localStorage
          localStorage.setItem("userz", JSON.stringify(updatedUsers));

          // Clear the form data
          setRegisterFormData({
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          alert("Registration Complete! Please click 'OK' to Log-in.")
          navigate("/");
        }
      }
      else {
        alert("User Exist");
      }     
    }
    else {
      alert("Passwords do not match");
    }
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }



    // const newUser = {
    //   name: firstName + " " + lastName,
    //   userName,
    //   email,
    //   password,
    //   role: "user",
    //   accountNumber: userID + 1,
    //   accountBalance: 500,
    //   income: "",
    //   expenseCategories: [],
    //   transactionHistory: [],
    //   budgetApplication: []
    // };

    // // Create a new list of users by adding the newUser
    // const updatedUsers = [...users, newUser];

    // // Store the updated list of users in localStorage
    // localStorage.setItem("userz", JSON.stringify(updatedUsers));

    // // Clear the form data
    // setRegisterFormData({
    //   firstName: "",
    //   lastName: "",
    //   userName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // });
    // setIsLoggedIn(true);
    // localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
    // navigate("/dashboard");
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
        <Header
          isLoggedIn={isLoggedIn}
          handleLogoutBtn={handleLogoutBtn}
          currentUser={currentUser}
        />
        {/* <Route path="/" element={<DashBoard users={users} />} />
          <Route path="/deposit" element={<Deposit users={users} />} />
          <Route path="/withdraw" element={<Withdraw users={users} />} />
          <Route path="/transfer" element={<Transfer users={users} />} /> */}
        <Routes>
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route
              element={<DashBoard users={users} currentUser={currentUser} />}
              path="/dashboard"
            />
            <Route element={<Deposit users={users} currentUser={currentUser}/>} path="/deposit" />
            <Route element={<Withdraw users={users} currentUser={currentUser}/>} path="/withdraw" />
            <Route element={<Transfer users={users} currentUser={currentUser}/>} path="/transfer" />
            <Route
              element={<Transaction users={users} currentUser={currentUser} />}
              path="/transaction"
            />
            <Route element={<BudgetApp users={users} currentUser={currentUser}/>} path="/budgetapplication" />
            <Route element={<Settings users={users} currentUser={currentUser}/>} path="/settings" />
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
