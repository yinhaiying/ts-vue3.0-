<template>
  <div class="row">
    <div v-for="item in columnList" :key="item.id" class="col-4 mb-3">
      <div class="card shadow-sm h-100" style="width: 18rem">
        <div class="card-body text-center">
          <img :src="item.avatar" class="rounded-circle border border-light w-25 my-3" :alt="item.title"/>
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">
            {{ item.description }}
          </p>
          <router-link :to="{ name: 'column', params: { id: item.columnId } }" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "ColumnLit",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((item) => {
        if (!item.avatar) {
          item.avatar = "https://ftp.bmp.ovh/imgs/2020/12/5df5dc0ea4a2fd7f.jpg";
        }
        return item;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

