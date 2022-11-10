import Header from "./components/Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList.jsx";

function App() {
  let timer = null;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [region, setRegion] = useState("default");
  const [countryData, setCountryData] = useState([]);
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
      if (!countryName || !regionName) return;
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
      console.log(newData.data);
    }
    fetchData(debouncedSearchTerm, region);
  }, [debouncedSearchTerm, region]);
  return (
    <div>
      <Header />
      <section id={"query"}>
        <input value={searchTerm} onChange={inputChangeHandler} />
        <select
          value={region}
          placeholder={"Select Region"}
          name={"Region"}
          onChange={regionChangeHandler}
        >
          <option defaultValue disabled value={"default"}>
            Please select region
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
    </div>
  );
}

export default App;
