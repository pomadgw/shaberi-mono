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
        <button type="submit" class="btn btn-primary" v-if="!disableNick">Connect</button>
        <button type="submit" class="btn btn-primary" v-else>Disconnect</button>
      </div>
    </div>
  </form>
  <br>
  <div v-if="socket != null">
    <div class="table-wrap">
      <table class="table">
        <tr v-for="chat in chats">
          <td :class="chat.classes">{{ chat.nickname }} says: </span></span>{{ chat.text }}</td>
        </tr>
      </table>
    </div>
    <div class="bottom-chat">
      <form class="form-inline" @submit.prevent="sendChat">
        <div class="row align-items-center" style="width: 100%">
          <div class="col">
            <label class="sr-only" for="nickname">Chat</label>
            <div class="input-group mb-2 mb-sm-0">
              <input autocomplete="off" type="text" class="form-control" v-model="currentChat" id="nickname" placeholder="Chat!">
            </div>
          </div>
          <div class="col-auto">
            <button type="Submit" class="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
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
      let data = {
        text: this.currentChat,
        nickname: this.nickname,
      };
      this.socket.emit('send.chat', data);
      data['classes'] = 'current-user';
      this.chats.push(data);
      this.currentChat = "";
    },
    connect() {
      if (this.socket == null) {
        this.socket = io.connect({ query: `nickname=${this.nickname}` });
        this.setEvents();
      } else {
        this.disconnect();
      }
    },
    disconnect() {
      this.socket.disconnect();
      this.socket = null;
    },
    setEvents() {
      this.socket.on('retrieve.chat', (data) => {
        data['classes'] = '';
        this.chats.push(data);
      });
      this.socket.on('send.chat.histories', (data) => {
        this.chats = data;
        this.chats.forEach((element) => {
          if (element.nickname === this.nickname) {
            element['classes'] = 'current-user';
          }
        });
      });
    },
  },
}
</script>

<style>
.message {
  color: blue;
}
.current-user {
  background: #55aaee;
}
.bottom-chat {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 95%;
  margin: auto;
  padding: 12px 0;
}
.bottom-chat .row {
  margin: 0;
}
.bottom-chat .col,
.bottom-chat .col-auto {
  padding: 0;
}
.table-wrap {
  height: 700px;
  overflow-y: scroll;
}
</style>
