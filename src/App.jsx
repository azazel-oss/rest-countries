import Header from "./components/Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList.jsx";
import { Route, Routes } from "react-router-dom";
import CountryDetail from "./components/CountryDetail.jsx";
import "./App.css";

function App() {
  let timer = null;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [region, setRegion] = useState("default");
  const [countryData, setCountryData] = useState([]);
  const [theme, setTheme] = useState("dark");

  function toggleThemeHandler() {
    setTheme((prevState) => {
      return prevState === "dark" ? "light" : "dark";
    });
  }

  function inputChangeHandler(event) {
    setSearchTerm(event.target.value);
  }

  function regionChangeHandler(event) {
    setRegion(event.target.value);
  }

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    async function fetchData(countryName, regionName) {
      if (countryName) {
        const newData = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        if (regionName !== "default") {
          setCountryData(
            newData.data.filter((country) => {
              return country.region === regionName;
            })
          );
        } else setCountryData(newData.data);
      } else {
        const allCountries = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        if (regionName !== "default") {
          setCountryData(
            allCountries.data.filter((country) => {
              return country.region === regionName;
            })
          );
        } else setCountryData(allCountries.data);
      }
    }

    fetchData(debouncedSearchTerm, region);
  }, [debouncedSearchTerm, region]);
  return (
    <div id={"theme-main"} className={`app-${theme}`}>
      <Header theme={theme} onThemeToggle={toggleThemeHandler} />
      <main>
        <Routes>
          <Route
            path={"/rest-countries/"}
            element={
              <>
                <section className={"query-container"} id={"query"}>
                  <div className={"input__country"}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                      placeholder={"Search for a country..."}
                      value={searchTerm}
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <select
                    value={region}
                    placeholder={"Select Region"}
                    name={"Region"}
                    onChange={regionChangeHandler}
                  >
                    <option defaultValue disabled hidden value={"default"}>
                      Filter by region
                    </option>
                    <option value={"Asia"}>Asia</option>
                    <option value={"Africa"}>Africa</option>
                    <option value={"Americas"}>Americas</option>
                    <option value={"Antarctic"}>Antarctic</option>
                    <option value={"Europe"}>Europe</option>
                    <option value={"Oceania"}>Oceania</option>
                  </select>
                </section>
                <CountryList countries={countryData} />
              </>
            }
          />
          <Route
            path={"/rest-countries/:countryCode"}
            element={<CountryDetail />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
