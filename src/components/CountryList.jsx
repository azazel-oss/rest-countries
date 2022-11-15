import React from "react";
import Country from "./Country.jsx";
import "./CountryList.css";

function CountryList(props) {
  return (
    <section className={"countries"} id={"countries"}>
      {props.countries.map((country) => {
        return <Country key={country["cca3"]} country={country} />;
      })}{" "}
    </section>
  );
}

export default CountryList;
