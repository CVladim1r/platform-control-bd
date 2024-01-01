import Vue from 'vue';
import Router from 'vue-router';
import DatabaseManager from '@/components/DatabaseManager.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DatabaseManager',
      component: DatabaseManager
    }
  ]
});
