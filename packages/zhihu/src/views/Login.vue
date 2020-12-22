<template>
  <div class="login-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="form-item">
        <h3>登录</h3>
      </div>
      <div class="mb-3 form-item">
        <label for="" class="form-label">用户名：</label>
        <validate-input
          :rules="usernameRules"
          v-model="usernameVal"
          placeholder="请输入邮箱"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3 form-item">
        <label for="" class="form-label">密码：</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          type="password"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <div class="mb-3 form-item">
          <button type="submit" class="btn btn-primary">登录</button>
        </div>   
      </template>
    </validate-form>
  </div>
</template>

<script lang = "ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import createMessage from "../components/createMessage"
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput,{RulesProp} from "../components/ValidateInput.vue";
export default defineComponent({
  name: "Login",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const usernameRules: RulesProp = [
      { type: "required", message: "用户名不能为空" },
    ]
    // const emailRules: RulesProp = [
    //   { type: "required", message: "邮箱地址不能为空" },
    //   { type: "email", message: "请输入正确的邮箱地址" },
    // ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码长度不能为空" },
      { type: "length", message: "密码长度不能超过6位", length: 6 },
    ];
    const usernameVal = ref("");
    // const emailVal = ref("");
    const passwordVal = ref("");
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const params = {
          username:usernameVal.value,
          password:passwordVal.value
        }
        store.dispatch('loginAndFetch', params).then((res) => {
          console.log("res:",res)
          if(res.code === 200){
            createMessage("登录成功","success");
            router.push("/");
          }
          
        }).catch((e) => {
          console.log(e);
        })
      }
    };
    return {
      // emailRules,
      // emailVal,
      passwordRules,
      passwordVal,
      usernameRules,
      usernameVal,
      onFormSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
.login-page{
  display:flex;
  justify-content:center;
  .form-item{
    display:flex;
    align-items: center;
    justify-content: center;
    .btn{
      width:100%;
    }
    .form-label{
      width:70px;
    }
  }
}

</style>
