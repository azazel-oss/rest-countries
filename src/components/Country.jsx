import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Country.css";
import { ThemeContext } from "../context/ThemeContext.jsx";

function Country({ country }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Link className={`country country-${theme}`} to={`/${country["cca3"]}`}>
      <img alt={`${country.name.common} flag`} src={country.flags.png} />

      <div className={"country-details"}>
        <div className={"country-name"}>{country.name.common}</div>
        <div>
          <div>
            <span className={"country-head"}>Population:</span>{" "}
            {country.population.toLocaleString()}
          </div>
          <div>
            <span className={"country-head"}>Region:</span> {country.region}
          </div>
          {country.capital && (
            <div>
              <span className={"country-head"}>Capital:</span>{" "}
              {country.capital.join(", ")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Country;
