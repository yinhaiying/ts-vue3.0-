<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <validate-form @form-submit = "onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">邮箱地址</label>
        <validate-input ref = "inputRef" :rules = "emailRules" v-model = "emailVal"  placeholder="请输入邮箱" type = "password"></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">密码</label>
        <validate-input  :rules = "passwordRules" v-model = "passwordVal"  type = "password"></validate-input>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary">Submit</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import  { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput,{RulesProp} from "./components/ValidateInput.vue";
import ValidateForm from "./components/ValidateForm.vue";
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
    ValidateInput,
    ValidateForm
  },
  setup() {
    const emailRules: RulesProp = [
      {type:"required",message:"邮箱地址不能为空"},
      {type:"email",message:"请输入正确的邮箱地址"},
    ]
    const passwordRules: RulesProp = [
      {type:"required",message:"密码长度不能为空"},
      {type:"length",message:"密码长度不能超过6位",length:6},
    ]
    const emailVal = ref("792@qq.com");
    const passwordVal = ref("123")
    const inputRef = ref();
    const onFormSubmit = (result: boolean) => {
      console.log("提交的结果：");
      console.log(result)
    }
    return {
      list: testData,
      user: currentUser,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit,
      inputRef  // 用于拿到子组件
    };
  },
});
</script>

<style lang="less">

</style>
