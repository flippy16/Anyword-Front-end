<template>
  <div>
    <center>
      <button @click="showMessageForm = !showMessageForm" type="submit" class="btn btn-outline-info mb-3">Say Something</button>
    </center>
    <div class="col-m-12">
      <div class="col-m-3">&nbsp;</div>
      <div class="col-m-6">
        <form v-if="showMessageForm" @submit.prevent="addMessage" class="mb-5">
          <div v-if="error" class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Error!</strong> {{error}}
          </div>
          <div class="form-group">
            <label for="username">Name</label>
            <input v-model="message.username" type="text" 
            class="form-control" id="username" value="Anonymous" required>
          </div>
          <div class="form-group">
            <label for="text">Message</label>
            <textarea v-model="message.message" 
            class="form-control" id="message" 
            rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-outline-success float-right">Send My Words</button>
        </form>
      </div>
      <div class="col-m-3">&nbsp;</div>
    </div>
    <div class="row">
      <div class="card col-md-3 mb-3" style="width:100%;" v-for="message in reversedMsg" :key="message._id">
        <div class="card-body">
          <center>
            <h4 class="card-title text-dark">{{message.username}}</h4>
            <img style="height: 75px; width: 75px; display: block; border-radius:100px; border:1.5px solid #000000;" class="mb-4" :src="'/images/'+ message.imgURL + '.svg'" :alt="message.subject">
            <h6 class="card-subtitle mb-2 text-muted" style="margin-top:-12px; font-size:10pt;">{{message.date}}</h6>
            <p class="card-text text-dark mt-3">"{{message.message}}"</p>
          </center>
        </div>
      </div>
    </div>
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
