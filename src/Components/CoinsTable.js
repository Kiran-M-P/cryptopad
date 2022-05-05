import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

// styles
const useStyles = makeStyles(() => ({
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "grey",
    },
    fontFamily: "Jetbrains Mono",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#64ffda",
    },
  },
}));

const CoinsTable = () => {
  // states
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // coins data fetch
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

  // theme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#64ffda",
      },
      type: "dark",
    },
  });

  // search
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  // navigate
  const navigate = useNavigate();

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          variant="outlined"
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "100%",
          }}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      style={{
                        fontFamily: "Jetbrains Mono",
                        fontWeight: 700,
                      }}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img src={row?.image} alt={row.name} height="40" />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignContent: "center",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Jetbrains Mono",
                                fontSize: "1rem",
                                fontWeight: 600,
                              }}
                            >
                              {row.name}
                            </span>
                            <span
                              style={{
                                textTransform: "uppercase",
                                color: "darkgrey",
                                fontFamily: "Jetbrains Mono",
                              }}
                            >
                              {row.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, 6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={Number((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
