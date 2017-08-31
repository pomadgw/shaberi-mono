import socket from 'socket.io';
// import http from 'http';

export default function(server) {
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('terhubung!');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
}
