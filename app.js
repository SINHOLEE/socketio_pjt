const app = require("express")();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
var cors = require('cors');
const db = require('./db');

const my_log = (req, res, next) => {
  console.log("url: ", req.url, "method: ", req.method);
  next();
}
app.use(cors());
app.use(my_log);

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/api/findall', function(req, res){
  res.json(db.findAll())
})

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    console.log('in chat event',data);
    db.create(data);
    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    // socket.broadcast.emit('chat', msg);
    socket.emit('chat', data);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    // socket.emit('s2c chat', msg);

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    // io.emit('s2c chat', msg);

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});


server.listen(3000, function(){
	console.log('socket io server listening on port 3000');
});

