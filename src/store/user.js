import { defineStore } from "pinia";

export const useUserSotre = defineStore("user", {
  state() {
    return {
      userId: null, // 用户ID
      username: "",
      token: null, // 身份信息
    };
  },
  getters: {
    isLogged() {
      return this.token != null; // 判断登陆状态
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserInfo({ userId = null, username = "" } = {}) {
      // 设置用户信息
      this.userId = userId;
      this.username = username;
    },
    logout() {
      // 退出登录
      this.token = null;
    },
  },
  persist: true, // 开启持久化
});
