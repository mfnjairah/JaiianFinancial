import React, { useState, useEffect } from "react";
import { BiLogIn, BiMoneyWithdraw } from "react-icons/bi";

const Withdraw = ({ users, currentUser }) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    withdrawAmount: "",
  });
  const [userName, setUserName] = useState("No user exists.");

  const { accountNumber, withdrawAmount } = formData;

  useEffect(() => {
    if (accountNumber) {
      const user = users.find((user) => user.accountNumber == accountNumber);
      if (user) {
        setUserName(user.name);
      } else {
        setUserName("No user exists.");
      }
    }
  }, [accountNumber, users]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const d = new Date();
  const [day, setDay] = useState(d.getDate());
  const [month, setMonth] = useState(d.getMonth());
  const year = d.getFullYear();

  const onSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
    const withdrawAmountParsed = parseInt(withdrawAmount);

    const customer = users.find((user) => user.accountNumber == accountNumber);
    const customerTrans = customer.transactionHistory;

    const adminTransIds = customer.transactionHistory.map(id => {return id.ID;});
    const adminTransMaxID = Math.max(...adminTransIds) + 1;


    if (withdrawAmountParsed > 0) {
      const userIndex = storedUsers.findIndex(
        (user) => user.accountNumber == accountNumber
      );

      const updatedTransaction = [...customerTrans,
        { ID: adminTransMaxID, 
        date: year + "-" + month + "-"+ day,
        description: "Withdraw", 
        amount: "-" + withdrawAmountParsed }]

      if (userIndex !== -1) {
        const user = storedUsers[userIndex];
        const newBalance = user.accountBalance - withdrawAmountParsed;

        if (newBalance >= 0) {
          user.accountBalance = newBalance;
          user.transactionHistory = updatedTransaction;

          const updatedUsers = [...storedUsers];
          updatedUsers[userIndex] = user;

          setFormData({
            accountNumber: "",
            withdrawAmount: "",
          });

          setUserName("No user exists.");

          localStorage.setItem("userz", JSON.stringify(updatedUsers));
          alert(`Transaction successful.`);

          const storedUsers1 = JSON.parse(localStorage.getItem("userz")) || users;
          console.log(storedUsers1)
        } else {
          alert("Insufficient balance.");
        }
      } else {
        alert("User not found.");
      }
    } else {
      alert("Invalid withdrawal amount.");
    }
  };

  //--------------------------------------------

  const userOnSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
    const withdrawAmountParsed = parseInt(withdrawAmount);

    const loggedInUser = users.find((user) => user.accountNumber == currentUser.accountNumber);
    const loggedInUserTrans = loggedInUser.transactionHistory;

    const TransIds = loggedInUser.transactionHistory.map(id => {return id.ID;});
    const TransMaxID = Math.max(...TransIds) + 1;


    if (withdrawAmountParsed > 0) {
      const userIndex = storedUsers.findIndex(
        (user) => user.accountNumber == currentUser.accountNumber
      );

      const updatedTransaction = [...loggedInUserTrans,
        { ID: TransMaxID, 
        date: year + "-" + month + "-"+ day,
        description: "Withdraw", 
        amount: "-" + withdrawAmountParsed }]

        console.log(loggedInUser)

      if (userIndex !== -1) {
        const user = storedUsers[userIndex];
        const newBalance = user.accountBalance - withdrawAmountParsed;

        if (newBalance >= 0) {
          user.accountBalance = newBalance;
          user.transactionHistory = updatedTransaction;

          const updatedUsers = [...storedUsers];
          updatedUsers[userIndex] = user;

          setFormData({
            accountNumber: "",
            withdrawAmount: "",
          });

          setUserName("No user exists.");

          localStorage.setItem("userz", JSON.stringify(updatedUsers));
          alert(`Transaction successful.`);

          const storedUsers1 = JSON.parse(localStorage.getItem("userz")) || users;
          console.log(storedUsers1)
        } else {
          alert("Insufficient balance.");
        }
      } else {
        alert("User not found.");
      }
    } else {
      alert("Invalid withdrawal amount.");
    }
  };

  return (
    <div className="deposit-div">
      <div>
        <div className="heading-deposit">
          <BiMoneyWithdraw className="deposit-logo" />
          <h1>Withdraw</h1>
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
                  name="withdrawAmount"
                  value={withdrawAmount}
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

        {currentUser.role === "user" && (
            <form onSubmit={userOnSubmit}>
              <div className="form-group">
                <input
                  className="form-control-deposit"
                  type="number"
                  name="withdrawAmount"
                  value={withdrawAmount}
                  placeholder="Enter amount"
                  onChange={onChange}
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
  );
};

export default Withdraw;
