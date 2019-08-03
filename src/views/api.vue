<template>
  <div>
    <h3>API Documentation</h3>
    <p>
      This is the documentation to use this API of Anywords
    </p>
  </div>
</template>

<style scoped>
  hr{
    border : 1px solid white;
  }
  img{
    width:100px;
    height: auto;
  }
</style>

<script>
// const urlAPI = 'https://young-brook-59453.herokuapp.com/messages';
const urlAPI = 'http://localhost:9090/messages';
const months = ["January", "February", "March","April", "May", "June", "July", "August", "Sptember", "October", "November", "December"];
var current_datetime = new Date();
export default {

  name: 'home',
  data: () => ({
    showMessageForm: false,
    error: '',
    messages: [],
    message: {
      username: 'Anonymous',
      message: '',
      imgURL: Math.floor(Math.random() * (6 - 1) + 1),
      date: current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    },
  }),
  mounted() {
    fetch(urlAPI).then(res => res.json()).then((result) => {
      this.messages = result;
    });
  },
  computed: {
    reversedMsg() {
      return this.messages.slice().reverse();
    },
  },
  methods: {
    addMessage() {
      fetch(urlAPI, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json()).then((result) => {
        if (result.details) {
          const err = result.details.map(det => det.message).join(' ');
          this.error = err;
        } else {
          this.error = '  ';
          this.messages.push(result);
        }
      });
    },
  },
};
</script>
