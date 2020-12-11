<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <form>
      <div class="mb-3">
        <label for="" class="form-label">邮箱地址</label>
        <validate-input :rules = "emailRules" v-model = "emailVal" hello ="hi" placeholder="请输入邮箱" type = "password"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput,{RulesProp} from "./components/ValidateInput.vue"
import "bootstrap/dist/css/bootstrap.min.css";
const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: "https://pic4.zhimg.com/v2-675b5f63b8fda663cc12cc95aec4f5b6_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 2,
    avatar: "https://pic1.zhimg.com/v2-a8faa37c113eff2c80e01c91dff5890b_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 3,
    avatar: "https://pic1.zhimg.com/v2-56fdabb5e6c6386e61b037261627fc5c_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 4,
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
];
const currentUser: UserProps = {
  isLogin: true,
  name: "海英斯坦",
};
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup() {
    const emailRules: RulesProp = [
      {type:"required",message:"邮箱地址不能为空"},
      {type:"email",message:"请输入正确的邮箱地址"},
    ]
    const emailVal = ref("");
    return {
      list: testData,
      user: currentUser,
      emailRules,
      emailVal
    };
  },
});
</script>

<style lang="less">

</style>
