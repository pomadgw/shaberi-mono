import socketIO from 'socket.io';
// import http from 'http';

export default function(server) {
  const io = socketIO(server);

  // let chatHistory = [];
  let i = 0;

  io.on('connection', (socket) => {
    console.log('terhubung!', i);
    i++;

    socket.on('send.chat', function (data) {
      // chatHistory.push(data['text']);
      io.emit('retrieve.chat', data );
    });
  });
}
