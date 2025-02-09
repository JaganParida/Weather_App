import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import hotImage from "./assets/hot.png";
import coldImage from "./assets/cold.png";
import rainyImage from "./assets/rainy-day.png";
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const getWeatherImage = () => {
    if (info.temp <= 5) {
      return coldImage;
    } else if (info.humidity > 90) {
      return rainyImage;
    } else if (info.temp > 15) {
      return hotImage;
    } else {
      return coldImage;
    }
  };

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city} &nbsp;
              {info.temp}&deg;C{" "}
              <CardMedia
                component="img"
                sx={{ width: 40, height: 40, marginLeft: 1 }}
                image={getWeatherImage()}
                alt="Weather Icon"
              />
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Humidity = {info.humidity}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Min Temp = {info.tempMin}&deg;C
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Max Temp = {info.tempMax}&deg;C
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              The weather can be described as <b>{info.weather}</b> and feels
              like {info.feelsLike}&deg;C
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
