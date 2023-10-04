import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import { AiOutlineTransaction, AiFillEdit } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";
import "./DashboardUser.css"

const DashBoard = ({ users, currentUser }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem("userz"));
    if (userDataFromLocalStorage) {
      setUserData(userDataFromLocalStorage);
    } else {
      setUserData(users);
    }
  }, [users]);

  const toggleUserActive = (accountNumber) => {
    setActiveUsers((prevActiveUsers) => {
      if (prevActiveUsers.includes(accountNumber)) {
        return prevActiveUsers.filter((user) => user !== accountNumber);
      } else {
        return [...prevActiveUsers, accountNumber];
      }
    });
  };
  console.log(currentUser)

  return (
    <div>
      { currentUser.role === "user" && (
          <div className="table-user-div">
          <div className = "main-container">
                    <div className="grid-container">
                        <div className="balance-container">
                            <div className="balance-holder">
                              <span className = "balance-title">Current Balance:</span>
                              <span className = "main-balance">P{currentUser.accountBalance}.00</span>
                            </div>
                            <div className="user-info-container">
                              <span>{currentUser.name}</span>
                              <span>{currentUser.accountNumber}</span>
                            </div>
                        </div>
                        <button className="nav-button">Deposit</button>
                        <button className="nav-button">Withdraw</button>
                        <button className="nav-button">Send Money</button>
                        <button className="nav-button">Transactions</button>
                        <button className="nav-button budget-app-button">Budget Application</button>
                    </div>
            </div>
        </div>
      )}


      {currentUser.role === "admin" && (
        <div>
          <div className="table-div">
            <table className="table">
              <thead>
                <tr className="table-row">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>ID</th>
                  <th>Balance</th>
                  <th>Role</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
