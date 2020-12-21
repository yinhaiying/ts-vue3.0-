<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" :to = "'/'">海鹰专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link :to="{ name: 'login' }" class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link :to="{ name: 'login' }" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好，${user.username}`">
          <dropdown-item><router-link class="dropdown-item" :to = "{name:'createPost'}">新建文章</router-link></dropdown-item>
          <dropdown-item><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
          <dropdown-item>
            <li class="dropdown-item" @click = "logout">退出登录</li>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import createMessage from "./createMessage"
import {useStore} from "vuex";
import { useRouter } from "vue-router";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(){
    const store = useStore();
    const router = useRouter();
    const logout = () => {
      store.commit('logout');
      createMessage("退出成功","success");
      router.push({name:"login"});
    };
    return {
      logout
    }
  },
  components: {
    Dropdown,
    DropdownItem,
  },
});
</script>

<style lang = "less" scoped>
.dropdown-item{
  cursor:pointer;
}
</style>
