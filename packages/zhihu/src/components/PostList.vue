<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}/`">{{
            post.title
          }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img
              :src="post.image"
              :alt="post.title"
              style="width: 190px"
              class="rounded-lg"
            />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted text-wrapper" v-html = "post.content">
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,PropType } from "vue";
import marked from "marked";
import { PostProps } from "../store";
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup(props) {
    const posts = computed(() => {
      props.list.forEach((post) => {
        post.content = marked(post.content);
      })
      return props.list;
    });
    return {
      posts,
    };
  },
});
</script>

<style  lang = "less" scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
.text-wrapper{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

</style>
