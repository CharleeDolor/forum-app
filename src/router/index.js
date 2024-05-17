// routes.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import HomePage from '../components/HomePage.vue'
import CreatePostPage from '../components/CreatePostPage.vue'

const routes = [
  { path: '/', component: LoginPage, name: 'login' },
  { path: '/register', component: RegisterPage, name: 'register' },
  {
    path: '/home', component: HomePage, name: 'home',
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('token');
      next('/');
    }
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePostPage,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        next();
      } else {
        next('/');
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
