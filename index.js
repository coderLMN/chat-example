var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var count = 0;
io.on('connection', function(socket){
  count ++;
    io.emit('count', count);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function () {
    count --;
    io.emit('count', count);
  });
});


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});