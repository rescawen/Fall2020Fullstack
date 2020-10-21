import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const nofiticationMessage = () => {
    setNotificationMessage({ text: `Added ${newName}`, success: true })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    if (!persons.map(person => person.name).includes(newName)) {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          nofiticationMessage()
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationMessage(
            {
              text: error.response.data.error,
              success: false
            })
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const personID = persons.find(person => person.name === newName).id
      personService
        .update(personID, personObject)
        .then(updatedPerson => {
          setPersons(persons.filter(p => p.id !== personID).concat(updatedPerson))
          nofiticationMessage()
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationMessage(
            {
              text: error.response.data.error,
              success: false
            })
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          // setNotificationMessage(
          //   {
          //     text: `Information of ${newName} has already been removed from server`,
          //     success: false
          //   })
          // setTimeout(() => {
          //   setNotificationMessage(null)
          // }, 5000)
          // setPersons(persons.filter(p => p.id !== personID))
        })
    }
  }

  const handleFilterChange = (event) => setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  )
}



export default App
