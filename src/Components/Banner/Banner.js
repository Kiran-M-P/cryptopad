import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 120,
    paddingBottom: 50,
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 25,
    },
  },
  bannerTitle: {
    color: "#ccd6f6",
    fontSize: 28,
    fontWeight: 500,
    paddingLeft: 10,
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <Container className={classes.bannerContent}>
      <Typography variant="h4" className={classes.bannerTitle}>
        Trending
      </Typography>
      <Carousel />
    </Container>
  );
};

export default Banner;
