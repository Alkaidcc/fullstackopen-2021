import { useState,useEffect } from "react"
import axios from 'axios'

const Languages = ({language}) => <li>{language}</li>
const CountryName = ({country}) => <p>{country.name.common}</p>

const Country = ({country}) => {
  const languages = Object.values(country.languages)
  console.log(country.flags.png);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {languages.map(language => <Languages key={language} language={language} />)}
      <img src={country.flags.png} alt="flag" width="150px" />
    </>
  )
}

const CountryList = ({countries}) => {
  console.log(countries);
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  else {
    if (countries.length > 10){
      return (
        <p>Too many matches, specify another filter</p>
      )
    }else{
      return (
        <>
          {countries.map(country => <CountryName key={country.name.common} country={country}/>)}
        </>
      )
    }
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filteredCountries = filter === '' ? []
  :
  countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
        console.log("OK");
      })
    }, [])
  
    

  return (
    <div>
      find countries<input value={filter} onChange={handleFilterChange} />
      <CountryList countries={filteredCountries} />
    </div>
  )
}

export default App;