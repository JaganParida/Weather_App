import { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import "./weather.css";

const HOT_URL =
  "https://images.unsplash.com/photo-1561554148-946d9168e8ae?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const COLD_URL =
  "https://images.unsplash.com/photo-1519414119614-31e82ec0cce7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const RAIN_URL =
  "https://images.unsplash.com/photo-1559807715-d9dd67798420?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    feelsLike: "17.7",
    humidity: 68,
    temp: "18.1",
    tempMax: "18.1",
    tempMin: "18.1",
    weather: "haze",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const getBackgroundImage = () => {
    if (weatherInfo.temp <= 5) {
      return COLD_URL;
    } else if (weatherInfo.humidity > 90) {
      return RAIN_URL;
    } else if (weatherInfo.temp > 15) {
      return HOT_URL;
    } else {
      return COLD_URL;
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${getBackgroundImage()})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";
    document.body.style.backdropFilter = "blur(8px)";
    document.body.style.opacity = "0.9";
    document.body.style.margin = "auto";
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.height = "";
      document.body.style.width = "";
      document.body.style.backdropFilter = "";
      document.body.style.opacity = "";
      document.body.style.margin = "";
    };
  }, [weatherInfo]);

  return (
    <div
      className="weather"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
