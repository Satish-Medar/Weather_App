import InfoBox from "./InfoBox";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunnyIcon from "@mui/icons-material/Sunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default function Combine({ info, errorMessage }) {
  return (
    <div className="combine-wrapper">
      <div className="weather-header">
        <Typography variant="h4" className="weather-city-title">
          {info.city}{" "}
          {info.humidity > 80 ? (
            <AcUnitIcon />
          ) : info.temperature > 15 ? (
            <SunnyIcon />
          ) : (
            <ThunderstormIcon />
          )}
        </Typography>
        {errorMessage && (
          <Alert
            severity="error"
            sx={{ marginTop: "1rem", width: "100%", maxWidth: "600px" }}
          >
            {errorMessage}
          </Alert>
        )}
        {!errorMessage && (
          <Typography variant="subtitle1" className="weather-subtitle">
            Current Weather Information
          </Typography>
        )}
      </div>
      {!errorMessage && (
        <div className="info-boxes-container">
          <InfoBox
            title="Temperature"
            val={info.temperature + "°C"}
            img={
              info.temperature > 30
                ? "images/hot.png"
                : info.temperature > 15
                  ? "images/warm.png"
                  : "images/cold.png"
            }
          ></InfoBox>
          <InfoBox
            title="Humidity"
            val={info.humidity + "%"}
            img={
              info.humidity > 80
                ? "images/humidity_high.png"
                : info.humidity > 50
                  ? "images/humidity_medium.png"
                  : "images/humdity_low.png"
            }
          ></InfoBox>
          <InfoBox
            title="Wind Speed"
            val={info.windSpeed + " m/s"}
            img={
              info.windSpeed > 10
                ? "images/strong_wind.png"
                : info.windSpeed > 5
                  ? "images/medium_wind.png"
                  : "images/calm_wind.png"
            }
          ></InfoBox>
          <InfoBox
            title="Feels Like"
            val={info.feelsLike + "°C"}
            img={
              info.feelsLike > 25
                ? "images/feels_hot.png"
                : info.feelsLike < 10
                  ? "images/feels_cold.png"
                  : "images/feels_comfortable.png"
            }
          ></InfoBox>
          <InfoBox
            title="Weather"
            val={info.description}
            img={
              info.weather.toLowerCase().includes("rain")
                ? "images/rainy.png"
                : info.weather.toLowerCase().includes("cloud")
                  ? "images/cloudy.png"
                  : info.weather.toLowerCase().includes("clear") ||
                      info.weather.toLowerCase().includes("sunny")
                    ? "images/sunny.png"
                    : "images/default.png"
            }
          ></InfoBox>
        </div>
      )}
    </div>
  );
}
