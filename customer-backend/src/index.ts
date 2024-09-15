import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

//data array for storing messages
let kafkaMessages: {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}[] = [];

//Kafka-like render data every 5 seconds
setInterval(() => {
  const message = {
    store_id: 10,
    customers_in: Math.floor(Math.random() * 5),
    customers_out: Math.floor(Math.random() * 5),
    time_stamp: new Date().toLocaleTimeString(),
  };
  kafkaMessages.push(message);

  if (kafkaMessages.length > 24) {
    kafkaMessages.shift();
  }
}, 5000);

app.get("/api/live", (req, res) => {
  const liveData = kafkaMessages[kafkaMessages.length - 1] || {
    message: "No live data available",
  };
  res.json(liveData);
});

//get historical data (last 24 hours)
app.get("/api/history", (req, res) => {
  res.json(kafkaMessages);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
