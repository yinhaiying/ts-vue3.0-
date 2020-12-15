<template>
  <div class="page">
    <Uploader 
      action = "http://api.vikingship.xyz/api/upload" 
      :beforeUpload = "beforeUpload" @file-uploaded = "onFileUploaded">
      <h2>点击上传</h2>
      <template v-slot:loading>
          <h3>loading............</h3>
      </template>
      <template v-slot:uploaded = "slotProps">
          <img :src="slotProps.uploadedData.data.url" alt="" width = "100px">
          <h3>上传成功了</h3>
      </template>
      </Uploader>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang = "ts">
import { defineComponent, computed,onMounted } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import Uploader from "../components/Uploader.vue";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
    Uploader
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);
    const beforeUpload = (file: File) => {
      // const isJPG = file.type === "image/jpeg";
      // if(!isJPG){
      //   alert("不是jpg图片");
      //   return false;
      // }
      return true;
    }
    const onFileUploaded = () => {
      alert("上传成功");
    }
    onMounted(() => {
      // store.dispatch("fetchColumns");
    })
    return {
      list: list,
      beforeUpload:beforeUpload,
      onFileUploaded
    };
  },
});
</script>
<style lang="less" scoped>
</style>
