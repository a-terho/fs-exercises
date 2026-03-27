import axios from 'axios';

const apiURL = 'https://api.openweathermap.org/data/2.5/weather';
const iconURL = 'https://openweathermap.org/payload/api/media/file/';
const KEY_VAR = 'VITE_WEATHER';
const API_KEY = import.meta.env[KEY_VAR];

const get = (country, callback) => {
  // jos API key ei ole käytössä, älä edes yritä
  if (!API_KEY) {
    console.log(`cannot fetch weather as there is no API key (${KEY_VAR})`);
    return callback(null);
  }

  axios
    .get(`${apiURL}`, {
      params: {
        q: `${country.capital[0]},${country.cca3}`,
        appid: API_KEY,
      },
    })
    .then((res) => {
      // muotoillaan datan hieman uudelleen
      // samalla korjataan dataan suoralinkit iconeihin
      res.data.weather.forEach((w) => (w.icon = `${iconURL}/${w.icon}.png`));
      callback({
        location: res.data.name,
        stats: res.data.main,
        data: res.data.weather,
        wind: res.data.wind,
      });
    })
    .catch(() => callback(null));
};

export default { get };
