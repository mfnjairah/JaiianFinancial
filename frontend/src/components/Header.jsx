import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Jaiian Financial</Link>
      </div>

      <ul>
        <li>
          <Link to="/deposit">
            <FaSignInAlt /> Deposit
          </Link>
        </li>
        <li>
          <Link to="/withdraw">
            <FaUser /> Withdraw
          </Link>
        </li>
        <li>
          <Link to="/transfer">
            <FaUser /> Transfer
          </Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
