import React, { useEffect, useState } from "react";

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

        localStorage.setItem("userz", JSON.stringify(updatedUsers));
      }
    } else {
      alert("Amount must be higher than 500");
    }
  };

  return (
    <div>
      <h1>Deposit</h1>
      {userName && <p>{userName}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="accountNumber"
            value={accountNumber}
            placeholder="Enter user id"
            onChange={onChange}
            required
          />
        </div>
        {userName !== "No user exists" && (
          <div className="form-group">
            <input
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
