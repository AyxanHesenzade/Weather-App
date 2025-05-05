

const WeatherCard = ({ weatherData, currentTime, weatherClass }) => {
    return (
      <div className={`weather-card ${weatherClass}`  }>
        <div className="Card-Header">
        <h2>{weatherData.name}</h2>
        </div>
        
       
            <div className="Temperature">
            <p>🌡️  {weatherData.main.temp}°C</p>
            <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="icon"
            />
            </div>

            <div className="Date">
            <p>📅  {currentTime.toLocaleString("az-AZ")}</p>
            </div>
          
          <div  className="Card-Footer">
            <div className="Card-Footer-Div"><p>🔼 Maksimum: </p> <p>{weatherData.main.temp_max}°C</p></div>
            <div className="Card-Footer-Div"><p>💧 Rütubət:  </p> <p>{weatherData.main.humidity}%</p></div>
            <div className="Card-Footer-Div"><p>🌬️ Külək:    </p> <p>{weatherData.wind.speed} m/s</p></div>
            <div className="Card-Footer-Div"><p>🧭 İstiqamət:</p> <p>{weatherData.wind.deg}°</p></div>
            <div className="Card-Footer-Div"><p>☁️ Açıqlama: </p> <p>{weatherData.weather[0].description}</p></div>
          </div>
          
      </div>
    );
  };
  
  export default WeatherCard;
  