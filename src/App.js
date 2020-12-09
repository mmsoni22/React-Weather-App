import React, { useState }  from "react";

const api = {
  key : "75ab078ae42592970a656cc58982ab61",
  base : "api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = async evt => {
    if (evt.key === "Enter") {
      await fetch(`https://${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
    "October", "Nevember", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className = "search-box">
          <input 
            type = "text"  
            className = "search-bar"
            placeholder = "Enter Name of the Country"
            onChange ={e => setQuery(e.target.value)}
            value = {query}
            onKeyPress ={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div> 
            <div className = "location-box">
            <div className = "location">{weather.name}, {weather.sys.country}</div>
            <div className = "date">{dateBuilder(new Date())}</div>
        </div>
        <div className = "weather-box">
        <div className = "temp">{Math.round(weather.main.temp)}ºC</div>
          <div className = "weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
          
          
        
      </main>
    </div>
  )
}

export default App;
