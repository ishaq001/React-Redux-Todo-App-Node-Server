var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser').json();
var cors = require('cors')
require("dotenv").config();

var Router = require("./routes/index");

var app = express();

app.use(cors());
app.options('*', cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/",bodyParser, Router);

//________DB Connect____________
const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
//________DB Connect____________

module.exports = app;
