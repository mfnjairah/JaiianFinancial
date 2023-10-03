import React, { useState } from "react";
import "./DashBoard.css";
import { AiOutlineTransaction, AiFillEdit } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";

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
      {/* <h1>Database</h1> */}
      <div>
        {getUserData ? (
          getUserData.map((user) => (
            <div className="flexit" key={user.accountNumber}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.userName}</li>
              <li>{user.accountNumber}</li>
              <li>{user.accountBalance}</li>
              <li>{user.income}</li>
            </div>
          ))
        ) : (
          <div className="table-div">
            <table className="table">
              <tr className="table-row">
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>ID</th>
                <th>Balance</th>
                <th>Role</th>
                <th>Options</th>
              </tr>
              {users.map((user) => (
                <tr className="table-data" key={user.accountNumber}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>{user.accountNumber}</td>
                  <td>{user.accountBalance}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className="options">
                      <AiOutlineTransaction className="option" />
                      <GrNotes className="option" />
                      <AiFillEdit className="option" />
                    </span>
                  </td>
                  {/* <li onClick={() => toggleUserActive(user.accountNumber)}>
                    Click me
                    {activeUsers.includes(user.accountNumber) &&
                      user.transactionHistory.map((transaction) => (
                        <div key={transaction.date}>
                          <li>{transaction.date}</li>
                          <li>{transaction.description}</li>
                          <li>{transaction.amount}</li>
                        </div>
                      ))}
                  </li> */}
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
