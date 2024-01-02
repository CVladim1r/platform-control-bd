import { createRouter, createWebHistory } from 'vue-router';
import DatabaseManager from '@/components/DatabaseManager.vue';

const routes = [
  {
    path: '/',
    name: 'DatabaseManager',
    component: DatabaseManager
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
