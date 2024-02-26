const express = require('express');
const dbconnect = require('./config/database');
const app = express();
// const cors = require('cors');

// app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

require('dotenv').config();
app.use(express.json());//to parse json data from requests
const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`App is listening at port no ${port}`,)
})

dbconnect();

//adding routes to requests from frontend
const routes = require('./routes/route');
//mounting the route.
app.use("/hc",routes);
