import React from "react";
import {
  AppBar,
  Container,
  useTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "#64ffda",
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
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar className={classes.appBar}>
            <Typography onClick={() => navigate("/")} className={classes.title}>
              Cryptopad
            </Typography>
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
    </ThemeProvider>
  );
};

export default Header;
