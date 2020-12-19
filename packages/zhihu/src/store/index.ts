import { createStore } from "vuex";
import { testData } from "../testData";
import axios from "axios";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
interface UserProps {
  isLogin: boolean;
  username?: string;
  id?: number;
  columnId?: number;   // 每个用户都有唯一的专栏id
  email?: string;
  authorId?: string;
  createdAt?: string;
}
export interface PostProps {
  id?: number;
  title: string;
  content: string;
  avatar?: string;
  createdAt?: string;
  columnId: number;
  author: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  token: string;
  error: GlobalErrorProps;
}

export interface GlobalErrorProps{
  status: boolean;
  message?: string;
}


const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: false,
    },
    error:{
      status:false
    },
    token: localStorage.getItem("token") || "",
  },
  getters: {
    biggerColumnLength(state) {
      return state.columns.filter((c) => c.id > 2).length;
    },
    // 如果需要传递参数，可以返回一个函数
    getColumnById: (state) => (id: number) => {
      console.log("columnId:",id)
      return state.columns.find((c) => c.id === id)
    },
    getPostByCid: (state) => (cId: number) => {
      return state.posts.filter((post) => post.columnId === cId);
    },
    fetchColumns(state,rawData){
      state.columns = rawData.data.list;
    },
  },
  mutations: {
    login(state, rowData) {
      console.log("rowData:", rowData)
      state.token = rowData.data.token;
      localStorage.setItem("token",state.token)
      axios.defaults.headers.common["Authorization"] = rowData.data.token;
    },
    logout(state){
      state.user.isLogin = false;
      state.token = "";
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    getCurrentUser(state,rowData){
      state.user = Object.assign({},state.user,rowData.data,{isLogin:true});
    },
    setError(state,e: GlobalErrorProps){
      state.error = e;
    },
    createPost(state, payload) {
      state.posts.push(payload);
    },
  },
  actions:{
    fetchColumns(context){
      axios.get("http://api.vikingship.xyz/api/columns").then((res) => {
        context.commit("fetchColumns",res.data);
      })
    },
    login(context,params){
      return axios.post("https://common-login-api.herokuapp.com/api/users/login",params)
      .then((res) => {
        context.commit("login",res.data);
        return res.data;
      })
    },
    getCurrentUser(context){
      return axios.get("https://common-login-api.herokuapp.com/api/users/getUserInfo")
      .then((res) => {
        context.commit("getCurrentUser",res.data);
        return res.data;
      })
    },
    //如果在页面中需要嵌套多个dispatch。那么可以在action进行定义。将其合并成一个。
    loginAndFetch({dispatch},loginData){
      return dispatch("login",loginData).then(() => {
        return dispatch("getCurrentUser");
      })
    },
    register(context,params){
      return axios.post("https://common-login-api.herokuapp.com/api/users/register", params)
      .then((res) => {
        return res.data;
      })
    },
    createPost({commit},params){
      return axios.post("/api/posts/createPost",params).then((res) => {
        commit("createPost", res.data);
        return res.data;
      })
    }
  }
})

export default store;
