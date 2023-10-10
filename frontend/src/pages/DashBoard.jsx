import React, { useState, useEffect } from "react";
import { AiOutlineTransaction, AiFillEdit } from "react-icons/ai";
import { BsFillPieChartFill } from "react-icons/bs";
import { RiBankCard2Fill, RiLuggageDepositFill } from "react-icons/ri";
import {
  BiMoneyWithdraw,
  BiTransferAlt,
} from "react-icons/bi";
import { GrNotes } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import "./DashBoard.css";
import { Link } from "react-router-dom";



const DashBoard = ({ users, currentUser }) => { 

  const startingData = JSON.parse(localStorage.getItem("userz")) || users;
  const loggedInUser = startingData.find((user) => user.accountNumber == currentUser.accountNumber);
  const noCurrentUser = startingData.filter(a => a.accountNumber !== currentUser.accountNumber)

  const [userData, setUserData] = useState(noCurrentUser);
  const [showModal, setShowModal] = useState('');

  //configuration data
  const [tblfullName, setTblFullName] = useState('');
  const [tblAccountNo, setTblAccountNo] = useState('');
  const [tblEmail, setTblEmail] = useState('');
  const [tblUserName, setTblUserName] = useState('');
  const [tblRole, setTblRole] = useState('');
  const [tblPassword, setTblPassword] = useState('');
  const [tblDataToMap, setTblDataToMap] = useState('');


  const [tblShowForm, setTblShowForm] = useState('');
  const convertedPass = tblPassword.split('').map(() => '*').join('');

  //for new
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  

  useEffect(() => { 
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem("userz")) || users;
    const noCurrentUser = userDataFromLocalStorage.filter(a => a.accountNumber !== currentUser.accountNumber)
    setUserData(noCurrentUser);
  }, [tblShowForm]);

  const changeNameOnSubmit = (e) => {

      e.preventDefault();

      if (newName !== tblfullName) {
        const updatedUsers = [...startingData];
        const userIndex = startingData.findIndex((user) => user.accountNumber == tblAccountNo);

        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          name: newName
        };

        setTblShowForm('');
        setTblFullName(newName);
        setNewName('')

        localStorage.setItem("userz", JSON.stringify(updatedUsers));
        alert(`Transaction successful.`);
      }
      else {
        alert(`Changes will not be saved. New Name and Old Name are same.`);
      }
  }

  const changeEmailOnSubmit = (e) => {

    e.preventDefault();

    if (newEmail !== tblEmail) {
      const updatedUsers = [...startingData];
      const userIndex = startingData.findIndex((user) => user.accountNumber == tblAccountNo);

      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        email: newEmail
      };

      setTblShowForm('');
      setTblEmail(newEmail);
      setNewEmail('');

      localStorage.setItem("userz", JSON.stringify(updatedUsers));
      alert(`Transaction successful.`);
    }
    else {
      alert(`Changes will not be saved. New Name and Old Name are same.`);
    }
}

const changeUserNameOnSubmit = (e) => {

  e.preventDefault();

  if (newUserName !== tblUserName) {
    const updatedUsers = [...startingData];
    const userIndex = startingData.findIndex((user) => user.accountNumber == tblAccountNo);

    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      userName: newUserName
    };

    setTblShowForm('');
    setTblUserName(newUserName);
    setNewUserName('');

    localStorage.setItem("userz", JSON.stringify(updatedUsers));
    alert(`Transaction successful.`);
  }
  else {
    alert(`Changes will not be saved. New Name and Old Name are same.`);
  }
}

const changePasswordOnSubmit = (e) => {

  e.preventDefault();

  if (newPassword === confPassword) {
    const updatedUsers = [...startingData];
    const userIndex = startingData.findIndex((user) => user.accountNumber == tblAccountNo);

    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword
    };

    setTblShowForm('');
    setTblPassword(newPassword);
    setNewPassword('');

    localStorage.setItem("userz", JSON.stringify(updatedUsers));
    alert(`Transaction successful.`);
  }
  else {
    alert(`Passwords doesn't match.`);
  }
}

