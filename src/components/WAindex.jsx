import { useState, useEffect } from "react";
import { Button, ConfigProvider, Flex } from 'antd';
import {  Input } from 'antd';



function WAindex() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [music, setMusic] = useState("");

  
  const musicLinks = {
    Clear: "https://www.youtube.com/embed/RbSUz4zTqnE",
    Rain: "https://www.youtube.com/embed/253d6y8yxW8",
    Clouds: "https://www.youtube.com/embed/W3z5XvtUK9o",
    Snow: "https://www.youtube.com/embed/nvamff8xxo4",
    Thunderstorm: "https://www.youtube.com/embed/yQNOCwhh5Z4",
    Drizzle: "https://www.youtube.com/embed/hY8jsdsfnJ0",
    Mist: "https://www.youtube.com/embed/BGY5w1i41fM"
  };
  


  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const weatherMain = weatherData.weather[0].main;

      const musicUrl = musicLinks[weatherMain];

      if (musicUrl) {
        setMusic(musicUrl);
      } else {
        setMusic("");
      }
    }
  }, [weatherData]);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      setWeatherData(null);

      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=az`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else if (data.cod === "404") {
        setErrorMsg("Şəhər tapılmadı. Zəhmət olmasa düzgün daxil edin.");
      } else {
        setErrorMsg("Məlumat alınarkən xəta baş verdi.");
      }
    } catch (error) {
      setErrorMsg("Xəta baş verdi. İnterneti və ya API açarını yoxlayın.");
    } finally {
      setLoading(false);
    }
  };

  
  const onSubmit = (e) => {
    e.preventDefault(); 
    if (city.length < 3) return; 
    setWeatherData(null); 
    setErrorMsg(""); 
    fetchWeather(); 
  };

  
  const weatherClass = weatherData?.weather[0]?.main || "";

  return (
    <>
      <div>
        <h1 className="weather-header">🌦️ WEATHER APP</h1>
        <form onSubmit={onSubmit}>
        <Input  
               variant="filled"
               placeholder="Şəhəri daxil edin"
               value={city}
               onChange={(e) => setCity(e.target.value)} 
        />
          <Button color="cyan" variant="filled" htmlType="submit" >
            Axtar
          </Button>
        </form>
      </div>

      {loading && <p>⏳ Yüklənir...</p>}

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {weatherData && weatherData.main && (
        <div className={`weather-card ${weatherClass}`}>
          <h2>{weatherData.name} üçün hava</h2>
          <div className="weather-card-p">
            <p>📅 Tarix: {currentTime.toLocaleString("az-AZ")}</p>
            <p>🌡️ Temperatur: {weatherData.main.temp}°C</p>
            <p>🔼 Maksimum: {weatherData.main.temp_max}°C</p>
            <p>🔽 Minimum: {weatherData.main.temp_min}°C</p>
            <p>💧 Rütubət: {weatherData.main.humidity}%</p>
            <p>🌬️ Külək: {weatherData.wind.speed} m/s</p>
            <p>🧭 İstiqamət: {weatherData.wind.deg}°</p>
            <p>☁️ Açıqlama: {weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
            />

            {/* Musiqi oynadıcı */}
            {music && (
              <iframe
              width="100%"
              height="400"
              src={music}
              title="Musiqi"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WAindex;
