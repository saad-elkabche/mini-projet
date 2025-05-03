import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meteo.css"; // custom CSS for styling

const API_KEY = "2f35a7230f4b4f9f31dcfe1d45d99227";

const Meteo = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("❌ City not found. Please try again.");
    }
  };

  return (
    <Container className="weather-container">
      <h2 className="text-center mb-4">🌤 City Weather</h2>

      <Form onSubmit={fetchWeather} className="weather-form mb-3">
        <Form.Control
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control-custom"
          required
        />
        <Button variant="dark" type="submit" className="w-100 mt-2">
          Get Weather
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {weather && (
        <Card className="weather-card mt-4 text-center">
          <Card.Body>
            <Card.Title className="fs-4 fw-bold">
              📍 {weather.name}, {weather.sys.country}
            </Card.Title>
            <Card.Text className="text-capitalize">
              {weather.weather[0].main} - {weather.weather[0].description}
            </Card.Text>
            <hr />
            <Card.Text className="weather-stats">
              🌡 Temperature: <strong>{weather.main.temp}°C</strong> <br />
              💧 Humidity: <strong>{weather.main.humidity}%</strong> <br />
              🌬 Wind Speed: <strong>{weather.wind.speed} m/s</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Meteo;

// import React, { useState } from "react";
// import axios from "axios";
// import { Container, Form, Button, Card, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API_KEY = "2f35a7230f4b4f9f31dcfe1d45d99227";

// const Meteo = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");

//   const fetchWeather = async (e) => {
//     e.preventDefault();
//     setError("");
//     setWeather(null);

//     try {
//       const res = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       setWeather(res.data);
//     } catch (err) {
//       setError("City not found. Please try again.");
//     }
//   };

//   return (
//     <Container className="mt-5" style={{ maxWidth: "500px" }}>
//       <h2 className="mb-4 text-center">City Weather</h2>
//       <Form onSubmit={fetchWeather}>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="text"
//             placeholder="Enter city name..."
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit" className="w-100">
//           Get Weather
//         </Button>
//       </Form>

//       {error && (
//         <Alert variant="danger" className="mt-3">
//           {error}
//         </Alert>
//       )}

//       {weather && (
//         <Card className="mt-4 text-center">
//           <Card.Body>
//             <Card.Title>
//               {weather.name}, {weather.sys.country}
//             </Card.Title>
//             <Card.Text>
//               {weather.weather[0].main} - {weather.weather[0].description}
//             </Card.Text>
//             <Card.Text>
//               🌡 Temp: {weather.main.temp}°C
//               <br />
//               💧 Humidity: {weather.main.humidity}%<br />
//               🌬 Wind: {weather.wind.speed} m/s
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default Meteo;
