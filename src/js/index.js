var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/node_modules', express.static('node_modules'));

// Add code here

http.listen(3000, function(){
    console.log('Stock Ticker Started, connect to localhost:3000');
});