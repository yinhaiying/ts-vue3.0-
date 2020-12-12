import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "../testData";
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
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
      isLogin: false
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "海鹰" }
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
    }
  }
})

export default store;
