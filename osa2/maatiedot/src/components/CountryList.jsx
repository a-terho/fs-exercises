const CountryList = ({ list, buttonHandler }) => {
  if (list.length > 10) {
    return <div>Too many matches, use more specific filter</div>;
  }

  return (
    <>
      {list.map((country) => (
        <div key={country.id}>
          {country.name}{' '}
          <button onClick={() => buttonHandler(country.name)}>show</button>
        </div>
      ))}
    </>
  );
};

export default CountryList;
