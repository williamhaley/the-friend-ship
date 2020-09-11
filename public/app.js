new Vue({
  el: '#app',

  data: {
    appName: 'The Friend Ship',

    ws: null, // Our websocket
    newMsg: '', // Holds new messages to be sent to the server
    chatContent: '', // A running list of chat messages displayed on the screen
    username: null, // Our username
    joined: false,
  },

  created: function() {
    this.ws = new WebSocket(`ws://${window.location.host}/ws`);
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      this.chatContent += `<div class="chip">${msg.username}</div>${msg.message}<br/>`;

      const element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    });
  },

  methods: {
    send: function () {
      if (this.newMsg != '') {
        this.ws.send(
          JSON.stringify({
            username: this.username,
            message: $('<p>').html(this.newMsg).text() // Strip out html
          }
        ));
        this.newMsg = ''; // Reset newMsg
      }
    },

    join: function () {
      if (!this.username) {
        Materialize.toast('You must choose a username', 2000);
        return
      }
      this.username = $('<p>').html(this.username).text();
      this.joined = true;
    },
  }
});
