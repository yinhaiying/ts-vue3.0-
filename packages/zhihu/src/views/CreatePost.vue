<template>
  <div class="create-post-page">
   <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type = "text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">文章详情</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          tag = "textarea"
          rows = "5"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang = "ts">
import { defineComponent,ref} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps,PostProps } from "../store/index";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput,{RulesProp} from "../components/ValidateInput.vue";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const contentRules: RulesProp = [
      { type: "required", message: "内容不能为空" },
    ];
    const titleVal = ref("");
    const contentVal = ref("");
    const onFormSubmit = (valid: boolean) => {
      if (valid) {
        const {columnId} = store.state.user;
        if(columnId){
          const newPost: PostProps = {
            id:Math.floor(Math.random()*1000),
            title:titleVal.value,
            content:contentVal.value,
            columnId,
            createdAt:new Date().toLocaleString()
          }
          store.commit("createPost",newPost);
          router.push({name:"column",params:{id:columnId}});
        }
      }
    };
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
