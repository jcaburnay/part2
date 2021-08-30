import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("")
  const toggleShow = (countryName) => {
    setShow(!show);
    setSelectedCountry(countries.filter(country => country.name === countryName)[0])
  }
  if(countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if(countries.length === 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  }
  return (
    show ? <CountryInfo country={selectedCountry} onShow={toggleShow} /> : <ListCountries countries={countries} onShow={toggleShow}/>
  )
}

const CountryInfo = ({ country, onShow }) => {
  return (
    <React.Fragment key={country.name}>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h4>languages: </h4>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} style={{height: '200px', display: 'block'}}/>
      <button onClick={onShow}>hide</button>
      <Weather countryCapital={country.capital} />
    </React.Fragment>
  )
}

const Weather = ({ countryCapital }) => {
  const [weatherInfo, setWeatherInfo] = useState({})
 
  useEffect(() => {
    const accessKey = process.env.REACT_APP_API_KEY;
    const params = {
      access_key: accessKey,
      query: countryCapital
    };
    axios
    .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        setWeatherInfo({
          capitalTemperature: response.data.current.temperature,
          icon: response.data.current.weather_icons[0],
          windSpeed: response.data.current.wind_speed,
          windDir: response.data.current.wind_dir
        })
      })
      .catch(error => console.log(error))
  }, [countryCapital])
  
  return (
    <>
      <h4>Weather in {countryCapital}</h4>
      <h6>temperature:</h6>
      <p>{weatherInfo.capitalTemperature}</p>
      <img src={weatherInfo.icon} alt="weather icon" style={{height: '100px', display: 'block'}}/>
      <p>{weatherInfo.windSpeed} mph from {weatherInfo.windDir}</p>
    </>
  )
}

const ListCountries = ({ countries, onShow }) => {

  return (
    <ul>
      {countries.map(country => <li key={country.name}>{country.name}<button onClick={() => onShow(country.name)}>show</button></li>)}
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
      <Countries countries={searchedCountries} />
    </div>
  );
};

export default App;
