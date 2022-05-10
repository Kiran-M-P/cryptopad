import React, { useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import numberWithCommas from "../../config/numberWithCommas";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#1B1F24",
    width: 280,
    padding: "auto",
    borderRadius: 30,
    "&:hover": {
      backgroundColor: "#404347",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 35,
    minHeight: 150,
  },
  coinSymbol: {
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 5,
    color: "#8892b0",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    fontFamily: "Poppins",
    paddingTop: 30,
  },
  coinName: {
    fontSize: 20,
    fontWeight: 600,
    textTransform: "lowercase",
    "&::first-letter": {
      textTransform: "uppercase",
    },
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <img src={coin?.image} alt={coin.name} style={{ width: 80 }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography className={classes.coinName}>{coin.name}</Typography>

              <span className={classes.coinSymbol}>
                {coin.symbol}&nbsp;
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "#FF6666",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>
              <span style={{ fontSize: 16, fontWeight: 400 }}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
