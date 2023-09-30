import React, { useEffect, useState } from "react";

const Deposit = ({ users }) => {
  const [formData, setFormData] = useState({
    userName: "",
    accountNumber: "",
    accountBalance: "",
  });
  const [userName, setUserName] = useState("");
  const [enterAmount, setEnterAmout] = useState(false);

  const { accountNumber, accountBalance } = formData;
  useEffect(() => {
    if (accountNumber) {
      const user = users.find((user) => user.accountNumber === accountNumber);

      if (user) {
        setUserName(user.name);
        setEnterAmout(true);
      } else {
        setUserName("No user exists");
      }
    }
  }, [accountNumber]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("userz"));
    console.log(enterAmount);
    if (accountBalance >= 500) {
      const userIndex = storedUsers.findIndex(
        (user) => user.accountNumber === accountNumber
      );
      if (userIndex !== -1) {
        const updatedUser = { ...storedUsers[userIndex] };
        updatedUser.accountBalance =
          parseInt(updatedUser.accountBalance) + parseInt(accountBalance);
        console.log(updatedUser.accountBalance);
        storedUsers[userIndex] = updatedUser;

        localStorage.setItem("userz", JSON.stringify(storedUsers));
      }
    } else {
      alert("Must higher than 500");
    }
  };
  return (
    <div>
      <h1>Deposit</h1>
      {userName ? userName : <p>No user exists.</p>}
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
        {enterAmount && (
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
