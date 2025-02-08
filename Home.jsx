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

function TechLogo({ logo, link, hint }) {
  return (
    <Tooltip title={hint} slotProps={{
        popper: {
          modifiers: [{
            name: "offset",
            options: { offset: [0, -12] }
          }]
        }
    }}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={logo} alt={hint} style={{ height: 100 }}/>
      </a>
    </Tooltip>
  );
};

TechLogo.propTypes = {
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,         
  hint: PropTypes.string.isRequired
};

export default function Home() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [temperature, setTemperature] = useState("");

  return (
    <>
      <DemoAppBar/>
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
          <Typography variant="body1" sx={{textAlign: "center"}}>
            Enter the Longitude:
          </Typography>
          <TextField
            variant="outlined"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter Longitude"
            fullWidth
          />

          <Typography variant="h4">Frontend</Typography>
          <ResponsiveContainer gap={4}>
            <TechLogo logo={HTML5Logo} link="https://html.spec.whatwg.org/multipage/" hint="HTML5" />
            <TechLogo logo={CSS3Logo} link="https://www.w3.org/Style/CSS/Overview.en.html" hint="CSS3" />
            <TechLogo logo={JSLogo} link="https://www.javascript.com" hint="JavaScript" />

            <TechLogo logo={NodeLogo} link="https://nodejs.org" hint="Node" />
            <TechLogo logo={ViteLogo} link="https://vite.dev" hint="Vite" />
            <TechLogo logo={ReactLogo} link="https://react.dev" hint="React" />
            <TechLogo logo={MUILogo} link="https://mui.com/material-ui/" hint="MUI" />
          </ResponsiveContainer>

          <Typography variant="body1" sx={{textAlign: "center"}}>
            Enter the Average Temperature:
          </Typography>
          <TextField
            variant="outlined"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter Temperature"
            fullWidth
          />

          <Typography variant="h4">Predictive Modeling of H5N1 Bird Flu in United
          States of America: A 2022-2023 Analysis Paper</Typography>
          {/* <ResponsiveContainer gap={4}>
            <TechLogo logo={PythonLogo} link="https://www.python.org" hint="Python" />
            <TechLogo logo={DjangoLogo} link="https://www.djangoproject.com" hint="Django" />
          </ResponsiveContainer> */}
          <Typography variant="body1" sx={{textAlign: "center"}}>
            Thank you!
          </Typography>
        </Column>
      </Container>
    </>
  );
}