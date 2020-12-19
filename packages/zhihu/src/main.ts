
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index"

import axios from "axios";
axios.defaults.baseURL = "https://common-login-api.herokuapp.com";
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (e) {
    // 对响应错误做点什么
    console.log(e);
    const {error} = e.response.data;
    store.commit("setError",{status:true,message:error});
    return Promise.reject(error);
});


const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')
