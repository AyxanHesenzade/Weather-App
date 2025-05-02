import { useState, useEffect } from "react";

function WAindex() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [music, setMusic] = useState("");

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const weatherMain = weatherData.weather[0].main;

      // Hava vəziyyətinə görə musiqi URL-ləri
      switch (weatherMain) {
        case "Clear":
          setMusic("https://www.youtube.com/embed/RbSUz4zTqnE"); // Günəşli musiqi
          break;
        case "Rain":
          setMusic("https://www.youtube.com/embed/253d6y8yxW8"); // Yağmurlu musiqi
          break;
        case "Clouds":
          setMusic("https://www.youtube.com/embed/W3z5XvtUK9o"); // Buludlu musiqi
          break;
        case "Snow":
          setMusic("https://www.youtube.com/embed/nvamff8xxo4"); // Qar musiqisi
          break;
        case "Thunderstorm":
          setMusic("https://www.youtube.com/embed/yQNOCwhh5Z4"); // Fırtına musiqisi
          break;
        case "Drizzle":
          setMusic("https://www.youtube.com/embed/hY8jsdsfnJ0"); // Çiskin musiqisi
          break;
        case "Mist":
          setMusic("https://www.youtube.com/embed/BGY5w1i41fM"); // Dumanlı musiqi
          break;
        default:
          setMusic(""); // Varsayılan musiqi
          break;
      }
    }
  }, [weatherData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (city.length < 3) return;

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

    fetchWeather();
  }, [city]);

  const weatherClass = weatherData?.weather[0]?.main || "";

  return (
    <>
      <div>
        <h1 className="weather-header">🌦️ WEATHER APP</h1>
        <input
          type="text"
          placeholder="Şəhəri daxil edin"
          onChange={(e) => setCity(e.target.value)}
        />
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

            {/* YouTube Embed Musiqi Player */}
            {music && (
              <iframe
                width="100%"
                height="400"
                src={music}
                title="Musiqi"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
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
