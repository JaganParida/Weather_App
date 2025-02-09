import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let [open, setOpen] = useState(true);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEY;

  let getWeatherInfo = async () => {
    try {
      if (!API_KEY) {
        throw new Error("API key is missing");
      }
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      let jsonResponse = await response.json();
      if (jsonResponse.cod !== 200) {
        throw new Error(jsonResponse.message);
      }
      let result = {
        city: city,
        temp: (jsonResponse.main.temp - 273.15).toFixed(1),
        tempMin: (jsonResponse.main.temp_min - 273.15).toFixed(1),
        tempMax: (jsonResponse.main.temp_max - 273.15).toFixed(1),
        humidity: jsonResponse.main.humidity,
        feelsLike: (jsonResponse.main.feels_like - 273.15).toFixed(1),
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
      setError(false);
    } catch (err) {
      setError(true);
      setOpen(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          value={city}
          onChange={handleChange}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#90CAF9" },
              "&.Mui-focused fieldset": { borderColor: "#64B5F6" },
            },
          }}
        />
        <br />
        <br />
        <Button variant="contained" startIcon={<SearchIcon />} type="submit">
          Search
        </Button>
        <br />
        <br />
        {error && (
          <Collapse in={open}>
            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              No such place exists in API, Try again!
            </Alert>
          </Collapse>
        )}
      </form>
    </div>
  );
}
