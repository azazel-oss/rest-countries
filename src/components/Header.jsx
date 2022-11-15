import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ theme, onThemeToggle }) {
  return (
    <header>
      <nav>
        <Link to={"/rest-countries/"}>
          <h3>Where in the world!</h3>
        </Link>
        <span className={"theme-toggle"} onClick={onThemeToggle}>
          <i
            className={`fa-solid fa-${theme === "light" ? "moon" : "sun"}`}
          ></i>
          {theme === "light" ? "Dark" : "Light"} theme
        </span>
      </nav>
    </header>
  );
}

export default Header;
