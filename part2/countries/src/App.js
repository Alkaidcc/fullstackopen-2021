import { useState, useEffect } from "react"
import axios from 'axios'
import Content from "./components/Content"

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
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries<input value={filter} onChange={handleFilterChange} />
      <Content countries={filteredCountries} />
    </div>
  )
}

export default App;