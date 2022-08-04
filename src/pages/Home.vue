<template>
  <div class="container">
    <router-link
      :to="{ name: 'postDetail', params: { postId: post.post_id } }"
      class="post"
      v-for="post in posts"
    >
      <h4 class="title">{{ post.title }}</h4>
      <div class="info">
        <span>{{ post.author_name }}</span>
        <span class="time">
          {{ $common.beautifulTime(post.publish_time) }}
        </span>
      </div>
      <p class="excerpt">{{ post.excerpt }}...</p>
      <div class="bottom">
        <div class="item" title="浏览数">
          <el-icon>
            <View />
          </el-icon>
          <span>{{ post.visit_amount }}</span>
        </div>
        <div class="item" title="点赞数">
          <el-icon>
            <Pointer />
          </el-icon>
          <span>{{ post.thumb_amount }}</span>
        </div>
        <div class="item" title="评论数">
          <el-icon>
            <ChatRound />
          </el-icon>
          <span>{{ post.discussion_amount }}</span>
        </div>
      </div>
    </router-link>
    <el-pagination
      class="pagination"
      v-model="page"
      background
      layout="prev, pager, next"
      :total="amount"
      :page-size="limit"
      :current-page="page"
      @current-change="pageChange"
    />
  </div>
  <div class="publish-btn" @click="showDialog">发布</div>
  <el-dialog
    v-model="dialogVisible"
    title="发布框"
    width="600px"
    :before-close="handleClose"
  >
    <el-input
      v-model="title"
      size="large"
      class="bottom20"
      placeholder="请输入标题~"
    ></el-input>
    <Editor v-model="content"></Editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="publish">发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ElMessage, ElNotification } from "element-plus";
import Editor from "../components/Editor.vue";
import { ChatRound, Pointer, View } from "@element-plus/icons-vue";
import { useUserSotre } from "../store/user";

export default {
  components: {
    Editor,
    ChatRound,
    Pointer,
    View,
  },
  data() {
    const userStore = useUserSotre();
    return {
      userStore,
      dialogVisible: false,
      page: 1, // 页码
      limit: 5, // 每页的数据
      posts: [],
      title: "",
      content: "",
      amount: null,
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      const response = await this.$api.getPosts({
        page: this.page,
        limt: this.limit,
      });

      this.posts = response.data.results;
      this.amount = response.data.amount;
    },
    pageChange(page) {
      this.page = page;
      this.refresh();
    },
    showDialog() {
      if (!this.userStore.isLogged) {
        // 如果未登录 提示
        ElMessage.info("请先登录");
        return;
      }
      this.dialogVisible = !this.dialogVisible;
    },
    async publish() {
      console.log(this.content);
      const response = await this.$api.creatPost(this.title, this.content);
      console.log(response);
      ElNotification({
        message: "帖子发布成功！",
        type: "success",
      });
      // 发布框
      this.title = "";
      this.content = "";

      this.dialogVisible = false;

      this.refresh();
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 50px;
}
.post {
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  margin: 20px 0;
  display: block;
  color: inherit;
  text-decoration: none;
}
.title {
  margin: 0;
  margin-bottom: 10px;
}
.info {
  display: flex;
  justify-content: space-between;
}
.time {
  color: #aaa;
  font-size: 14px;
}
.excerpt {
  flex: 1;
  /* 允许换行 */
  overflow-wrap: anywhere;
  /* 最多显示 2 行  超出显示省略号 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pagination {
  width: max-content;
  margin: 0 auto;
}
.publish-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  right: 30px;
  bottom: 30px;
  position: fixed;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  background-color: teal;
  cursor: pointer;
}
.bottom {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  color: #999;
  font-size: 14px;
}
.bottom .item {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
