import React from "react";
import { Link } from "react-router-dom";
import "./Country.css";

function Country({ country }) {
  return (
    <Link className={"country"} to={`/rest-countries/${country["cca3"]}`}>
      <article>
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
      </article>
    </Link>
  );
}

export default Country;
