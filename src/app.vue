<template>
<div class="container-fluid">
  <form class="form-inline" @submit.prevent="connect">
    <div class="form-row align-items-center">
      <div class="col-auto">
        <label class="sr-only" for="nickname">Nickname</label>
        <div class="input-group mb-2 mb-sm-0">
          <div class="input-group-addon">@</div>
          <input type="text" class="form-control" v-model="nickname" id="nickname" placeholder="Nickname" :disabled="disableNick">
        </div>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" :disabled="disableNick">Connect</button>
      </div>
    </div>
  </form>
  <br>
  <div v-if="socket != null">
    <table class="table">
      <tr v-for="chat in chats">
        <td>{{ chat.nickname }} says: </span></span>{{ chat.text }}</td>
      </tr>
    </table>
    <form class="form-inline" @submit.prevent="sendChat">
      <div class="form-row align-items-center">
        <div class="col-auto">
          <label class="sr-only" for="nickname">Chat</label>
          <div class="input-group mb-2 mb-sm-0">
            <input type="text" class="form-control" v-model="currentChat" id="nickname" placeholder="Chat!">
          </div>
        </div>
        <div class="col-auto">
          <button type="Submit" class="btn btn-primary">Send</button>
        </div>
      </div>
    </form>
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
      count: 0,
    }
  },
  computed: {
    disableNick() {
      return this.socket != null;
    }
  },
  methods: {
    sendChat() {
      this.socket.emit('send.chat',
        {
          text: this.currentChat,
          nickname: this.nickname,
        }
      );
      this.currentChat = "";
    },
    connect() {
      if (this.socket == null) {
        this.socket = io.connect();
        this.setEvents();
      }
    },
    setEvents() {
      this.socket.on('retrieve.chat', (data) => {
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
