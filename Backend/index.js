const express = require('express');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`App is listening at port no ${port}`,)
})

//adding routes to requests
const routes = require('./routes/route');

//mounting the route.
app.use("/hc",routes);
