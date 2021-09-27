/* eslint-disable vue/no-unused-components */
<template>
  <board-index v-if="collection === 'boards' && docc === 'list'"></board-index>
  <board-content
    v-else-if="collection === 'boards' && !action"
    :docc="docc"
  ></board-content>
  <board-form
    v-else-if="collection === 'boards' && action === 'board-write'"
    :docc="docc"
    :action="action"
  ></board-form>
  <board-article-form
    v-else-if="collection === 'boards' && action === 'article-write'"
    :docc="docc"
    :action="action"
  ></board-article-form>
  <!-- <page-index v-else-if="collection === 'page' && docc === 'list'"></page-index>
  <page-content
    v-else-if="collection === 'page' && !action"
    :docc="docc"
  ></page-content>

  <page-form
    v-else-if="collection === 'page'"
    :docc="docc"
    :action="action"
  ></page-form> -->

  <h3 v-else><v-btn @click="render_" color="success">text</v-btn></h3>
</template>

<script>
import BoardIndex from "./board/index"; //board List
import BoardContent from "./board/content"; //board detail
import BoardForm from "./board/form.vue"; // board create/update
import BoardArticleForm from "./board/article/form.vue"; // board create/update

// import PageIndex from "./page/index.vue";
// import PageContent from "./page/content.vue";
// import PageForm from "./page/form.vue";

export default {
  components: {
    BoardForm,
    BoardArticleForm,
    // PageForm,
    BoardIndex,
    BoardContent,
    // PageIndex,
    // PageContent,
  },
  created() {
    console.log("renderer create start");
    console.log(this.$route.params.collection);
    console.log(this.$route.params.docc);
    console.log(this.$route.params.action);
  },
  methods: {
    render_() {
      console.log(this);
    },
  },
  computed: {
    collection() {
      return this.$route.params.collection;
    },
    docc() {
      return this.$route.params.docc;
    },
    action() {
      return this.$route.params.action;
    },
  },
};
</script>

<style></style>
