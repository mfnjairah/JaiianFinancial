import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";

function App() {
  const users = [
    {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      userName: "janesmith92",
      password: "securePass456",
      role: "admin",
      accountNumber: "9876543",
      accountBalance: 7500,
      income: "6000",
      expenseCategories: ["Groceries", "Utilities", "Dining"],
      transactionHistory: [
        { date: "2023-09-10", description: "Salary", amount: 6000 },
        { date: "2023-09-15", description: "Groceries", amount: -200 },
        { date: "2023-09-20", description: "Utilities", amount: -150 },
        { date: "2023-09-25", description: "Dining", amount: -100 },
      ],
    },
    {
      name: "Michael Johnson",
      email: "michael.johnson@email.com",
      userName: "mike.john",
      password: "strongPass789",
      role: "user",
      accountNumber: "7890123",
      accountBalance: 9500,
      income: "8000",
      expenseCategories: ["Rent", "Transportation", "Entertainment"],
      transactionHistory: [
        { date: "2023-09-10", description: "Salary", amount: 8000 },
        { date: "2023-09-15", description: "Rent", amount: -2500 },
        { date: "2023-09-20", description: "Transportation", amount: -150 },
        { date: "2023-09-25", description: "Entertainment", amount: -100 },
      ],
    },
    {
      name: "David Brown",
      email: "david.brown@email.com",
      userName: "davidb84",
      password: "safePass123",
      role: "user",
      accountNumber: "6543210",
      accountBalance: 4200,
      income: "5500",
      expenseCategories: ["Shopping", "Healthcare", "Travel"],
      transactionHistory: [
        { date: "2023-09-10", description: "Salary", amount: 5500 },
        { date: "2023-09-15", description: "Shopping", amount: -300 },
        { date: "2023-09-20", description: "Healthcare", amount: -100 },
        { date: "2023-09-25", description: "Travel", amount: -300 },
      ],
    },
    {
      name: "Emily Davis",
      email: "emily.d@email.com",
      userName: "emily.davis",
      password: "pass4567",
      role: "user",
      accountNumber: "4567890",
      accountBalance: 3200,
      income: "4500",
      expenseCategories: ["Education", "Hobbies", "Groceries"],
      transactionHistory: [
        { date: "2023-09-10", description: "Salary", amount: 4500 },
        { date: "2023-09-15", description: "Education", amount: -500 },
        { date: "2023-09-20", description: "Hobbies", amount: -200 },
        { date: "2023-09-25", description: "Groceries", amount: -300 },
      ],
    },
    {
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      userName: "sarahw22",
      password: "myPass789",
      role: "user",
      accountNumber: "8901234",
      accountBalance: 6700,
      income: "5200",
      expenseCategories: ["Dining", "Utilities", "Transportation"],
      transactionHistory: [
        { date: "2023-09-10", description: "Salary", amount: 5200 },
        { date: "2023-09-15", description: "Dining", amount: -150 },
        { date: "2023-09-20", description: "Utilities", amount: -200 },
        { date: "2023-09-25", description: "Transportation", amount: -100 },
      ],
    },
  ];
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Header />

          <Routes>
            <Route path="/" element={<DashBoard users={users} />} />
            <Route path="/deposit" element={<Deposit users={users} />} />
            <Route path="/withdraw" element={<Withdraw users={users} />} />
            <Route path="/transfer" element={<Transfer users={users} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register users={users} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
