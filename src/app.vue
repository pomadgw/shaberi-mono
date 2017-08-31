<template>
<div>
  Nickname: <input type="text" v-model="nickname">
  <button @click="connect">Connect</button>
  <br>
  <div v-if="socket != null">
    <div v-for="chat in chats">
      <span>{{ chat.nickname }} says: </span></span>{{ chat.text }}</span>
    </div>
    <input type="text" @keyup.enter="sendChat" v-model="currentChat">
  </div>
</div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      chats: [],
      currentChat: '',
      socket: null,
      nickname: '',
    }
  },
  methods: {
    sendChat() {
      console.log(this.currentChat);
      this.socket.emit('chat',
        {
          text: this.currentChat,
          nickname: this.nickname,
        }
      );
    },
    connect() {
      this.socket = io.connect();
      this.setEvents();
    },
    setEvents() {
      this.socket.on('chat', (data) => {
        this.chats.push(data);
      });
    },
  },
}
</script>

<style>
.message {
  color: blue;
}
</style>
