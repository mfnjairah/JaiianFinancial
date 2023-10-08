import { FiSettings } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import "./Settings.css";
import { useState } from "react";


const Settings = ({ users, currentUser }) => {

const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
const LoggedInUser = storedUsers.find((user) => user.name == currentUser.name);

// Form Setter when edit icon clicked
const [buttonClicked, setButtonClicked] = useState('');

// Table Data
const [tabPass, setTabPass] = useState(LoggedInUser.password);
const [tabUname, setTabUname] = useState(LoggedInUser.userName);
const [tabEmail, setTabEmail] = useState(LoggedInUser.email);

// Convert password String to "*"
const originalString = tabPass;
const convertedString = originalString.split('').map(() => '*').join('');

// For change password feature
const [oldPass, setOldPass] = useState('');
const [insPass, setInsPass] = useState('');
const [changeNewPass, setChangeNewPass] = useState('');


// For change username feature
const [newUname, setNewUname] = useState('');
const [CUPassword, setCUPassword] = useState('');

// For change email feature
const [newEmail, setNewEmail] = useState('');
const [CEPassword, setCEPassword] = useState('');


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

const changeUnameSubmit = (e) => {
    e.preventDefault();
    const userIndex = storedUsers.findIndex((user) => user.accountNumber == currentUser.accountNumber);
    
    if (CUPassword === LoggedInUser.password) {
        if(newUname !== LoggedInUser.userName) {
            const updatedUsers = [...storedUsers];
            const newUsername = newUname;

            updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                userName: newUsername
            };

            setNewUname('');
            setCUPassword('');
            setTabUname(newUsername);

            localStorage.setItem("userz", JSON.stringify(updatedUsers));
            alert(`Transaction successful.`);

        }
        else {
            alert("Old Username Can't Be Your New Username.")
        }       
    }
    else {
        alert("Wrong Credentials.")
    }
}

const changeEmailSubmit = (e) => {
    e.preventDefault();
    const userIndex = storedUsers.findIndex((user) => user.accountNumber == currentUser.accountNumber);

    if (CEPassword === LoggedInUser.password) {
        if(newEmail !== LoggedInUser.email) {
            const updatedUsers = [...storedUsers];
            const newEmaill = newEmail;

            updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                email: newEmaill
            };

            setTabEmail(newEmaill);
            setNewEmail('');
            setCEPassword('');

            localStorage.setItem("userz", JSON.stringify(updatedUsers));
            alert(`Transaction successful.`);
        }
        else {
            alert("Old Email Can't Be Your New Email.")
        }
    }
    else {
        alert('Wrong Credentials.')
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
                                <span className="table-value-long">{tabEmail}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "Email") {
                                        setNewEmail("");
                                        setCEPassword("");
                                        setButtonClicked("");
                                    }
                                    else {
                                        setNewEmail("");
                                        setCEPassword("");
                                        setButtonClicked("Email");
                                    }
                                }}>
                                <AiFillEdit className="trans-icon"/></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-desc">Username</td>
                            <td className= "table-value">
                                <span className="table-value-long">{tabUname}</span>
                                <span className="table-button" 
                                    onClick={(e) => {
                                    e.preventDefault();
                                    if (buttonClicked === "Username") {
                                        setNewUname('');
                                        setCUPassword('');
                                        setButtonClicked("");
                                    }
                                    else {
                                        setNewUname('');
                                        setCUPassword('');
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
                                        setOldPass('')
                                        setInsPass('')
                                        setChangeNewPass('')
                                        setButtonClicked("");
                                    }
                                    else {
                                        setOldPass('')
                                        setInsPass('')
                                        setChangeNewPass('')
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
                        <form className="settings-form-container" onSubmit={changeEmailSubmit}>
                            <div className="settings-form-container">
                                <input className = "input-item-name"
                                placeholder="Insert New Email"
                                onChange={e => {
                                    setNewEmail(e.target.value)
                                }}
                                value={newEmail}
                                required
                                />
                                <input className = "input-item-name"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={e => {
                                    setCEPassword(e.target.value)
                                }}
                                value={CEPassword}
                                required
                                />

                                <button className= "add-item-button">Submit</button>
                            </div>
                        </form>
                    </div>
                )}
                {buttonClicked === "Username" && (
                    <div className="config-container">
                        <h1>Username Configuration</h1>
                        <form className="settings-form-container" onSubmit={changeUnameSubmit}>
                            <div className="settings-form-container">
                                <input className = "input-item-name"
                                placeholder="Insert New Username"
                                onChange={e => {
                                    setNewUname(e.target.value)
                                }}
                                value={newUname}
                                required
                                />
                                <input className = "input-item-name"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={e => {
                                    setCUPassword(e.target.value)
                                }}
                                value={CUPassword}
                                required
                                />

                                <button className= "add-item-button">Submit</button>
                            </div>
                        </form>
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
                                required
                                />

                                <input className = "input-item-name"
                                placeholder="Insert New Password"
                                value={insPass}
                                onChange={e => {
                                    setInsPass(e.target.value)
                                }}
                                type="password"
                                required
                                />

                                <input className = "input-item-name"
                                placeholder="Confirm New Password"
                                value={changeNewPass}
                                onChange={e => {
                                    setChangeNewPass(e.target.value)
                                }}
                                type="password"
                                required
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
