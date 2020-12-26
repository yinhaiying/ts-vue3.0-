import { createStore } from "vuex";
import axios from "axios";
import { arrToObj } from "../utils/tools"
export interface ColumnProps {
  columnId: number;
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
export interface PostsProps {
  data: {
    [key: string]: PostProps;
  };
}

export type PostProps = {
  _id?: number;
  title: string;
  content: string;
  avatar?: string;
  createdAt?: string;
  columnId: number;
  author: string;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostsProps;
  user: UserProps;
  token: string;
  error: GlobalErrorProps;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}


const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: {
      data: {}
    },
    user: {
      isLogin: false,
    },
    error: {
      status: false
    },
    token: localStorage.getItem("token") || "",
  },
  getters: {
    // biggerColumnLength(state) {
    //   return state.columns.filter((c) => c. > 2).length;
    // },
    // 如果需要传递参数，可以返回一个函数
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => {
        console.log("ccccc:", c)
        return c.columnId == id
      })
    },
    getPostByCid: (state) => (cId: number) => {
      console.log("state.posts:", state.posts);
      const data = state.posts.data;
      const result = [];
      for (const attr in data) {
        if (data[attr].columnId === cId) {
          result.push(data[attr]);
        }
      }
      return result;
    },
    getCurrentPost: (state) => (postId: string): PostProps => {
      return state.posts.data[postId];
    }
  },
  mutations: {
    login(state, rowData) {
      console.log("rowData:", rowData)
      state.token = rowData.data.token;
      localStorage.setItem("token", state.token)
      axios.defaults.headers.common["Authorization"] = rowData.data.token;
    },
    logout(state) {
      state.user.isLogin = false;
      state.token = "";
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    getCurrentUser(state, rowData) {
      state.user = Object.assign({}, state.user, rowData.data, { isLogin: true });
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
    createPost(state, rowData) {
      state.posts.data[rowData.data._id] = rowData.data;
    },
    fetchColumns(state, rowData) {
      state.columns = rowData.data;
    },
    fetchPosts(state, posts) {
      state.posts.data = arrToObj(posts);
    },
    createColumn(state, rowData) {
      state.columns.push(rowData.data);
    },
    fetchCurrentPost(state, rowData) {
      // 为了避免刷新时数据丢失，最好所有的数据都通过vue中的store能够获取到.
      console.log("rowData111:", rowData);
      state.posts.data[rowData.data._id] = rowData.data;
    }
  },
  actions: {
    fetchColumns({ commit }) {
      return axios.get("/api/columns").then((res) => {
        commit("fetchColumns", res.data)
        return res.data;
      })
    },
    fetchPosts({ commit }, columnId) {
      return axios.get(`/api/columns/${columnId}/posts`).then((res) => {
        commit("fetchPosts", res.data.data.list);
        return res.data.data.list;
      })
    },
    login(context, params) {
      return axios.post("https://common-login-api.herokuapp.com/api/users/login", params)
        .then((res) => {
          context.commit("login", res.data);
          return res.data;
        })
    },
    getCurrentUser(context) {
      return axios.get("https://common-login-api.herokuapp.com/api/users/getUserInfo")
        .then((res) => {
          context.commit("getCurrentUser", res.data);
          return res.data;
        })
    },
    //如果在页面中需要嵌套多个dispatch。那么可以在action进行定义。将其合并成一个。
    loginAndFetch({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("getCurrentUser");
      })
    },
    register(context, params) {
      return axios.post("https://common-login-api.herokuapp.com/api/users/register", params)
        .then((res) => {
          return res.data;
        })
    },
    createPost({ commit }, params) {
      return axios.post("/api/posts/createPost", params).then((res) => {
        commit("createPost", res.data);
        return res.data;
      })
    },
    createColumn({ commit }, params) {
      return axios.post("/api/columns/createColumn", params).then((res) => {
        commit("createColumn", res.data);
        return res.data;
      })
    },
    fetchCurrentPost({ commit }, postId) {
      return axios.get(`/api/posts/${postId}`).then((res) => {
        commit("fetchCurrentPost", res.data);
        return res.data;
      })
    }
  }
})

export default store;
