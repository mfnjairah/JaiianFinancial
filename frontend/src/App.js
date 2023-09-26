import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
  const users = [
    {
      userName: "Jairah",
      email: "jai@email.com",
      password: "pass123",
    },
    {
      userName: "Ian",
      email: "ian@email.com",
      password: "pass321",
    },
  ];
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register users={users} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
