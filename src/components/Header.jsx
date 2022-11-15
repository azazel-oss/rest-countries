import React, { useContext } from "react";
import "./Header.css";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { Link } from "react-router-dom";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header>
      <nav>
        <Link to={"/rest-countries/"}>
          <h3>Where in the world!</h3>
        </Link>
        <span className={"theme-toggle"} onClick={toggleTheme}>
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
