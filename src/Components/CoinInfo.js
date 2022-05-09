import { CircularProgress, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 10,
    },
  },
}));

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "'Poppins', sans-serif";
ChartJS.defaults.borderColor = "#121418";
// ChartJS.defaults.scale.ticks.display = false;
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {!historicalData ? (
        <CircularProgress
          style={{ color: "#66FFCC" }}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                children={day.label}
                selected={day.value === days}
              />
            ))}
          </div>
          <div style={{ height: "40vh", width: "100%" }}>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `  Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#66FFCC",
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    enabled: true,

                    mode: "nearest",
                    intersect: false,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  autoPadding: true,
                },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
