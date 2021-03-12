import React, { useState } from 'react'

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
  )
} 

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
  ]) 
  const [ newName, setNewName ] = useState('')

  const submit = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    }
    setPersons(persons.concat(nameObject));
    setNewName('');
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submit}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App