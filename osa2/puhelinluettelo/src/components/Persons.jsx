const Persons = ({ list, deleteHandler }) => {
  return (
    <>
      {list.map((person) => (
        <Person
          key={person.id}
          person={person}
          onButtonClick={() => deleteHandler(person)}
        />
      ))}
    </>
  );
};

const Person = ({ person, onButtonClick }) => {
  return (
    <div>
      {person.name} {person.number ? ` # ${person.number}` : ''}{' '}
      <button onClick={onButtonClick}>delete</button>
    </div>
  );
};

export default Persons;
