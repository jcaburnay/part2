import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ searchName, onSearch }) => {
  return (
    <div>
      <span>
        search contact:{" "}
        <input type="text" value={searchName} onChange={onSearch} />
      </span>
    </div>
  );
};

const PersonForm = ({
  submit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={submit}>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      const personToUpdate = persons.find(person => person.name === newName);
      const updatedPerson = {
        ...personToUpdate,
        number: newNumber
      };
      const confirm = window.confirm(`${newName} is already in the phonebook, update number instead?`);
      if(confirm) {
        personService
          .updateNumber(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
          });
        setNewName("");
        setNewNumber("");
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .addPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
    }
  };
  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    const confirm = window.confirm(`Delete ${personToDelete.name}?`);
    if(confirm) {
      personService
        .deletePerson(id);
      personService
        .getAll()
        .then(persons => setPersons(persons));
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onSearch = (event) => {
    setSearchName(event.target.value);
  };

  const searchedNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} onSearch={onSearch} />
      <h3>Add a new contact</h3>
      <PersonForm
        submit={submit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={searchedNames} onDelete={handleDelete}/>
    </div>
  );
};

export default App;