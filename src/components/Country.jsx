import React from "react";
import { Link } from "react-router-dom";

function Country({ country }) {
  return (
    <Link to={`/${country["cca3"]}`}>
      <img alt={`${country.name.common} flag`} src={country.flags.png} />
      <div>{country.name.common}</div>
      <div>
        <div>Population: {country.population}</div>
        <div>Region: {country.region}</div>
        {country.capital && <div>Capital: {country.capital.join(", ")}</div>}
      </div>
    </Link>
  );
}

export default Country;
