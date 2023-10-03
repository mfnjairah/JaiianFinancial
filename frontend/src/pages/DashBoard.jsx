import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import { AiOutlineTransaction, AiFillEdit } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";

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

  return (
    <div>
      <div className="table-user-div">
        <div>
          <h1>Welcome, {currentUser.name}!</h1>
          <h1>Current Balance: {currentUser.accountBalance}</h1>
        </div>
      </div>
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
