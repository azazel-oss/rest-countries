import React, { useContext } from "react";
import Country from "./Country.jsx";
import "./CountryList.css";
import { ThemeContext } from "../context/ThemeContext.jsx";

function CountryList(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={`countries-${theme}`} id={"countries"}>
      {props.countries.map((country) => {
        return <Country key={country["cca3"]} country={country} />;
      })}{" "}
    </section>
  );
}
export default CountryList;
