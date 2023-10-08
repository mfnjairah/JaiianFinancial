import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import { AiOutlineTransaction, AiFillEdit } from "react-icons/ai";
import { BsFillPieChartFill } from "react-icons/bs";
import { RiBankCard2Fill } from "react-icons/ri";
import { GrNotes } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const DashBoard = ({ users, currentUser }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(
    currentUser.accountBalance
  );
  const currency = new Intl.NumberFormat("en-us");

  const [dataToMap, setDataToMap] = useState('');
  const [name, setName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [accountBal, setAccountBal] = useState('');

  const [showModal, setShowModal] = useState(''); 

  useEffect(() => {
    const userDataFromLocalStorage =
      JSON.parse(localStorage.getItem("userz")) || users;
    setUserData(userDataFromLocalStorage);

    const user = users.find(
      (user) => user.accountNumber === currentUser.accountNumber
    );
    setCurrentBalance(user.accountBalance);
  }, [users, currentUser]);

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
          <h1>Welcome, {currentUser.name.split(" ")[0]}!</h1>
          <h1>Account ID: {currentUser.accountNumber}</h1>
          {/* <h1>Current Balance: {currency.format(currentBalance)}</h1> */}
        </div>
        <div className="align-right">
          <h1>
            Role:{" "}
            {currentUser.role[0].toUpperCase() + currentUser.role.slice(1)}
          </h1>
          <h1>Current Balance: {currency.format(currentBalance)}</h1>
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
                    <td>{currency.format(user.accountBalance)}</td>
                    <td>{user.role}</td>
                    <td className="options-td">
                      <span className="options">
                        <RiBankCard2Fill className="option" title="Transactions" 
                          onClick={ (e) => {
                            e.preventDefault();
                            setDataToMap(user.transactionHistory);
                            setName(user.name);
                            setAccountNo(user.accountNumber);
                            setShowModal("transaction");
                          }} 
                        />
                        <BsFillPieChartFill className="option" title="Budget Application"
                        onClick={ (e) => {
                          e.preventDefault();
                          setDataToMap(user.transactionHistory);
                          setName(user.name);
                          setAccountNo(user.accountNumber);
                          setShowModal('budgetApp')
                        }}
                        />
                        <AiFillEdit className="option" 
                        onClick={ (e) => {
                          e.preventDefault();
                          setDataToMap(user.transactionHistory);
                          setName(user.name);
                          setAccountNo(user.accountNumber);
                          setShowModal('edit')
                        }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal === "transaction" && (
          <div id="myModal" class="modal">
              <div class="modal-content">
                <div className="close-container">
                  <div className="title-container"><RiBankCard2Fill className="modal-icon"/><span className="modal-title">Transaction History</span></div>
                  <div className="x-container"><span class="close" onClick={ (e) => setShowModal('')}>&times;</span></div>
                </div>
                <div className="data-container">
                    <span>Transaction History</span>
                </div>
              </div>
          </div>
      )}

      {showModal === "budgetApp" && (
          <div id="myModal" class="modal">
              <div class="modal-content">
                <div className="close-container">
                  <div className="title-container"><BsFillPieChartFill className="modal-icon"/><span className="modal-title">Budget Application</span></div>
                  <div className="x-container"><span class="close" onClick={ (e) => setShowModal('')}>&times;</span></div>
                </div>
                <div className="data-container">
                    <span>Budget Application</span>
                </div>
              </div>
          </div>
      )}

      {showModal === "edit" && (
          <div id="myModal" class="modal">
              <div class="modal-content">
                <div className="close-container">
                  <div className="title-container"><BsFillPieChartFill className="modal-icon"/><span className="modal-title">Configure this Account</span></div>
                  <div className="x-container"><span class="close" onClick={ (e) => setShowModal('')}>&times;</span></div>
                </div>
                <div className="data-container">
                    <span>Configure this Account</span>
                </div>
              </div>
          </div>
      )}
    </div>
  );

};

export default DashBoard;
