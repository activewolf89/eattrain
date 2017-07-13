var express = require('express');
var app = express();
require("./config/mongoose.js")
var bodyParser = require('body-parser')
app.use(bodyParser());
route_app = require("./config/configRoute.js")
route_app(app)

const port = 3001
app.listen(port, ()=>{
  console.log(`listening on ${port}`)
})
