<template>
  <div class="page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">邮箱地址</label>
        <validate-input
          ref="inputRef"
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱"
          type="password"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
export default defineComponent({
  name: "Login",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱地址不能为空" },
      { type: "email", message: "请输入正确的邮箱地址" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码长度不能为空" },
      { type: "length", message: "密码长度不能超过6位", length: 6 },
    ];
    const emailVal = ref("");
    const passwordVal = ref("");
    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push({ name: "home" });
        store.commit("login");
      }
    };
    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
