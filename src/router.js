import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Api from './views/api.vue';
import About from './views/about.vue';
import NotFound from './views/404.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/api',
      name: 'home',
      component: Api,
    },
    {
      path: '/about',
      name: 'home',
      component: About,
    },
    { 
      path: '/404', 
      component: NotFound },  
    { 
      path: '*', 
      redirect: '/404', 
    },  
  ],
});
