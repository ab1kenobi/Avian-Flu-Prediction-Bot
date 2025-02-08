import { useState } from "react";
import axios from "axios";

export default function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userLocation, setUserLocation] = useState(""); 
  const [prediction, setPrediction] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");

  const getCoord = async()=>{
    setError("");
    setPrediction(null);
    try{
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${userLocation}&key=f80aec7fe2654a5eba029218ab99a269`)
      if(response.data.results.length>0){
        const {lat, lng} = response.data.results[0].geometry; 
        setLatitude(lat);
        setLongitude(lng);
      }else{
        setError("Location not found");
      }
    } catch(err){
      setError("Error fetching location coordinates");
      console.error("Error fetching coordinates", err); 
    }
  };
  const getFluPrediction = async () => {
    setError("");
    setPrediction(null);
    setRecommendation(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });

      setPrediction(response.data.outbreak_chance);
      setRecommendation(response.data.recommendation);
    } catch (err) {
      setError("Error connecting to backend");
      console.error("Error connecting to backend:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(243, 239, 238)", minHeight: "100vh", padding: "20px" }}>
      <h2 
        style={{
          fontSize: "32px", 
          fontWeight: "bold", 
          fontFamily: "Times New Roman, serif",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        AVIAN FLU PREDICTION
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
        <input 
          type="text" 
          placeholder="Enter Location (City or Address)" 
          value={userLocation} // Changed to userLocation
          onChange={(e) => setUserLocation(e.target.value)} // Changed to userLocation
          style={{ padding: "10px", fontSize: "18px", width: "300px", textAlign: "center", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button 
          onClick={getCoord} 
          style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer", borderRadius: "5px", backgroundColor: "#007BFF", color: "white", border: "none" }}
        >
          Get Coordinates
        </button>
        <input 
          type="text" 
          placeholder="Enter Latitude" 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)} 
          style={{ padding: "10px", fontSize: "18px", width: "300px", textAlign: "center", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input 
          type="text" 
          placeholder="Enter Longitude" 
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)} 
          style={{ padding: "10px", fontSize: "18px", width: "300px", textAlign: "center", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button 
          onClick={getFluPrediction} 
          style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none" }}
        >

        Get Prediction
        </button>
      </div>
      {prediction && <h3>Outbreak Chance: {prediction}</h3>}
      {recommendation && <h3>Recommendation: {recommendation}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        padding: "20px",
        textAlign: "left",
        marginTop: "auto",  
        paddingBottom: "40px"  
      }}></div>
        <h3 
          style={{
            fontSize: "14px", 
            fontWeight: "bold", 
            fontFamily: "Times New Roman, serif",
            color: "black",
            textAlign: "center", 
            marginBottom: "5px"
          }}
        >
          Background Information
        </h3>
      <p 
        style={{
          fontSize: "14px",
          fontWeight: "normal",
          fontFamily: "Times New Roman, serif",
          color: "black",
          lineHeight: "1.5"
        }}
      >
        The Avian flu, which is also known as the avian influenza, is essentially a viral infection that primarily affects birds but can sometimes also infect humans and other animals. The different factors that cause this virus are geographical location, temperature, and the outbreak type (poultry, non-poultry, wild bird). These viruses spread through direct contact with infected birds, their droppings, or contaminated surfaces, posing a significant risk to agriculture and public health. Due to this, there was a serious decline of egg production as the virus has killed many birds leading to the reduction of supply of eggs. This resulted in economic losses, shortages and price spikes in commercial poultry farms, and significant health issues of farmers.
      </p>
    </div>
  );
}
