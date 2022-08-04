<template>
  <div class="container">
    <div class="detail">
      <h2 class="title">{{ title }}</h2>
      <div class="info">
        <span>{{ authorName }}</span>
        <span class="time">{{ $common.beautifulTime(publishTime) }}</span>
      </div>
      <Viewer :content="content" />
      <div class="operations">
        <div class="item">
          <span>阅读数：{{ visitAmount }}</span>
        </div>
        <div>
          <el-button v-if="isThumb" type="primary" @click="cancelThumbUp"
            ><el-icon class="right10"><Pointer /></el-icon>已赞同
            {{ thumbAmount }}
          </el-button>
          <el-button v-else type="primary" @click="thumbUp" plain
            ><el-icon class="right10"><Pointer /></el-icon>赞同
            {{ thumbAmount }}
          </el-button>
          <el-button type="primary" @click="showEditor" plain
            ><el-icon class="right10"><ChatRound /></el-icon>评论</el-button
          >
        </div>
      </div>
    </div>
    <div v-if="editorVisible">
      <Editor v-model="discussion" />
      <div class="buttons">
        <el-button @click="editorVisible = false">取消</el-button>
        <el-button type="primary" @click="publishDiscussion">发布</el-button>
      </div>
    </div>
    <div v-for="discussion in discussions" class="discussion">
      <div class="info">
        <span class="author-name">{{ discussion.author_name }}</span>
        <span class="time">
          {{ $common.beautifulTime(discussion.publish_time) }}
        </span>
      </div>
      <Viewer :content="discussion.content">{{ discussion.content }}</Viewer>
    </div>
    <el-empty v-if="disscussionAmount == 0" description="暂无评论哦~" />
    <p v-else-if="isNomore" class="nomore">没有更多了</p>
    <el-backtop :right="40" :bottom="40" />
  </div>
</template>

<script>
import { useUserSotre } from "../store/user";
import Viewer from "../components/Viewer.vue";
import Editor from "../components/Editor.vue";
import { ElMessage } from "element-plus";
import { ChatRound, Pointer } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export default {
  components: {
    Viewer,
    Editor,
    ChatRound,
    Pointer,
  },
  data() {
    const userStore = useUserSotre();
    return {
      userStore,
      page: 1,
      limit: 10,
      title: "",
      content: "",
      authorName: "",
      publishTime: null, // 发布时间
      isThumb: false, // 是否点赞
      thumbAmount: null, // 点赞
      visitAmount: null, // 阅读
      editorVisible: false, // 发布框展示
      discussion: "", // 发布评论内容
      discussions: [], // 评论列表
      disscussionAmount: null, // 评论数量
    };
  },
  mounted() {
    this.getDetail();
    this.getDisscussions();
  },
  methods: {
    async getDetail() {
      const response = await this.$api.getPostDetail(this.$route.params.postId);

      this.title = response.data.title;
      this.content = response.data.content;
      this.authorName = response.data.author_name;
      this.publishTime = response.data.publish_time;
      this.isThumb = response.data.is_thumb;
      this.thumbAmount = response.data.thumb_amount;
      this.visitAmount = response.data.visit_amount;
    },
    showEditor() {
      if (!this.userStore.isLogged) {
        // 如果未登录 提示
        ElMessage.info("请先登录");
        return;
      }
      this.editorVisible = !this.editorVisible;
    },
    async thumbUp() {
      if (!this.userStore.isLogged) {
        ElMessage.info("请先登录。");
        return;
      }
      // 点赞
      const response = await this.$api.thumbUp(this.$route.params.postId);
      console.log(response.data);
      this.thumbAmount = response.data.thumb_amount;
      this.isThumb = true;
    },
    async cancelThumbUp() {
      if (!this.userStore.isLogged) {
        ElMessage.info("请先登录。");
        return;
      }
      // 取消点赞
      const response = await this.$api.cancelThumbUp(this.$route.params.postId);
      this.thumbAmount = response.data.thumb_amount;
      this.isThumb = false;
    },
    async publishDiscussion() {
      // 发布评论
      const response = await this.$api.createDisscussions(
        this.$route.params.postId,
        this.discussion
      );
      // 清空评论, 隐藏发布框
      this.discussion = "";
      this.editorVisible = false;
      ElNotification({
        message: "评论发布成功！",
        type: "success",
      });

      // 刷新评论区
      this.discussions = [];
      this.page = 1;
      this.getDisscussions();
    },
    async getDisscussions() {
      // 获取评论列表
      const response = await this.$api.getDisscussions(
        this.$route.params.postId,
        {
          page: this.page,
          limit: this.limit,
        }
      );
      this.disscussionAmount = response.data.amount;
      this.discussions = response.data.results;
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
.detail {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px 0;
}
.info {
  display: flex;
  justify-content: space-between;
}
.time {
  color: #aaa;
  font-size: 14px;
}
.title {
  margin: 0;
  margin-bottom: 20px;
}
.operations {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operations .item {
  font-size: 14px;
  color: #999;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}
.discussion {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px 0;
}
.nomore {
  text-align: center;
  font-size: 14px;
}
</style>
