import { useState } from "react";
import "./App.css";
import Combine from "./Combine";
import SearchAppBar from "./SearchAppBar";
import "./InfoBox.css";

function App() {
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState({
    city: "New York",
    temperature: 22,
    tempMin: 19,
    tempMax: 25,
    feelsLike: 24,
    weather: "Clear",
    description: "Clear sky",
    humidity: 65,
    windSpeed: 3.1,
    error: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  let updateInfo = (newInfo) => {
    if (newInfo.error) {
      setErrorMessage(newInfo.message);
      setWeatherData({
        ...weatherData,
        error: true,
      });
    } else {
      setErrorMessage("");
      setWeatherData(newInfo);
    }
  };
  return (
    <div className="app-container">
      <SearchAppBar updateInfo={updateInfo} />
      <Combine info={weatherData} errorMessage={errorMessage} />
    </div>
  );
}

export default App;
