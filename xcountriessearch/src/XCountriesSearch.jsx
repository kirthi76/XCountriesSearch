import React, { useEffect, useState } from "react";
import "./XCountriesSearch.css";


const XCountriesSearch = () => {
const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchCountryData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <div className="searchFlag">
      <h1>Country Flags</h1>
      <input type="text" placeholder="Search country"value={search}
        onChange={handleSearch}
      />
      <div className="container">
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <div className="countryCard" key={country.name.common}>
              <img src={country.flags.png} alt={country.name.common} />
              <h2>{country.name.common}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default XCountriesSearch;