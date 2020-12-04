import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => (
  <header>
    <div className="fl">
      <button type="button">
        <img src="/images/misc/user.png" alt="User Settings" />
      </button>
    </div>

    <div className="fl">
      <Link to="/">
        <Logo />
      </Link>
    </div>

    <div className="fl">
      <Link to="/matches">
        <button type="button">
          <img src="/images/misc/messages.png" alt="View Messages" />
        </button>
      </Link>
    </div>
  </header>
);

export default Header;
