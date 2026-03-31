import './index.css';
import { useState, useEffect } from 'react';

import personService from './services/persons';

import InfoBox from './components/InfoBox';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

  // hae nimet tietokannasta
  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const onFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const shownPersons =
    filterText !== ''
      ? persons.filter((person) =>
          // filtteröi hakusana mistä osasta nimeä tahansa
          person.name.toLowerCase().includes(filterText.toLowerCase()),
        )
      : persons;

  const showInfoMessage = (text) => {
    // nollaa ensin mahdollinen viesti-ikkuna
    if (message?.id) clearTimeout(message.id);

    const id = setTimeout(() => setMessage(null), 4000);
    setMessage({ id, text, style: 'info' });
  };

  const showErrorMessage = (text) => {
    // nollaa ensin mahdollinen viesti-ikkuna
    if (message?.id) clearTimeout(message.id);

    const id = setTimeout(() => setMessage(null), 8000);
    setMessage({ id, text, style: 'error' });
  };

  const resetFields = () => {
    setNewName('');
    setNewNumber('');
  };

  const addName = (event) => {
    event.preventDefault();

    if (newName === '') return alert('Please insert a name');

    // etsi jo lisätty samanniminen henkilö
    const person = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    // salli jo lisättyjen nimien muokkaus
    if (
      person &&
      window.confirm(
        `${person.name} is already added to phonebook. Replace the old number with a new one?`,
      )
    ) {
      const updated = {
        ...person,
        number: newNumber,
      };
      personService
        .update(person, updated)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
          );
          resetFields();

          showInfoMessage(`Changed phone number for ${updatedPerson.name}`);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setPersons(persons.filter((p) => p.id !== person.id));
            resetFields();

            showErrorMessage(
              `Information for ${person.name} has already been removed from server`,
            );
          } else {
            console.log(err.response);
            showErrorMessage(
              err.response.data?.message ??
                `Error occurred while updating number for ${person.name}`,
            );
          }
        });
      return;
    }

    // muutoin lisää nimi tietokantaan vain, jos sitä ei jo ole
    else if (!person) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      // lisää nimi tietokantaan
      personService
        .add(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));

          resetFields();
          showInfoMessage(`Added ${addedPerson.name}`);
        })
        .catch((err) => showErrorMessage(err.response.data?.message));
    }
  };

  const deletePerson = (person) => {
    // varmenna poisto käyttäjältä
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.del(person).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        showInfoMessage(`Removed ${person.name}`);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <InfoBox message={message} />
      <Filter text={filterText} onChange={onFilterChange} />

      <h3>Add new person</h3>
      <PersonForm
        onSubmit={addName}
        name={newName}
        number={newNumber}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
      />

      <h3>Numbers</h3>
      <Persons list={shownPersons} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;
