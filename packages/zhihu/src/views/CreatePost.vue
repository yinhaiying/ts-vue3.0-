<template>
  <div class="create-post-page">
   <h4>新建文章</h4>
   <input type="file" name = "file" @change.prevent = "handleFileChange">
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
import axios from "axios";
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
    const handleFileChange =  (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if(files){
        const uploadedFile = files[0];
        // 使用formData进行传输
        const formData = new FormData();
        formData.append(uploadedFile.name,uploadedFile);
        axios.post("http://api.vikingship.xyz/api/upload",formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }).then((res) => {
          console.log("文件上传：",res);
        })
      }
    }
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
      handleFileChange
    };
  },
});
</script>
<style lang="less" scoped>
</style>
