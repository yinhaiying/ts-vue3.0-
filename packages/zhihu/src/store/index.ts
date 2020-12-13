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
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name:"海英",
      columnId:1
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "海鹰" }
    },
    createPost(state,payload){
      state.posts.push(payload);
    }
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
    }
  },
  actions:{
    fetchColumns(context){
      console.log("这里没有会自行吗")
      axios.get("http://api.vikingship.xyz/api/columns").then((res) => {
        context.commit("fetchColumns",res.data);
      })
    }
  }
})

export default store;
