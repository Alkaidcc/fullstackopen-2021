import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filterPersons, setFilterPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
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