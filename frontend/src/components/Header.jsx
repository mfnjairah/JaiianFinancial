import React from "react";
// import { FaSignInAlt, FaUser } from "react-icons/fa";
import { RiLuggageDepositFill, RiBankCard2Fill } from "react-icons/ri";
import {
  BiMoneyWithdraw,
  BiTransferAlt,
  BiLogIn,
  BiLogOut,
} from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { BsBank2, BsFillDatabaseFill, BsFillPieChartFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn, handleLogoutBtn, currentUser }) => {
  return (
    <header className="header">
      <div className="container">
        <div>
          <Link to="/dashboard" className="logo-div" title="Homepage">
            <BsBank2 className="logo" />
            <span className="logo-text">JaiianFinancial</span>
          </Link>
        </div>

        {isLoggedIn ? (
          <ul className="navigations">
            {currentUser.role === "admin" && (
              <li>
                <Link to="/dashboard" className="nav-a">
                  <BsFillDatabaseFill title="Database" />
                </Link>
              </li>
            )}
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
              <Link to="/transaction" className="nav-a">
              <RiBankCard2Fill title="Transactions" />
              </Link>
            </li>
            

              <li>
                <Link to="/budgetapplication" className="nav-a">
                  <BsFillPieChartFill title="Budget Application" />
                </Link>
              </li>

            {currentUser.role === "admin" && (
              <li>
                <Link to="/register" className="nav-a">
                  <SiGnuprivacyguard title="Register" />
                </Link>
              </li>
            )}
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
              <Link to="/settings" className="nav-a">
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
