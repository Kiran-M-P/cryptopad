import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import numberWithCommas from "../config/numberWithCommas";
import WindowDimension from "../config/windowDimensions";
import { CryptoState } from "../CryptoContext";

// styles
const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: 20,
    marginBottom: 50,
    width: "100%",
    [`& fieldset`]: {
      borderRadius: 25,
      borderWidth: 2,
      borderColor: "#8892b0",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
    },
  },
  logo: {
    width: 35,
    [theme.breakpoints.down("sm")]: {
      width: 30,
    },
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1B1F24",
    },
    fontFamily: "Poppins",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#66FFCC",
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
  const { x } = WindowDimension();

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

  // search
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // navigate
  const navigate = useNavigate();

  // classes
  const classes = useStyles();

  return (
    <Container style={{ textAlign: "center" }}>
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        label="Search"
        variant="outlined"
        className={classes.search}
        InputProps={{ style: { fontFamily: "Poppins", color: "#ccd6f6" } }}
        InputLabelProps={{
          style: { fontFamily: "Poppins", color: "#ccd6f6" },
        }}
      ></TextField>
      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "Price", "24h %", "Market Cap"].map((head) => (
                  <TableCell
                    key={head}
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontSize: 15,
                      borderBottom: "none",
                    }}
                    align={head === "Name" ? "left" : "right"}
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
                          gap: 10,
                          alignItems: "center",
                          borderBottom: "none",
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          className={classes.logo}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "16",
                              fontWeight: 600,
                            }}
                          >
                            {row.name}
                          </span>
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontWeight: 400,
                              fontSize: 12,
                              marginBottom: 5,
                              color: "#8892b0",
                            }}
                          >
                            {row.symbol}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{ borderBottom: "none" }}>
                        {symbol}&nbsp;
                        {numberWithCommas(row?.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14,203,129)" : "#FF6666",
                          fontWeight: 500,
                          borderBottom: "none",
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right" style={{ borderBottom: "none" }}>
                        {symbol}&nbsp;
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
        size={x < 500 ? `small` : "large"}
        style={{
          padding: 30,
          paddingBottom: 40,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        count={Number((handleSearch()?.length / 10).toFixed(0))}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 350);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
