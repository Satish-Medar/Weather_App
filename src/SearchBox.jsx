import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState } from "react";
import "./InfoBox.css";

export default function SearchBox({ updateInfo }) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEY;

  let getWeather = async (city) => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      if (!response.ok) {
        return {
          error: true,
          message: `City "${city}" does not exist in our API database. Please try another city.`,
        };
      }
      let data = await response.json();
      let weather = {
        city: data.name,
        temperature: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        error: false,
      };
      console.log("Weather in", city, ":", weather);
      return weather;
    } catch (error) {
      console.log("Search error caught - Invalid city name");
      return {
        error: true,
        message: `City "${city}" does not exist in our API database. Please try another city.`,
      };
    }
  };

  let [city, setCity] = useState("");

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Searching for city:", city);
    if (city.trim()) {
      await getWeather(city).then((weather) => {
        if (weather) {
          updateInfo(weather);
        }
      });
      setCity("");
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: { xs: "0px 2px", sm: "2px 4px" },
        display: "flex",
        alignItems: "center",
        width: { xs: "calc(100% - 10px)", sm: 400, md: 450 },
        maxWidth: "100%",
        backgroundColor: "#f8f9fb",
        flexShrink: 1,
        minHeight: { xs: "44px", sm: "auto" },
      }}
    >
      <IconButton
        sx={{
          p: { xs: "6px", sm: "10px" },
          color: "#ffffff",
          "&:hover": { backgroundColor: "transparent" },
          display: { xs: "none", sm: "inline-flex" },
          width: { xs: "32px", sm: "auto" },
          height: { xs: "32px", sm: "auto" },
          minWidth: 0,
          flexShrink: 0,
        }}
        aria-label="menu"
      >
        <MenuIcon sx={{ color: "#ffffff", fontSize: { xs: 16, sm: 24 } }} />
      </IconButton>
      <InputBase
        sx={{
          ml: { xs: 0.3, sm: 1 },
          flex: 1,
          minWidth: 0,
          "& .MuiInputBase-input": {
            fontSize: { xs: "0.8rem", sm: "1rem" },
            padding: { xs: "4px 4px", sm: "8px 8px" },
            height: { xs: "24px", sm: "auto" },
          },
        }}
        placeholder="City"
        inputProps={{ "aria-label": "City Name" }}
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{
          p: { xs: "6px", sm: "10px" },
          color: "#ffffff",
          "&:hover": { backgroundColor: "transparent" },
          width: { xs: "36px", sm: "auto" },
          height: { xs: "36px", sm: "auto" },
          minWidth: 0,
          flexShrink: 0,
        }}
        aria-label="search"
      >
        <SearchIcon sx={{ color: "#fefefe", fontSize: { xs: 18, sm: 24 } }} />
      </IconButton>
      <Divider
        sx={{
          height: { xs: 16, sm: 28 },
          m: { xs: 0.1, sm: 0.5 },
          display: { xs: "none", sm: "block" },
        }}
        orientation="vertical"
      />
      <IconButton
        sx={{
          p: { xs: "4px", sm: "10px" },
          color: "#ffffff",
          "&:hover": { backgroundColor: "transparent" },
          display: { xs: "none", sm: "inline-flex" },
          minWidth: { xs: "32px", sm: "auto" },
        }}
        aria-label="directions"
      >
        <DirectionsIcon
          sx={{ color: "#ffffff", fontSize: { xs: 16, sm: 24 } }}
        />
      </IconButton>
    </Paper>
  );
}
