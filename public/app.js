const store = {
  state: {
    draftImage: null,
  },
  setImage (image) {
    this.state.draftImage = image
  },
  clearDraftImage() {
    this.state.draftImage = null;
  },
};

const app = new Vue({
  el: '#app',

  data: {
    appName: 'The Friend Ship',
    ws: null,
    draftMessage: '',
    chatMessages: [],
    username: null,
    joined: false,

    sharedState: store.state,
  },

  created: function() {
    this.ws = new WebSocket(`ws://${window.location.host}/ws`);
    this.ws.addEventListener('message', (event) => {
      const { username, message, image } = JSON.parse(event.data);

      console.log(image);

      this.chatMessages.push({ username, message, image });

      const element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    });
  },

  computed: {
    hasImage: function () {
      return !!this.sharedState.draftImage;
    },
  },

  methods: {
    send: function () {
      if (!this.draftMessage && !this.sharedState.draftImage) {
        return;
      }

      this.ws.send(
        JSON.stringify({
          username: this.username,
          message: `${this.draftMessage}`,
          image: this.sharedState.draftImage || '',
        }),
      );
      this.draftMessage = '';
      store.clearDraftImage();
    },

    join: function () {
      if (!this.username) {
        Materialize.toast('You must choose a username', 2000);
        return
      }
      this.username = `${this.username}`;
      this.joined = true;
    },
  }
});
