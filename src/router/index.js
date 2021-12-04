import { createRouter, createWebHistory } from 'vue-router';
import PostsList from '../components/PostsList.vue';
import PostDetails from '../components/PostDetails.vue';

const routes = [
  {
    path: '/',
    name: 'PostsList',
    component: PostsList,
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
