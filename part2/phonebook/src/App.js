import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'



const App = () => {
  const [persons, setPersons] = useState([])
  const [filterPersons, setFilterPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const handleClick = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    setFilterPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onChange={handleFilterNameChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={handleClick} newName={newName} newNumber={newNumber} setNewName={handleNameChange} setNewNumber={handleNumberChange}  />
      <h2>Numbers</h2>
      {filterName === ''?
      <Persons persons={persons}/>
      :
      <Persons persons={filterPersons}/>}
    </div>
  )
}

export default App