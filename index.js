var express = require("express");
const excel = require('node-excel-export');
var moment = require('moment');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require('socket.io')(server);
app.listen(5501);

var bodyParser = require('body-parser');

//-------------------------------------------------------------------
//Socket IO
server.listen(5502, function(){
	console.log('Socket io listening on *:3008');
});

//=========================================================
var mqtt = require('mqtt')
var client  = mqtt.connect('http://27.71.231.45:1883')
 
//=========================================================


