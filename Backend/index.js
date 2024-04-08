const express = require("express");
const dbconnect = require("./config/database");
const cors = require("cors");
const app = express();
const cookiesParser = require("cookie-parser");

const path = require("path");
app.use(
  "/",
  express.static(path.join(__dirname, "../healthconnectfrontend/build"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://healthconnect-e0t5.onrender.com");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "https://healthconnect-e0t5.onrender.com",
    // origin: "http://localhost:3000",
    
  })
);

require("dotenv").config();
app.use(express.json()); // to parse json data from requests
app.use(cookiesParser()); // to parse cookies from request
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listening at port no ${port}`);
});

dbconnect();

// adding routes to requests from frontend
const routes = require("./routes/route");

// mounting the route.
app.use("/hc", routes);
