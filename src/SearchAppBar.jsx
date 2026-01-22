import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloudIcon from "@mui/icons-material/Cloud";
import { useState } from "react";
import SearchBox from "./SearchBox";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  border: "1px solid #e5e9f0",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
    border: "1px solid #d0d8e0",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#ffffff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    color: "#ffffff",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#a8c5d8",
    opacity: 1,
  },
}));

export default function SearchAppBar({ updateInfo }) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [city, setCity] = useState("");

  const getWeather = async (cityName) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      const weather = {
        city: data.name,
        temperature: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
      console.log("Weather in", cityName, ":", weather);
      return weather;
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      await getWeather(city).then((weather) => {
        if (weather) updateInfo(weather);
      });
      setCity("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="search-app-bar">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: { xs: 0.5, sm: 2 },
            padding: { xs: "0.5rem 0.5rem", sm: "1rem 2rem" },
            minHeight: { xs: "56px", sm: "64px" },
            alignItems: "center",
          }}
        >
          <CloudIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: { xs: 24, sm: 32 },
              color: "#5b9bd5",
              flexShrink: 0,
            }}
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              flex: 1,
              fontWeight: "bold",
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
              fontSize: { xs: "1.2rem", sm: "2rem", md: "2rem" },
              letterSpacing: "1px",
              color: "#2c3e50",
              display: { xs: "none", sm: "block" },
              textAlign: "left",
            }}
          >
            Weather App
          </Typography>
          <SearchBox updateInfo={updateInfo}></SearchBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
