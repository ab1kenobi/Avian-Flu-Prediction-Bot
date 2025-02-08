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
      <Container sx={{ padding: 4 }}>
        <Column gap={3}>
          <Typography variant="h2">
            Hello Farmers!
          </Typography>
    
          <Typography variant="body1" sx={{textAlign: "center"}}>
            Enter the Latitude:
          </Typography>
          <TextField
            variant="outlined"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter Latitude"
            fullWidth
          />
          
        </Column>
      </Container>
    </>
  );
}
