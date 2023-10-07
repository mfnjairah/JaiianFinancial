import React, { useEffect, useState } from "react";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import "./Deposit.css";

const Deposit = ({ users, currentUser }) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountBalance: "",
    depositAmount: "",
  });
  const [userName, setUserName] = useState("No user exists.");
  const { accountNumber, accountBalance, depositAmount } = formData;

  const existingUsers = JSON.parse(localStorage.getItem("userz")) || users;
  const loggedInUser = existingUsers.find((user) => user.name === currentUser.name);
  const transactions = loggedInUser.transactionHistory;
  const transIds = loggedInUser.transactionHistory.map(id => {return id.ID;});
  const transMaxID = Math.max(...transIds) + 1;

  const d = new Date();
  const [day, setDay] = useState(d.getDate());
  const [month, setMonth] = useState(d.getMonth());
  const year = d.getFullYear();

  useEffect(() => {
    if (accountNumber) {
      const user = users.find((user) => user.accountNumber == accountNumber);
      if (user) {
        setUserName(user.name);
      } else {
        setUserName("No user exists.");
      }

      console.log(user);
    }
  }, [accountNumber, users]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(depositAmount);

  const onSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
    const customer = users.find((user) => user.accountNumber == accountNumber);
    const customerTrans = customer.transactionHistory;

    const adminTransIds = customer.transactionHistory.map(id => {return id.ID;});
    const adminTransMaxID = Math.max(...adminTransIds) + 1;

    const userIndex = storedUsers.findIndex(
      (user) => user.accountNumber == accountNumber
    );

    if (depositAmount >= 500) {
      
      const updatedTransaction = [...customerTrans,
        { ID: adminTransMaxID, 
        date: year + "-" + month + "-"+ day,
        description: "Deposit", 
        amount: depositAmount }]

      if (userIndex !== -1) {
        const updatedUsers = [...storedUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          accountBalance:
            parseInt(updatedUsers[userIndex].accountBalance) +
            parseInt(depositAmount),
        };

        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          transactionHistory: updatedTransaction
        };

        setFormData({
          accountNumber: "",
          accountBalance: "",
          depositAmount: "",
        });

        setUserName("No user exists.");

        localStorage.setItem("userz", JSON.stringify(updatedUsers));
        alert(`Transaction successful.`);
      }
    } else {
      alert("Amount must be higher than 500");
    }
    const storedUsers1 = JSON.parse(localStorage.getItem("userz")) || users;
    console.log(storedUsers1)
  };

  //-----------------------------------------------------------------------------

  const [userAmount, setUserAmount] = useState("");

  const testing = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
    const userIndex = storedUsers.findIndex((user) => user.accountNumber === currentUser.accountNumber);

    if (userAmount >= 500) {

      const updatedTransaction = [...transactions,
        { ID: transMaxID, 
        date: year + "-" + month + "-"+ day,
        description: "Deposit", 
        amount: userAmount }]

      const updatedUsers = [...storedUsers];

        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          accountBalance: parseInt(updatedUsers[userIndex].accountBalance) + parseInt(userAmount),
        };

        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          transactionHistory: updatedTransaction
      };

        setUserAmount('');

        localStorage.setItem("userz", JSON.stringify(updatedUsers));
        alert(`Transaction successful.`);

        const storedUsers1 = JSON.parse(localStorage.getItem("userz")) || users;
        console.log(storedUsers1);
  }

  else {
    alert("Amount must be higher than 500");
  }

}

  return (

      <div className="deposit-div">
        <div>
          <div className="heading-deposit">
            <RiLuggageDepositFill className="deposit-logo" />
            <h1>Deposit</h1>
          </div>
          
          {currentUser.role === "admin" && (
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    className="form-control-deposit"
                    type="text"
                    name="accountNumber"
                    value={accountNumber}
                    placeholder="Enter user id"
                    onChange={onChange}
                    required
                  />
                </div>
                {userName && <p className="sr-names-deposit">{userName}</p>}
                {userName !== "No user exists." && (
                  <div className="form-group">
                    <input
                      className="form-control-deposit"
                      type="number"
                      name="depositAmount"
                      value={depositAmount}
                      placeholder="Enter amount"
                      onChange={onChange}
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <button type="submit" className="deposit-btn">
                    <BiLogIn />
                  </button>
                </div>
              </form>
          )}
          {/* ------------------------------------------ */}
          {currentUser.role === "user" && (
              <form onSubmit={testing}>
                  <div className="form-group">
                    <input
                      className="form-control-deposit"
                      type="number"
                      name="depositAmount"
                      placeholder="Enter amount"
                      value = {userAmount}
                      onChange={e => {
                        setUserAmount(e.target.value)
                    }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="deposit-btn">
                      <BiLogIn />
                    </button>
                </div>
              </form>
          )}
        </div>
      </div>
    )
  
};

export default Deposit;
