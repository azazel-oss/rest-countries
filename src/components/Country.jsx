import React from "react";

function Country({ country }) {
  return (
    <div>
      <img alt={`${country.name.common} flag`} src={country.flags.png} />
      <div>{country.name.common}</div>
      <div>
        <div>Population: {country.population}</div>
        <div>Region: {country.region}</div>
        <div>Capital: {country.capital.join(", ")}</div>
      </div>
    </div>
  );
}

export default Country;
