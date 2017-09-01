import socketIO from 'socket.io';
// import http from 'http';

export default function(server) {
  const io = socketIO(server);

  let users = [];
  let i = 0;

  io.on('connection', (socket) => {
    console.log(socket.handshake.query.nickname);
    if (socket.handshake.query.nickname != null) {
      users.push({
        nickname: socket.handshake.query.nickname,
        id: socket.id,
        socket
      });
    }

    socket.on('send.chat', function (data) {
      const nickname = data.nickname;
      const chosenData = users.filter(e => e.nickname !== nickname).map(e => e.socket);
      chosenData.forEach((sock) => {
        sock.emit('retrieve.chat', data );
      });
    });
  });
}
