import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#121418",
    minHeight: "100vh",
    color: "white",
  },
}));

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#64ffda",
      },
      type: "dark",
    },
    typography: {
      fontFamily: ["Poppins", "Roboto"].join(","),
    },
  });
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
