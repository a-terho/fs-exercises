import { useState, useEffect } from 'react';

import countryAPI from './services/countryAPI';
import weatherAPI from './services/weatherAPI';

import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';

function App() {
  const [inputText, setInputText] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [matchList, setMatchList] = useState([]);

  const [selection, setSelection] = useState(null);
  const [weather, setWeather] = useState(null);

  // lataa aluksi kaikki maat käyttäjän koneelle
  useEffect(() => {
    countryAPI.getAll((countries) => {
      setCountryList(
        countries.map((country) => {
          return { id: country.cca3, name: country.name.common };
        }),
      );
      // console.log(countries);
    });
  }, []);

  // lataa valitun maan säätiedot aina valinnan muuttuessa
  useEffect(() => {
    // mutta älä hae, jos valintaa ei ole
    if (selection === null) return;

    console.log(`fetching weather for ${selection.name.common}...`);
    weatherAPI.get(selection, (data) => setWeather(data));
  }, [selection]);

  const resetCountryView = () => {
    setSelection(null);
    setWeather(null);
  };

  const onText = (event) => {
    const text = event.target.value;
    fillInput(text);
  };

  const fillInput = (text) => {
    setInputText(text);

    // tyhjennä näkymä tekstikentän tyhjentyessä
    if (text === '') {
      setMatchList([]);
      resetCountryView();
      return;
    }

    // etsi kaikki tekstiin sopivat maat
    const matches = countryList.filter((country) =>
      country.name.toLowerCase().includes(text.toLowerCase()),
    );
    setMatchList(matches);

    // jos vaihtoehtoja on vain yksi, hae kaikki sen tiedot
    if (matches.length === 1) {
      // mutta jos tiedot on jo haettu, älä hae niitä uudelleen
      if (selection !== null) return;

      console.log(`fetching info for ${matches[0].name}`);
      countryAPI.getOne(matches[0].name, (country) => setSelection(country));
    } else {
      resetCountryView();
    }
  };

  return (
    <>
      find countries <input value={inputText} onChange={onText} />
      {selection === null ? (
        <CountryList list={matchList} buttonHandler={fillInput} />
      ) : (
        <CountryInfo country={selection} weather={weather} />
      )}
    </>
  );
}

export default App;
