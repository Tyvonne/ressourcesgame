import './App.css';

import React, { useState, useEffect } from 'react';

import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import TextField from '@mui/material/TextField';

var stockDepotCobalt = 0;
var distanceCarboneMine = 150;

let productionInterval
let transportInterval
let intervaCarbonelMine

function App() {
  var [outputCarboneMine, setOutputCarboneMine] = useState(30);
  var [outputCarboneSpeed, setOutputCarboneSpeed] = useState(10);
  var [outputCarboneCapacityMine, setOutputCarboneCapacityMine] = useState(2);

  const [stockDepotCarbone, setStockDepotCarbone] = useState(0);
  const [cumulatedCarboneMine, setCumulatedCarboneMine] = useState(0);

  const [carboneMineActivity, setCarboneMineActivity] = useState(false);
  const [carboneMineTransportActivity, setCarboneMineTransportActivity] = useState(false);

  const outputCarboneMineChange = (event) => {
    setOutputCarboneMine(parseInt(event.target.value));
  };
  const outputCarboneSpeedChange = (event) => {
    setOutputCarboneSpeed(parseInt(event.target.value));
    intervaCarbonelMine = distanceCarboneMine / outputCarboneSpeed
  };
  const outputCarboneCapacityMineChange = (event) => {
    setOutputCarboneCapacityMine(parseInt(event.target.value));
  };

  const switchCarboneChange = (event) => {
    setCarboneMineActivity(event.target.checked);
  };
  const switchCarboneTransportChange = (event) => {
    setCarboneMineTransportActivity(event.target.checked);
  };

  useEffect(() => {
    if (!carboneMineActivity) {
      clearInterval(productionInterval);
    } else {
      clearInterval(productionInterval);
      productionInterval = setInterval(() => {
        setCumulatedCarboneMine(cumulatedCarboneMine => cumulatedCarboneMine + outputCarboneMine);
      }, 1000);
    }
    return () => clearInterval(productionInterval);
  }, [carboneMineActivity, outputCarboneMine]);

  intervaCarbonelMine = distanceCarboneMine / outputCarboneSpeed
  useEffect(() => {
    if (!carboneMineActivity || !carboneMineTransportActivity) {
      clearInterval(transportInterval);
    } else {
      clearInterval(transportInterval);
      transportInterval = setInterval(() => {
        setCumulatedCarboneMine(cumulatedCarboneMine => cumulatedCarboneMine - outputCarboneCapacityMine);
        setTimeout(() => {
          setStockDepotCarbone(stockDepotCarbone => stockDepotCarbone + outputCarboneCapacityMine);
        }, intervaCarbonelMine * 1000)
      }, intervaCarbonelMine * 1000 * 2);
      return () => clearInterval(transportInterval);
    }
  }, [carboneMineActivity, carboneMineTransportActivity, outputCarboneSpeed, outputCarboneCapacityMine]);

  function reloadPage() {
    window.location.reload(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to the mining management game
          </Typography>
          <Button color="inherit" onClick={reloadPage} >Restart all</Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>

        {/* Décalage */}
        <Grid item xs={12}  >
        </Grid>

        {/* Base */}
        <Grid item xs={3}  >
        </Grid>
        <Grid item xs={6}  >
          <Card sx={{ minWidth: 275, maxWidth: 500 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Ressources de la base
              </Typography>
              <TextField fullWidth sx={{ m: 1 }}
                id="outlined-read-only-input"
                label="Carbone [units]"
                value={stockDepotCarbone}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField fullWidth sx={{ m: 1 }}
                id="outlined-read-only-input"
                label="Cobalt [units]"
                value={stockDepotCobalt}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}  >
        </Grid>

        {/* Mine de cabone */}
        <Grid item xs={1}  >
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 300, maxWidth: 500, height: 300 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Mine de Carbone
              </Typography>
              <CardActions>
                <FormControlLabel control={<Switch />} label="Activer la mine de Carbone" onChange={switchCarboneChange} />
              </CardActions>
              <TextField fullWidth sx={{ m: 1 }}
                id="outlined-number"
                label="Stock de la mine [units]"
                type="number"
                margin="normal"
                value={cumulatedCarboneMine}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField fullWidth sx={{ m: 1 }}
                id="outlined-number"
                label="Rendement [units/s]"
                type="number"
                onChange={outputCarboneMineChange}
                value={outputCarboneMine}
                margin="normal"
                variant="standard"
                helperText="Changer le rendement de la mine"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 50, maxWidth: 400, height: 300 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Transport de Carbone
              </Typography>
              <CardActions>
                <FormControlLabel control={<Switch />} label="Activer le transport de Carbone" onChange={switchCarboneTransportChange} />
              </CardActions>
              <TextField fullWidth sx={{ m: 1 }}
                id="outlined-number"
                label="Vitesse du transport [pixel/s]"
                type="number"
                onChange={outputCarboneSpeedChange}
                value={outputCarboneSpeed}
                margin="normal"
                variant="standard"
                helperText="Changer la vitesse du transport"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField fullWidth sx={{ m: 1 }}
                id="outlined-number"
                label="Capacité [units]"
                type="number"
                onChange={outputCarboneCapacityMineChange}
                value={outputCarboneCapacityMine}
                margin="normal"
                variant="standard"
                helperText="Changer la capacité du transport"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}  >
        </Grid>

      </Grid>
    </Box>

  );

}

export default App;