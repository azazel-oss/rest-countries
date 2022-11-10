import React from "react";
import Country from "./Country.jsx";

function CountryList(props) {
  return (
    <div>
      {props.countries.map((country) => {
        return <Country country={country} />;
      })}
    </div>
  );
}

export default CountryList;
