import {
  makeStyles,
  Typography,
  LinearProgress,
  TableContainer,
  Table,
  TableRow,
  TableCell,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import numberWithCommas from "../config/numberWithCommas";
import WindowDimension from "../config/windowDimensions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins",
    minHeight: "100vh",
    color: "#ccd6f6",
  },
  childContainer: {
    display: "flex",
    gap: 50,
    width: "100%",
    padding: "7%",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 60,
      padding: 10,
      alignItems: "start",
    },
  },
  sidebar: {
    width: "30%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
  },

  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("smxs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const { x } = WindowDimension();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const classes = useStyles();
  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const cellSize = x < 500 ? "small" : "medium";

  let profit = coin?.market_data.price_change_percentage_24h >= 0;
  if (!coin) return <LinearProgress />;

  return (
    <div className={classes.container}>
      <div className={classes.childContainer}>
        <div className={classes.sidebar}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              paddingTop: 20,
              paddingBottom: 30,
            }}
          >
            <img src={coin?.image.large} alt={coin?.name} height="45" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                style={{ fontSize: 22, fontWeight: 500 }}
              >
                {coin?.name}
              </Typography>
              <p>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: 14,
                    color: "#8892b0",
                  }}
                >
                  {coin.symbol}
                </span>
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "#FF6666",
                    fontSize: 14,
                  }}
                >
                  {profit && "+"}
                  {coin?.market_data.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
          <TableContainer
            style={{ backgroundColor: "#1B1F24", padding: 5, borderRadius: 25 }}
          >
            <Table>
              <TableRow>
                <TableCell size={cellSize} style={{ borderBottom: "none" }}>
                  <p>Current Price</p>
                </TableCell>
                <TableCell
                  size={cellSize}
                  align="right"
                  style={{ borderBottom: "none" }}
                >
                  <p>
                    {symbol}&nbsp;
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size="small" style={{ borderBottom: "none" }}>
                  <p>Market Cap</p>
                </TableCell>
                <TableCell
                  size="small"
                  align="right"
                  style={{ borderBottom: "none" }}
                >
                  <p>
                    {symbol}&nbsp;
                    {numberWithCommas(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                    M
                  </p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small" style={{ borderBottom: "none" }}>
                  <p>Rank</p>
                </TableCell>
                <TableCell
                  size="small"
                  align="right"
                  style={{ borderBottom: "none" }}
                >
                  <p>{coin?.market_cap_rank}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small" style={{ borderBottom: "none" }}>
                  <p>Trading Volume</p>
                </TableCell>
                <TableCell
                  size="small"
                  align="right"
                  style={{ borderBottom: "none" }}
                >
                  <p>
                    {symbol}&nbsp;
                    {numberWithCommas(
                      coin?.market_data.total_volume[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                    M
                  </p>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
