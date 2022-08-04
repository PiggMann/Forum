// 页面所有接口

import axios from "axios";

export default {
  install: (app) => {
    const http = app.config.globalProperties.$http;

    // 获取帖子列表
    function getPosts({ page = 1, limit = 5 } = {}) {
      return http.get("https://3yya.com/u/2c66e040a48df8d3/bbs/app/posts", {
        params: {
          page,
          limit,
        },
      });
    }
    // 登录
    function login(username, password) {
      return http.post("/tokens", {
        username,
        password,
      });
    }
    function getSelfInfo() {
      // 获取用户信息
      return http.get("/self/user");
    }

    function creatPost(title, content) {
      // 发布帖子
      return http.post("/posts", {
        title,
        content,
      });
    }

    function getPostDetail(postId) {
      // 获取帖子详情
      return http.get(`/posts/${postId}`);
    }

    function createDisscussions(postId, content) {
      // 发布评论
      return http.post(`/posts/${postId}/discussions`, {
        content,
      });
    }

    function getDisscussions(postId, { page = 1, limit = 10 } = {}) {
      // 获取帖子的评论
      return http.get(`/posts/${postId}/discussions`, {
        params: {
          page,
          limit,
        },
      });
    }

    function thumbUp(postId) {
      // 点赞
      return http.post(`/posts/${postId}/thumb`);
    }

    function cancelThumbUp(postId) {
      // 取消点赞
      return http.delete(`/posts/${postId}/thumb`);
    }

    app.config.globalProperties.$api = {
      login,
      getSelfInfo,
      getPosts,
      creatPost,
      getPostDetail,
      createDisscussions,
      getDisscussions,
      thumbUp,
      cancelThumbUp,
    };
  },
};
