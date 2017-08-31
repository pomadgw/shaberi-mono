import socketIO from 'socket.io';
// import http from 'http';

export default function(server) {
  const io = socketIO(server);

  let chatHistory = [];

  io.on('connection', (socket) => {
    console.log('terhubung!');

    socket.on('chat', function (data) {
      console.log(data);
      chatHistory.push(data['text']);
      io.emit('chat', data );
    });
  });
}
