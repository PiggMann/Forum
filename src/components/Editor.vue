<!-- 编辑器组件 -->

<template>
  <div ref="editor"></div>
</template>

<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style

export default {
  props: ["modelValue"],
  step() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      el: this.$refs.editor,
      height: "350px",
      initialEditType: "wysiwyg",
      previewStyle: "tab",
      initialValue: this.modelValue,
      events: {
        change: () => {
          this.$emit("update:modelValue", this.editor.getMarkdown());
        },
      },
    });
  },
  watch: {
    modelValue(value) {
      // 设置编辑器的值
      this.editor.setMarkdown(value);
      console.log(this.editor.setMarkdown(value));
    },
  },
};
</script>

<style lang="scss" scoped></style>
