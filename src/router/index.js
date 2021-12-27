import { createRouter, createWebHistory } from 'vue-router';
import AuthorDetails from '../components/Author/AuthorDetails.vue';
import CategoryDetails from '../components/Category/CategoryDetails.vue';
import EditPost from '../components/Post/EditPost.vue';
import Hello from '../components/Hello/Hello.vue';
import NewPost from '../components/Post/NewPost.vue';
import PostDetails from '../components/Post/PostDetails.vue';
import PostsList from '../components/Post/PostsList.vue';

const routes = [
  {
    path: '/',
    name: 'PostsList',
    component: PostsList,
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello,
  },
  {
    path: '/posts/:postId',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  },
  {
    path: '/new',
    name: 'NewPost',
    component: NewPost,
  },
  {
    path: '/posts/edit/:postId',
    name: 'EditPost',
    component: EditPost,
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/author/:authorId',
    name: 'AuthorDetails',
    component: AuthorDetails,
    props: true
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryDetails',
    component: CategoryDetails,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
