<template>
<div class="message">{{ msg }}</div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  mounted() {
    const socket = io.connect();
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
}
</script>

<style>
.message {
  color: blue;
}
</style>
