import { useState } from "react";
import axios from "axios";

export default function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const getFluPrediction = async () => {
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });

      setPrediction(response.data.outbreak_chance);
    } catch (err) {
      setError("Error connecting to backend");
      console.error("Error connecting to backend:", err);
    }
  };

  return (
    <div>
      <h2>Avian Flu Prediction</h2>
      <input type="text" placeholder="Enter Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      <input type="text" placeholder="Enter Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      <button onClick={getFluPrediction}>Get Prediction</button>
      {prediction && <h3>Outbreak Chance: {prediction}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
