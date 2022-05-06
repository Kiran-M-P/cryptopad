import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <Container className={classes.bannerContent}>
      <Typography variant="h4">Trending</Typography>
      <Carousel />
    </Container>
  );
};

export default Banner;
