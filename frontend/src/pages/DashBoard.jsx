import React, { useState } from "react";

const DashBoard = ({ users }) => {
  const getUserData = JSON.parse(localStorage.getItem("userz"));
  const [activeUsers, setActiveUsers] = useState([]);

  const toggleUserActive = (accountNumber) => {
    if (activeUsers.includes(accountNumber)) {
      setActiveUsers(activeUsers.filter((user) => user !== accountNumber));
    } else {
      setActiveUsers([...activeUsers, accountNumber]);
    }
  };

  return (
    <div>
      <h1>Database</h1>
      <div>
        {getUserData
          ? getUserData.map((user) => (
              <div className="flexit" key={user.accountNumber}>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.userName}</li>
                <li>{user.accountNumber}</li>
                <li>{user.accountBalance}</li>
                <li>{user.income}</li>
              </div>
            ))
          : users.map((user) => (
              <div className="flexit" key={user.accountNumber}>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.userName}</li>
                <li>{user.accountNumber}</li>
                <li>{user.accountBalance}</li>
                <li>{user.income}</li>
                <li onClick={() => toggleUserActive(user.accountNumber)}>
                  Click me
                  {activeUsers.includes(user.accountNumber) &&
                    user.transactionHistory.map((transaction) => (
                      <div key={transaction.date}>
                        <li>{transaction.date}</li>
                        <li>{transaction.description}</li>
                        <li>{transaction.amount}</li>
                      </div>
                    ))}
                </li>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DashBoard;
