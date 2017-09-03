import socketIO from 'socket.io';
// import http from 'http';

export default function(server) {
  const io = socketIO(server);

  const MAX_SIZE = 1000;

  let users = [];
  let chatsHistories = [];
  let i = 0;

  io.on('connection', (socket) => {
    console.log(socket.handshake.query.nickname);
    socket.emit('send.chat.histories', chatsHistories);

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
      chatsHistories.push(data);
      if (chatsHistories.length > MAX_SIZE) {
        chatsHistories.shift();
        socket.emit('send.chat.histories', chatsHistories);
      }
      chosenData.forEach((sock) => {
        sock.emit('retrieve.chat', data );
      });
    });

    socket.on('disconnect', function() {
      const user = users.filter(e => e.id == socket.id)[0];
      console.log('Disconnected:', user.nickname);
      const id = users.indexOf(user);
      console.log('id:', id);
      users.splice(id, 1);
    });
  });
}
