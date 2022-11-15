import React, { useContext } from "react";
import "./Header.css";
import { ThemeContext } from "../context/ThemeContext.jsx";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header>
      <nav className={`nav-${theme}`}>
        <h3>Where in the world!</h3>
        <span onClick={toggleTheme}>
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
