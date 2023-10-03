import React from "react";
// import { FaSignInAlt, FaUser } from "react-icons/fa";
import { RiLuggageDepositFill } from "react-icons/ri";
import {
  BiMoneyWithdraw,
  BiTransferAlt,
  BiLogIn,
  BiLogOut,
} from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { BsBank2 } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn, handleLogoutBtn }) => {
  return (
    <header className="header">
      <div className="container">
        <div>
          <Link to="/dashboard" className="logo-div" title="Dashboard">
            <BsBank2 className="logo" />
            <span className="logo-text">JaiianFinancial</span>
          </Link>
        </div>

        {isLoggedIn ? (
          <ul className="navigations">
            <li>
              <Link to="/deposit" className="nav-a">
                <RiLuggageDepositFill title="Deposit" />
              </Link>
            </li>
            <li>
              <Link to="/withdraw" className="nav-a">
                <BiMoneyWithdraw title="Withdraw" />
              </Link>
            </li>
            <li>
              <Link to="/transfer" className="nav-a">
                <BiTransferAlt title="Transfer" />
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-a">
                <SiGnuprivacyguard title="Register" />
              </Link>
            </li>
          </ul>
        ) : null}

        {!isLoggedIn ? (
          <ul className="navigations">
            <li>
              <Link to="/" className="nav-a">
                <BiLogIn title="Login" />
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-a">
                <SiGnuprivacyguard title="Register" />
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navigations">
            <li>
              <Link to="/logout" className="nav-a">
                <BiLogOut title="Logout" onClick={handleLogoutBtn} />
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-a">
                <FiSettings title="Settings" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
