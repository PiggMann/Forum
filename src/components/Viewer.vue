<!-- 显示器组件 -->

<template>
  <div ref="viewer"></div>
</template>

<script>
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export default {
  props: ["content"],
  data() {
    return {
      viewer: null,
    };
  },
  async mounted() {
    this.viewer = new Viewer({
      el: this.$refs.viewer,
      initiaValue: this.content,
    });
  },
  watch: {
    content(newValue) {
      // 设置显示的值
      this.viewer.setMarkdown(newValue);
    },
  },
};
</script>

<style scoped></style>
