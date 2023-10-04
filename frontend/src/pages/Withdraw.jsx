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

  const onSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
    const withdrawAmountParsed = parseInt(withdrawAmount);

    if (withdrawAmountParsed > 0) {
      const userIndex = storedUsers.findIndex(
        (user) => user.accountNumber == accountNumber
      );

      if (userIndex !== -1) {
        const user = storedUsers[userIndex];
        const newBalance = user.accountBalance - withdrawAmountParsed;

        if (newBalance >= 0) {
          user.accountBalance = newBalance;

          const updatedUsers = [...storedUsers];
          updatedUsers[userIndex] = user;

          setFormData({
            accountNumber: "",
            withdrawAmount: "",
          });

          setUserName("No user exists.");

          localStorage.setItem("userz", JSON.stringify(updatedUsers));
          alert(`Transaction successful.`);
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
      </div>
    </div>
  );
};

export default Withdraw;
