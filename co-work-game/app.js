'use strict';

const app = require("express")();
const http = require("http").createServer(app);
const io = require('socket.io')(http); // 소켓에 http를 등록한다.

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});
io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
http.listen(8000, ()=>{
console.log('listen 8000 port');
})