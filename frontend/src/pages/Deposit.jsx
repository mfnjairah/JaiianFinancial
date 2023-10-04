import React, { useEffect, useState } from "react";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import "./Deposit.css";

const Deposit = ({ users }) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountBalance: "",
  });
  const [userName, setUserName] = useState("No user exists");

  const { accountNumber, accountBalance } = formData;

  useEffect(() => {
    if (accountNumber) {
      const user = users.find((user) => user.accountNumber === accountNumber);
      if (user) {
        setUserName(user.name);
      } else {
        setUserName("No user exists");
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

  const onSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || [];

    if (accountBalance >= 500) {
      const userIndex = storedUsers.findIndex(
        (user) => user.accountNumber === accountNumber
      );

      if (userIndex !== -1) {
        const updatedUsers = [...storedUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          accountBalance:
            parseInt(updatedUsers[userIndex].accountBalance) +
            parseInt(accountBalance),
        };

        setFormData({
          accountNumber: "",
          accountBalance: "",
        });

        localStorage.setItem("userz", JSON.stringify(updatedUsers));
        alert(`Transaction successful.`);
      }
    } else {
      alert("Amount must be higher than 500");
    }
  };

  return (
    <div className="deposit-div">
      <div>
        <div className="heading-deposit">
          <RiLuggageDepositFill className="deposit-logo" />
          <h1>Deposit</h1>
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
          {userName !== "No user exists" && (
            <div className="form-group">
              <input
                className="form-control-deposit"
                type="number"
                name="accountBalance"
                value={accountBalance}
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

export default Deposit;
