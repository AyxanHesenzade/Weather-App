import { useState, useEffect } from "react";
import SearchBar from "./pages/SearchBar.jsx";
import WeatherCard from "./pages/WeatherCard.jsx";
import MusicPlayer from "./pages/MusicPlayer.jsx";

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
    if (weatherData?.weather) {
      const weatherMain = weatherData.weather[0].main;
      setMusic(musicLinks[weatherMain] || "");
    }
  }, [weatherData]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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
    } catch {
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
      <div className="weather-header">
      <h1 className="">🌦️ WEATHER APP</h1>
      
      </div>
      <div className="Search-Bar">
      <SearchBar city={city} setCity={setCity} onSubmit={onSubmit} />
      </div>
      
      {loading && <p>⏳ Yüklənir...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <div>
      {weatherData && (
        <div>
             <WeatherCard
            weatherData={weatherData}
            currentTime={currentTime}
            weatherClass={weatherClass}
          />
          <MusicPlayer music={music} />

        </div>
      )}
      </div>
      
    </>
  );
}

export default WAindex;
