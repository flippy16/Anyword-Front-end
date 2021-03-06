import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SequentialEntrance from 'vue-sequential-entrance'

Vue.use(SequentialEntrance);
Vue.config.productionTip = false;

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');