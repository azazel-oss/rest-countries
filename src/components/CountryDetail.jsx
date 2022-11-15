import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext.jsx";
import "./CountryDetail.css";

function CountryDetail() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState({});
  const [countryBorders, setCountryBorders] = useState(null);
  const { theme } = useContext(ThemeContext);
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
      if (!borders) {
        setCountryBorders([]);
        return;
      }
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
    <div className={`details details-${theme}`}>
      {countryData && Object.keys(countryData).length > 0 && countryBorders ? (
        <div>
          <Link className={"btn btn-back"} to={"/"}>
            <i className={"fa-solid fa-left-long"}></i>
            Back
          </Link>
          <div className={"details-flex"}>
            <div className={"img-container"}>
              <img
                src={`${countryData.flags.png}`}
                alt={`${countryData.name.common} flag`}
              />
            </div>
            <div className={"details-container"}>
              <div>
                <h2>{countryData.name.common}</h2>
                <section className={"country-detail-container"}>
                  <div>
                    <div>
                      <span className={"detail-label"}>Native name: </span>
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
                    <div>
                      <span className={"detail-label"}>Population: </span>
                      {countryData.population.toLocaleString()}
                    </div>
                    <div>
                      <span className={"detail-label"}>Region: </span>
                      {countryData.region}
                    </div>
                    <div>
                      <span className={"detail-label"}>Sub Region: </span>
                      {countryData.subregion}
                    </div>
                    <div>
                      <span className={"detail-label"}>Capital: </span>
                      {countryData.capital.join(", ")}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className={"detail-label"}>Top Level Domain: </span>
                      {countryData.tld.join(", ")}
                    </div>
                    <div>
                      <span className={"detail-label"}>Currencies: </span>
                      {Object.keys(countryData.currencies)
                        .map(
                          (currency) => countryData.currencies[currency].name
                        )
                        .join(", ")}
                    </div>
                    <div>
                      <span className={"detail-label"}>Languages: </span>
                      {Object.keys(countryData.languages)
                        .map((language) => countryData.languages[language])
                        .join(", ")}
                    </div>
                  </div>
                </section>
                <div>
                  <span className={"detail-label"}>Border countries: </span>
                  {countryBorders && countryBorders.length > 0 ? (
                    countryBorders.map((border) => (
                      <Link
                        className={"btn btn-borders"}
                        key={border.code}
                        to={`/${border.code}`}
                      >
                        {border.name}
                      </Link>
                    ))
                  ) : (
                    <span>None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={"loader"}>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetail;
