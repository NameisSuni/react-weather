import React, { useState } from "react";

const api = {
  key: "e329e24aa677c2621fd1fce93e037658",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          // console.log(result);
        });
    }
  }

  let date = String(new window.Date())
  date = date.slice(0,21);

  return (
    <div className={(typeof weather.main != "undefined")?((weather.main.temp > 16)?((weather.main.temp > 30)?'app rain':'app warm'):'app'):'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search" onChange={e => setQuery(e.target.value)}
            value={query} onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{date}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
