<template>
  <div>
    <editor ref="editor" :options="options" :initialValue="text" />

    <v-btn @click="read">read</v-btn>
    <viewer :initialValue="text"></viewer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        language: "ko",
      },
      text: "*III*",
    };
  },
  methods: {
    read() {
      this.text = this.$refs.editor.invoke("getMarkdown");
    },
  },
};
</script>

<style></style>
