import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherNavbar from "./components/WeatherNavbar";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import WeatherFooter from "./components/WeatherFooter";

function App() {
  return (
    <BrowserRouter>
      <WeatherNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="details/:cityName" element={<Details />} />
      </Routes>
      <WeatherFooter />
    </BrowserRouter>
  );
}

export default App;
