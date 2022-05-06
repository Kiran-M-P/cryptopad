import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#66FFCC",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 20,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  paper: {
    background: "#1B1F24",
    color: "white",
    fontFamily: "Poppins",
  },
  appBar: {
    [theme.breakpoints.down("md")]: {
      height: 70,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar className={classes.appBar}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
            onClick={() => navigate("/")}
          >
            <img src="./cryptopadLogo.png" height="30" alt="logo" />
            <Typography className={classes.title}>ryptopad</Typography>
          </div>
          <Select
            variant="outlined"
            style={{
              width: 100,
              height: 35,
              fontFamily: "Poppins",
            }}
            MenuProps={{
              classes: {
                paper: classes.paper,
              },
            }}
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
