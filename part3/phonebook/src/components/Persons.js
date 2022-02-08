import personService from '../services/persons'
import { useState, useEffect } from 'react'
const Persons = ({persons,setPersons,filterName,setMessage}) => {
  
  const [filterPersons, setFilterPersons] = useState(persons)
  // When persons and filterName change, filterPersons is updated
  useEffect(() => {
    setFilterPersons(persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
  }, [filterName,persons])

  const removePerson = (person) => {
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result) {
      personService
        .remove(person.id)
          .then(response => {
            setFilterPersons(persons.filter(item => item !== person))
            setPersons(persons.filter(item => item !== person))
            setMessage({
              text: `Deleted ${person.name}`,
              type: "success"
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
      })
      .catch(error => {
        setFilterPersons(filterPersons.filter(item => item !== person))
          setMessage({
            text: `Information of ${person.name} has already been removed from server`,
            type: "error"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
      })
    }
  }
    return (
      <>
        {filterPersons.map(person =>
          <p key={person.id}>{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button></p>
        )}
      </>
    )
}
export default Persons