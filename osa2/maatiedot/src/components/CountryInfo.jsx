const CountryInfo = ({ country, weather }) => {
  let weatherTag = '';
  // renderöi sää vain jos tiedot ovat saatavilla
  if (weather !== null) {
    weatherTag = (
      <>
        <h2>Weather in {weather.location}</h2>
        <div>
          Temperature {(weather.stats.temp - 273.15).toFixed(2)} Celsius
        </div>
        {weather.data.map((w) => (
          <img key={w.id} src={w.icon} alt={w.description} />
        ))}
        <div>Wind {weather.wind.speed} m/s</div>
      </>
    );
  }

  return (
    <>
      <h1>{country.name.official}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        style={{ maxWidth: 250, border: '1px solid' }}
        src={country.flags.svg}
        alt={country.flags.alt}
      />
      {weatherTag}
    </>
  );
};

export default CountryInfo;
