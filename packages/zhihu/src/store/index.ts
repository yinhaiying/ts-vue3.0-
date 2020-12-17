import { createStore } from "vuex";
import { testData, testPosts, ColumnProps } from "../testData";
import axios from "axios";
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;   // 每个用户都有唯一的专栏id
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
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
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
    },
    error:{
      status:false
    },
    token: localStorage.getItem("token") || ""
  },
  getters: {
    biggerColumnLength(state) {
      return state.columns.filter((c) => c.id > 2).length;
    },
    // 如果需要传递参数，可以返回一个函数
    getColumnById: (state) => (id: number) => {
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
    createPost(state, payload) {
      state.posts.push(payload);
    },
    login(state, rowData) {
      console.log("rowData:", rowData)
      state.token = rowData.data.token;
      localStorage.setItem("token",state.token)
      axios.defaults.headers.common["Authorization"] = rowData.data.token;
    },
    getCurrentUser(state,rowData){
      state.user ={...state.user,isLogin:true,name:rowData.data.username}
    },
    setError(state,e: GlobalErrorProps){
      state.error = e;
    }
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
    }
  }
})

export default store;
