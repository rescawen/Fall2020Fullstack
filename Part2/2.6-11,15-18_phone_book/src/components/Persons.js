import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, setPersons }) => {
  return (
    <div>
      {persons.map(person =>
        <div key={person.id}>{person.name} {person.number}
          <button onClick={() => window.confirm(`Delete ${person.name} ?`)
            ? setPersons(persons.filter(p => p.id !== person.id)) & personService.remove(person.id)
            : null}>
            delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Persons