import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const params = {
    access_key: api_key,
    query: capital
  }
  const hook = () => {
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(hook, [])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div><b>temperature: </b>{weather.current.temperature} Celcius</div>
      <img src={weather.current.weather_icons} alt="weather icon"></img>
      <div><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div style={{ padding: "10px" }}>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="15%" height="15%" alt="country flag"/>
      <Weather capital={country.capital} />
    </div>
  )
}

const SearchListRow = ({ country }) => {
  const [showCountry, setShowCountry] = React.useState(false)
  const onClick = () => setShowCountry(true)
  return (
    <div key={country.name}>
      {country.name}
      <button onClick={onClick}>show</button>
      {showCountry ? <Country country={country} /> : null}
    </div>
  )
}

const Results = ({ countries }) => {
  return (
    <div>
      {countries.length === 1 ? <Country country={countries[0]} />
        : countries.length < 11 ? countries.map(country => <SearchListRow key={country.name} country={country} />)
          : countries.length < 250 ? <div>Too many matches, specify another filter</div>
            : null}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => setCountries(countries.filter(country => country.name.toLowerCase().includes(event.target.value)))

  return (
    <div>
      <div>find countries<input onChange={handleFilterChange} /></div>
      <Results countries={countries} />
    </div>
  );
}

export default App;
