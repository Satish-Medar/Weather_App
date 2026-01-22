import SearchAppBar from "./SearchAppBar";
import Combine from "./Combine";

export default function WeatherDisplay({ weather, updateInfo }) {
  if (!weather) {
    return <div>No weather data available.</div>;
  }
  return (
    <div className="app-container">
      <SearchAppBar updateInfo={updateInfo} />
      <Combine info={weather} />
    </div>
  );
}
