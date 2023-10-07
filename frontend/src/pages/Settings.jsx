import { FiSettings } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import "./Settings.css";
import { useState } from "react";


const Settings = ({ users, currentUser }) => {

const [buttonClicked, setButtonClicked] = useState('');

const originalString = currentUser.password;
const convertedString = originalString.split('').map(() => '*').join('');


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
                                <span className="table-value-long">{currentUser.name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-desc">Email</td>
                            <td className= "table-value">
                                <span className="table-value-long">{currentUser.email}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "") {
                                    setButtonClicked("Email");
                                    }
                                    else if (buttonClicked === "Email"){
                                        setButtonClicked("");
                                    }
                                }}>
                                <AiFillEdit className="trans-icon"/></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-desc">Username</td>
                            <td className= "table-value">
                                <span className="table-value-long">{currentUser.userName}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "") {
                                    setButtonClicked("Username");
                                    }
                                    else if (buttonClicked === "Username"){
                                        setButtonClicked("");
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
                                    if (buttonClicked === "") {
                                    setButtonClicked("Password");
                                    }
                                    else if (buttonClicked === "Password"){
                                        setButtonClicked("");
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
                        <div className="settings-form-container">
                            <input className = "input-item-name"
                            placeholder="Insert Old Password"
                            />
                            <input className = "input-item-name"
                            placeholder="Insert New Password"
                            />
                            <input className = "input-item-name"
                            placeholder="Confirm New Password"
                            />
                            <button className= "add-item-button">Submit</button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    </div>
  )
 
};

export default Settings;