const changeRoleOnSubmit = (e) => {

  e.preventDefault();

      const updatedUsers = [...startingData];
      const userIndex = startingData.findIndex((user) => user.accountNumber == tblAccountNo);

      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        role: newRole
      };

      setTblShowForm('');
      setTblRole(newRole);
      setNewRole('');

      localStorage.setItem("userz", JSON.stringify(updatedUsers));
      alert(`Transaction successful.`);
}

  return (
    <div>

      {currentUser.role === "user" && (
        <div>
          <div className="balance-holder">
            <h2>₱ {loggedInUser.accountBalance}.00</h2>
            <h4>Current Balance</h4>
          </div> 

          <div className="balance-holder tss">
            <h1>Welcome, {loggedInUser.name}!</h1>
            <div className="row-contain-tasks">
              <Link to="/deposit" className="link-tasks">
                <div className="task-holder">
                <RiLuggageDepositFill className="task-ic"/>
                <span className="task-sp">Deposit</span>
                </div>
              </Link>
              <Link to="/withdraw" className="link-tasks">
              <div className="task-holder">
                <BiMoneyWithdraw className="task-ic"/>
                <span className="task-sp">Withdraw</span>
              </div>
              </Link>
              <Link to="/transfer" className="link-tasks">
              <div className="task-holder">
                <BiTransferAlt className="task-ic"/>
                <span className="task-sp">Transfer</span>
              </div>
              </Link>
            </div>
          </div>
        </div>

      )}
      {currentUser.role === "admin" && (
              <div>
                <div className="table-div">
                  <div className="greetings">
                    <h2>Welcome, Administrator {currentUser.name}!</h2>
                  </div>
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
                          <td>{(user.accountBalance)}</td>
                          <td>{user.role}</td>
                          <td className="options-td">
                            <span className="options">
                              <RiBankCard2Fill className="option" title="Transactions" 
                                onClick={ (e) => {
                                  e.preventDefault();
                                  setTblDataToMap(user.transactionHistory);
                                  setTblFullName(user.name);
                                  setTblAccountNo(user.accountNumber);
                                  setShowModal("transaction");
                                }} 
                              />
                              <BsFillPieChartFill className="option" title="Budget Application"
                              onClick={ (e) => {
                                e.preventDefault();
                                setTblDataToMap(user.budgetApplication);
                                setTblFullName(user.name);
                                setTblAccountNo(user.accountNumber);
                                setShowModal('budgetApp')
                              }}
                              />
                              <AiFillEdit className="option" 
                              onClick={ (e) => {
                                e.preventDefault();
                                setTblFullName(user.name);
                                setTblAccountNo(user.accountNumber);
                                setTblEmail(user.email);
                                setTblRole(user.role)
                                setTblUserName(user.userName)
                                setTblPassword(user.password)
                                setShowModal('edit');
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

        {showModal === "edit" && (
          <div id="myModal" className="modal">
              <div className="conf-content">
                <div className="close-container">
                  <div className="title-container"><AiFillEdit className="modal-icon"/><span className="modal-title">Configure this Account</span></div>
                  <div className="x-container"><span className="close" 
                    onClick={ (e) => {
                      setShowModal('')
                      setTblShowForm('');
                    }}>&times;</span></div>
                </div>
                <div className="data-container">

                    <div>
                      <FaUser className="conf-user-icon"/>
                    </div>
                    <div className="detail-container">
                      <span className="full-name-holder">{tblfullName}<AiFillEdit className="conf-icon" 
                      onClick={ e => {
                        if(tblShowForm !== "changeName") {
                          setTblShowForm("changeName");
                        }
                        else {
                          setTblShowForm("");
                        }
                        }} /></span>
                      {tblShowForm === "changeName" && (
                        <form onSubmit={changeNameOnSubmit}>
                          <div className="detail-form-holder">
                            <input className = "detail-input" type="text" pattern="[a-zA-Z ]+" title="Please Use Only Aphabet Characters and Spaces." onChange={e => {setNewName(e.target.value)}} required></input>
                            <button className="detail-form-submit">Update</button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="detail-container">
                      <span className="detail-info-holder">Email: {tblEmail} <AiFillEdit className="conf-icon" 
                      onClick={ e => {
                        if(tblShowForm !== "changeEmail") {
                          setTblShowForm("changeEmail");
                        }
                        else {
                          setTblShowForm("");
                        }
                        }} /></span>
                      {tblShowForm === "changeEmail" && (
                        <form onSubmit={changeEmailOnSubmit}>
                          <div className="detail-form-holder">
                            <input className = "detail-input" type="email" onChange={e => {setNewEmail(e.target.value)}} required></input>
                            <button className="detail-form-submit">Update</button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="detail-container">
                      <span className="detail-info-holder">Username: {tblUserName} <AiFillEdit className="conf-icon" 
                      onClick={ e => {
                        if(tblShowForm !== "changeUserName") {
                          setTblShowForm("changeUserName");
                        }
                        else {
                          setTblShowForm("");
                        }
                        }} /></span>
                      {tblShowForm === "changeUserName" && (
                        <form onSubmit={changeUserNameOnSubmit}>
                          <div className="detail-form-holder">
                            <input className = "detail-input" type="text" pattern = "[a-zA-Z][a-zA-Z0-9-_.]" title="Please Use Only Aphabet Characters and Numbers. Period, dash and underscore are allowed." onChange={e => {setNewUserName(e.target.value)}} required></input>
                            <button className="detail-form-submit">Update</button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="detail-container">
                      <span className="detail-info-holder">Password: {convertedPass} <AiFillEdit className="conf-icon" 
                      onClick={ e => {
                        if(tblShowForm !== "changePassword") {
                          setTblShowForm("changePassword");
                        }
                        else {
                          setTblShowForm("");
                        }
                        }} /></span>
                      {tblShowForm === "changePassword" && (
                        <form onSubmit={changePasswordOnSubmit}>
                          <div className="detail-form-holder">
                            <input className = "detail-input-pass" type="password" placeholder = "New Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={e => {setNewPassword(e.target.value)}} required></input>
                            <input className = "detail-input-pass" type="password"  placeholder = "Confirm Password" onChange={e => {setConfPassword(e.target.value)}} required></input>
                          </div>
                          <div className="button-pass"><button className="detail-form-submit-pass">Update</button></div>
                        </form>
                      )}
                    </div>

                    <div className="detail-container">
                      <span className="detail-info-holder">Role: {tblRole} <AiFillEdit className="conf-icon" 
                      onClick={ e => {
                        if(tblShowForm !== "changeRole") {
                          setTblShowForm("changeRole");
                        }
                        else {
                          setTblShowForm("");
                        }
                        }} /></span>
                      {tblShowForm === "changeRole" && (
                        <form onSubmit={changeRoleOnSubmit}>
                          <div className="detail-form-holder">
                            {/* <input className = "detail-input" type="email" onChange={e => {setNewEmail(e.target.value)}} required></input> */}
                            <div className="radio-buts">
                              <div className="rad-container">
                                <input type="radio" className="rad" name="fav_language" onMouseDown={e => {setNewRole("admin")}}></input>
                                <label className="rad">admin</label>
                                </div>
                              <div className="rad-container">
                                <input type="radio"  name="fav_language" onMouseDown={e => {setNewRole("user")}}></input>
                                <label className="rad">user</label>
                              </div>
                            </div>
                            <button className="detail-form-submit">Update</button>
                          </div>
                        </form>
                      )}
                    </div>
                </div>
              </div>
          </div>
        )}

        {showModal === "budgetApp" && (
          <div id="myModal" class="modal">
            <div class="modal-content">
              <div className="close-container">
                <div className="title-container"><RiBankCard2Fill className="modal-icon"/><span className="modal-title">Budget Application</span></div>
                <div className="x-container"><span class="close" onClick={ (e) => setShowModal('')}>&times;</span></div>
              </div>
               <div className="data-container">
                  <table className= "dash-data-table">
                    <thead>
                      <tr>
                        <th className="modal-tbl-th-deets tit" colSpan={2}>{tblfullName}'s Budget Application</th>
                        
                      </tr>
                      <tr>
                        <th className="modal-tbl-th">Item Name</th>
                        <th className="modal-tbl-th">Amount</th>
                      </tr>
                    </thead>
                      <tbody>
                        {tblDataToMap.map((user) => (
                          <tr key={user.ID}>          
                            <td className="modal-tbl-td">{user.ItemName}</td>
                            <td className="modal-tbl-td">{user.amount}</td>                    
                          </tr>          
                        ))}
                        <tr>
                          <th className="modal-tbl-th-deets right" colSpan="2">Client's Account Number: {tblAccountNo}</th>
                      </tr>                    
                      </tbody>
                  </table>
                </div>
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
                    <table className= "dash-data-table">
                      <thead>
                        <tr>
                        <th className="modal-tbl-th-deets tit" colSpan={3}>{tblfullName}'s Transaction History</th>
                        </tr>
                        <tr>
                          <th className="modal-tbl-th">Date</th>
                          <th className="modal-tbl-th">Description</th>
                          <th className="modal-tbl-th">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tblDataToMap.map((user) => (
                          <tr key={user.ID}>
                            <td className="modal-tbl-td">{user.date}</td>
                            <td className="modal-tbl-td">{user.description}</td>
                            <td className="modal-tbl-td">{user.amount}</td>
                          </tr>
                        ))}
                        <tr>
                          <th className="modal-tbl-th-deets right" colSpan="3">Client's Account Number: {tblAccountNo}</th>
                      </tr>   
                      </tbody>
                    </table>
                </div>
              </div>
          </div>
      )}


    </div>
      
  )


}

export default DashBoard;
