import { FiSettings } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import "./Settings.css";
import { useState } from "react";


const Settings = ({ users, currentUser }) => {

const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
const LoggedInUser = storedUsers.find((user) => user.name == currentUser.name);

const [buttonClicked, setButtonClicked] = useState('');
const [tabPass, setTabPass] = useState(LoggedInUser.password);

const originalString = tabPass;
const convertedString = originalString.split('').map(() => '*').join('');

const [oldPass, setOldPass] = useState('');
const [insPass, setInsPass] = useState('');
const [changeNewPass, setChangeNewPass] = useState('');


const changePassSubmit = (e) => {
    e.preventDefault();
    const userIndex = storedUsers.findIndex((user) => user.accountNumber == currentUser.accountNumber);
    
    if(oldPass != insPass && oldPass != changeNewPass) {
        if (oldPass === LoggedInUser.password) {
            if(insPass === changeNewPass){
                const updatedUsers = [...storedUsers];
                const newPass = insPass;

                updatedUsers[userIndex] = {
                    ...updatedUsers[userIndex],
                    password: newPass
                };


                setTabPass(newPass.split('').map(() => '*').join(''))
                setOldPass('')
                setInsPass('')
                setChangeNewPass('')

                localStorage.setItem("userz", JSON.stringify(updatedUsers));
                alert(`Transaction successful.`);
            }
            else {
                alert("New Password Doesn't Match.")
            }
        }
        else {
            alert("Wrong Credentials.")
        }
    }
    else {
        alert("Old Password Can't Be Your New Password.")
    }
}

  return (
    <div className="register-div">
        <div className="content-holder">
            <section className="heading-register">
                <FiSettings className="register-logo" />
                <h1>Account Settings</h1>
            </section>
            <section className="info-table">
                <table className="settings-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-desc">Full Name</td>
                            <td className= "table-value-name">
                                <span className="table-value-long">{LoggedInUser.name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-desc">Email</td>
                            <td className= "table-value">
                                <span className="table-value-long">{LoggedInUser.email}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "Email") {
                                    setButtonClicked("");
                                    }
                                    else {
                                        setButtonClicked("Email");
                                    }
                                }}>
                                <AiFillEdit className="trans-icon"/></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-desc">Username</td>
                            <td className= "table-value">
                                <span className="table-value-long">{LoggedInUser.userName}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "Username") {
                                    setButtonClicked("");
                                    }
                                    else {
                                        setButtonClicked("Username");
                                    }
                                }}>
                                <AiFillEdit className="trans-icon"/></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-desc">Password</td>
                            <td className= "table-value">
                                <span className="table-value-long">{convertedString}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "Password") {
                                        setButtonClicked("");
                                    }
                                    else {
                                        setButtonClicked("Password");
                                    }
                                }}>
                                <AiFillEdit className="trans-icon"/></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                {buttonClicked === "Email" && (
                    <div className="config-container">
                        <h1>Email Configuration</h1>
                        <div className="settings-form-container">
                            <input className = "input-item-name"
                            placeholder="Insert New Email"
                            />
                            <input className = "input-item-name"
                            placeholder="Confirm Password"
                            />

                            <button className= "add-item-button">Submit</button>
                        </div>
                    </div>
                )}
                {buttonClicked === "Username" && (
                    <div className="config-container">
                        <h1>Username Configuration</h1>
                        <div className="settings-form-container">
                            <input className = "input-item-name"
                            placeholder="Insert New Username"
                            />
                            <input className = "input-item-name"
                            placeholder="Confirm Password"
                            />

                            <button className= "add-item-button">Submit</button>
                        </div>
                    </div>
                )}
                {buttonClicked === "Password" && (
                    <div className="config-container">
                        <h1>Username Configuration</h1>
                        <div>
                            <form className="settings-form-container" onSubmit={changePassSubmit}>
                                <input className = "input-item-name"
                                value={oldPass}
                                onChange={e => {
                                    setOldPass(e.target.value)
                                }}
                                placeholder="Insert Old Password"
                                type="password"
                                />

                                <input className = "input-item-name"
                                placeholder="Insert New Password"
                                value={insPass}
                                onChange={e => {
                                    setInsPass(e.target.value)
                                }}
                                type="password"
                                />

                                <input className = "input-item-name"
                                placeholder="Confirm New Password"
                                value={changeNewPass}
                                onChange={e => {
                                    setChangeNewPass(e.target.value)
                                }}
                                type="password"
                                />

                                <button className= "add-item-button">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </div>
    </div>
  )
 
};

export default Settings;
