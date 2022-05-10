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
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  select: {
    [`& fieldset`]: {
      borderRadius: 15,
      borderWidth: 2,
    },
  },
  logo: {
    width: 30,
    [theme.breakpoints.down("md")]: {
      width: 27,
    },
  },
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
    color: "#ccd6f6",
    fontFamily: "Poppins",
  },
  toolBar: {
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: 70,
    },
  },
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <HideOnScroll>
      <AppBar style={{ backgroundColor: "#121418" }}>
        <Container>
          <Toolbar className={classes.toolBar}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
              onClick={() => navigate("/")}
            >
              <img src={logo} className={classes.logo} alt="logo" />
              <Typography className={classes.title}>ryptopad</Typography>
            </div>
            <Select
              variant="outlined"
              className={classes.select}
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
    </HideOnScroll>
  );
};

export default Header;
