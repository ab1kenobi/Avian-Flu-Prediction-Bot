import PropTypes from "prop-types";
import { Container, Tooltip, Typography } from "@mui/material";
import { Column, DemoAppBar, ResponsiveContainer } from "@components";

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
  return (
    <>
      <DemoAppBar/>
      <Container sx={{ padding: 4 }}>
        <Column gap={3}>
          <Typography variant="h2">
            Hello Farmers!
          </Typography>

          <Typography variant="body1" sx={{textAlign: "center"}}>
            Enter the Latitude:
          </Typography>
          <Typography variant="body1" sx={{textAlign: "center"}}>
            Enter the Longitude:
          </Typography>

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

          <Typography variant="h4">Predictive Modeling of H5N1 Bird Flu in United
          States of America: A 2022-2023 Analysis Paper</Typography>
          <ResponsiveContainer gap={4}>
            <TechLogo logo={PythonLogo} link="https://www.python.org" hint="Python" />
            <TechLogo logo={DjangoLogo} link="https://www.djangoproject.com" hint="Django" />
          </ResponsiveContainer>
          <Typography variant="body1" sx={{textAlign: "center"}}>
            For backend, this demo project uses Django, a Python framework to build web applications.
          </Typography>
        </Column>
      </Container>
    </>
  );
}