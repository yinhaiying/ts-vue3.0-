<template>
  <div class="page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">用户名</label>
        <validate-input
          :rules="usernameRules"
          v-model="formData.username"
          placeholder="请输入邮箱"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="formData.password"
          type="password"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">重复密码</label>
        <validate-input
          :rules="rePasswordRules"
          v-model="formData.rePassword"
          type="password"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary">注册</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang = "ts">
import { defineComponent, ref,reactive } from "vue";
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
    const formData = reactive({
        username:"",
        password:"",
        rePassword:""
    })
    const usernameRules: RulesProp = [
      { type: "required", message: "用户名不能为空" },
    ]

    const passwordRules: RulesProp = [
      { type: "required", message: "密码长度不能为空" },
      { type: "length", message: "密码长度不能超过6位", length: 6 },
    ];
    const rePasswordRules: RulesProp = [
      { type: "required", message: "重复密码不能为空" },
      { type: "custom", 
        message:"两次密码不一致",
        validator:() =>{
          return formData.password === formData.rePassword;
        }
      },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const params = {
          username:formData.username,
          password:formData.password
        }
        store.dispatch('register', params).then((res) => {
          console.log("res:",res)
          if(res.code === 200){
            createMessage("注册成功","success");
            setTimeout(() => {
              router.push("/login");
            },2000)
          }
        }).catch((e) => {
          console.log(e);
        })
      }
    };
    return {
      formData,
      passwordRules,
      rePasswordRules,
      usernameRules,
      onFormSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
