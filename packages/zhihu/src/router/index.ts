import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ColumnDetail from "../views/ColumnDetail.vue"
import CreatePost from "../views/CreatePost.vue"
import store from "../store/index";
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create_post',
      name: 'createPost',
      component: CreatePost
    }
  ]
})



router.beforeEach((to,from,next) => {
  if (to.name !== 'login' && !store.state.user.isLogin){
    next({name:"login"})
  }else{
    next();
  }
})

export default router
