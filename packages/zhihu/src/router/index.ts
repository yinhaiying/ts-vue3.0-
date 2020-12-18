import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create_post',
      name: 'createPost',
      component: CreatePost,
      meta:{
        requiredLogin:true
      }
    }
  ]
})

/* 
不同页面具有不同的规则：
1. 首页，文章详情页所有用户都可以访问
2. 登录页面。如果处于登录状态则重定向到首页
3. 发布文章页面必须是登录状态(requiredLogin进行判断)
*/

router.beforeEach((to,from,next) => {
  // if(to.meta.requiredLogin && !store.state.user.isLogin){
  //   next({name:"login"});
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin){
  //   next({name:"home"})
  // }else{
  //   next();
  // }
  const {user,token} = store.state;
  const { redirectAlreadyLogin, requiredLogin} = to.meta;
  if(!user.isLogin){
    if(token){
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch('getCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next("/");
        } else {
          next();
        }
      }).catch((e) => {
        console.log(e);
        localStorage.removeItem("token");
        next("/login");
      })
    }else{
      if(requiredLogin){
        next("/login");
      }else{
        next();
      }
    }
  }else{
    if (redirectAlreadyLogin){
      next("/");
    }else{
      next();
    }
  }
})

export default router
