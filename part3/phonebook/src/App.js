import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message,setMessage] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(person => person.name === newPerson.name && person.number === newPerson.number)) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    if (persons.find(person => person.name === newPerson.name && person.number !== newPerson.number)) {
      const result = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        personService
          .update(persons.find(person => person.name === newPerson.name).id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => returnedPerson.id === person.id ? returnedPerson : person))
            setMessage({
              text: `Edited ${returnedPerson.name}`,
              type: "success"
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setMessage({
              text: error.response.data.error,
              type: "error"
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        setNewName('')
        setNewNumber('')
      }
      return
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage({
          text: `Added ${returnedPerson.name}`,
          type: "success"
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setMessage({
          text: error.response.data.error,
          type: "error"
        })
        setTimeout(() => {
          setMessage(null)
        },3000)
      })
    setNewName('')
    setNewNumber('')
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterName={filterName} onChange={handleFilterNameChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={changeName} setNewNumber={changeNumber} />
      <h2>Numbers</h2>
      <div>
        {persons.length && <Persons persons={persons} setPersons={setPersons} filterName={filterName} setMessage={setMessage} />}
      </div>
    </div>
  )
}

export default App