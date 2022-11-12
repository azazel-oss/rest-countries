import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CountryDetail() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState({});
  const [countryBorders, setCountryBorders] = useState([]);
  useEffect(() => {
    async function fetchCountryData(code) {
      const countryData = await axios.get(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      setCountryData(countryData.data[0]);
    }
    fetchCountryData(countryCode);
    setCountryBorders([]);
  }, [countryCode]);
  useEffect(() => {
    if (!Object.keys(countryData).length) {
      return;
    }
    async function fetchBorders(borders) {
      let result = (
        await Promise.all(
          borders.map((border) =>
            axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
          )
        )
      ).map((border) => {
        return {
          name: border.data[0].name.common,
          code: border.data[0]["cca3"],
        };
      });

      setCountryBorders(result);
    }
    fetchBorders(countryData.borders);
  }, [countryData]);
  return (
    <>
      {countryData &&
      Object.keys(countryData).length > 0 &&
      countryBorders &&
      countryBorders.length > 0 ? (
        <div>
          <div>
            <Link to={"/"}>Back</Link>
          </div>
          <div>
            <img
              src={`${countryData.flags.png}`}
              alt={`${countryData.name.common} flag`}
            />
          </div>
          <div>
            <h4>{countryData.name.common}</h4>
          </div>
          <div>
            <div>
              Native name:{" "}
              {
                countryData.name.nativeName[
                  Object.keys(countryData.name.nativeName)[
                    Math.floor(
                      Math.random() *
                        Object.keys(countryData.name.nativeName).length
                    )
                  ]
                ].common
              }
            </div>
            <div>Population: {countryData.population.toLocaleString()}</div>
            <div>Region: {countryData.region}</div>
            <div>Sub Region: {countryData.subregion}</div>
            <div>Capital: {countryData.capital.join(", ")}</div>
          </div>
          <div>
            <div>Top Level Domain: {countryData.tld.join(", ")}</div>
            <div>
              Currencies:{" "}
              {Object.keys(countryData.currencies)
                .map((currency) => countryData.currencies[currency].name)
                .join(", ")}
            </div>
            <div>
              Languages:{" "}
              {Object.keys(countryData.languages)
                .map((language) => countryData.languages[language])
                .join(", ")}
            </div>
            <div>
              Border countries:
              {countryBorders.map((border) => (
                <Link key={border.code} to={`/${border.code}`}>
                  {border.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default CountryDetail;
