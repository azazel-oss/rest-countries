import { createContext, useState } from "react";

const ThemeContext = createContext(null);

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevState) => {
      return prevState === "dark" ? "light" : "dark";
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
