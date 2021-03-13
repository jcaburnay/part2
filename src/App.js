import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ countries }) => {
  if(countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if(countries.length === 1) {
    return (
      <>
        {countries.map(country => {
          return (
            <React.Fragment key={country.name}>
              <h2>{country.name}</h2>
              <p>capital: {country.capital}</p>
              <p>population: {country.population}</p>
              <h4>languages: </h4>
              <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
              </ul>
              <img src={country.flag} alt={`${country.name} flag`}/>
            </React.Fragment>
          )
        })}
      </>
    )
  }
  return (
    <ul>
      {countries.map(country => <li key={country.name}>{country.name}</li>)}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    if(searchCountry === "") {
      setCountries([]);
    } else {
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        setCountries(response.data);
      });
    }
  }, [searchCountry]);

  const onSearch = (event) => {
    setSearchCountry(event.target.value);
  };

  const searchedCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );
  return (
    <div>
      <p>find countries: <input type="text" value={searchCountry} onChange={onSearch}/></p>
      <Country countries={searchedCountries} />
    </div>
  );
};

export default App;
