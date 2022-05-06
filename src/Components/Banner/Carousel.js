import React, { useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#1B1F24",
    width: 300,
    borderRadius: 20,
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
  },
  coinName: {
    fontSize: 22,
    fontWeight: 600,
    textTransform: "lowercase",
    "&::first-letter": {
      textTransform: "uppercase",
    },
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const classes = useStyles();

  const { currency, symbol } = CryptoState();

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
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <img src={coin?.image} alt={coin.name} style={{ width: 80 }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography className={classes.coinName}>
                  {coin.name}
                </Typography>
                <span style={{ fontWeight: 400 }}>
                  {coin.symbol}&nbsp;
                  <span
                    style={{
                      color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 400,
                    }}
                  >
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                  {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
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
