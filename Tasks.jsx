import { Outlet } from "react-router-dom";
// import { DemoAppBar } from "@components";
import PropTypes from "prop-types";
import { Container, Tooltip, Typography } from "@mui/material";
import { Column, DemoAppBar, ResponsiveContainer } from "@components";
import { useState } from "react";
import { TextField, Stack } from "@mui/material";

import {
  HTML5Logo, CSS3Logo, JSLogo,
  NodeLogo, ViteLogo, ReactLogo, MUILogo,
  PythonLogo, DjangoLogo
} from "@assets";

import "@styles/index.css";

export default function Tasks() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [temperature, setTemperature] = useState("");

  return (
    <>
      <DemoAppBar/>
      <Outlet />
      <Container
        sx={{
          padding: 4,
          backgroundColor: "rgb(242, 237, 237)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <Column gap={3}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontFamily: "Times New Roman, serif", 
            fontWeight: "bold", 
            color: "black"  
          }}
        >
        Hello Farmers!
        </Typography>
    
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: "center", 
            fontFamily: "Times New Roman, serif", 
            fontWeight: "bold",                   
            color: "black"                        
          }}
        >
        Enter the Latitude:
        </Typography>
          <TextField
            variant="outlined"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter Latitude"
            fullWidth
            sx={{
              '& .MuiInputBase-input': {
              fontFamily: 'Times New Roman, serif', 
              fontWeight: 'bold',                   
              color: 'black',                       
              }
            }}
          />
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: "center", 
            fontFamily: "Times New Roman, serif", 
            fontWeight: "bold",                   
            color: "black"                        
          }}
        >
        Enter the Longitude:
        </Typography>
        <TextField
            variant="outlined"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter Longitude"
            fullWidth
            sx={{
              '& .MuiInputBase-input': {
              fontFamily: 'Times New Roman, serif', 
              fontWeight: 'bold',                   
              color: 'black',                       
              }
            }}
          />
        </Column>
      </Container>
    </>
  );
}
