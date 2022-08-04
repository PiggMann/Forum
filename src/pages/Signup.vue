<template>
  <div class="login">
    <h1>注册页面</h1>
    <el-input v-model="username" size="large" placeholder="请输入用户名">
      <template #prepend>
        <label>用户名</label>
      </template>
    </el-input>
    <el-input
      v-model="password"
      size="large"
      show-password
      placeholder="请输入密码"
    >
      <template #prepend>
        <label>密码</label>
      </template>
    </el-input>
    <el-input
      v-model="passwordAgain"
      size="large"
      show-password
      placeholder="请重复输入密码"
    >
      <template #prepend>
        <label>重复密码</label>
      </template>
    </el-input>
    <el-button class="btn" size="large" type="primary" @click="signup" round
      >注册</el-button
    >
  </div>
</template>
<script>
import { useUserSotre } from "../store/user";

import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    const userStore = useUserSotre();
    return {
      userStore,
      username: "",
      password: "",
      passwordAgain: "",
    };
  },
  methods: {
    async signup() {
      if (this.username.length < 6 || this.username.length > 12) {
        ElMessage.error("用户名必须为 6 至 12 位");
        return;
      }
      if (this.password.length < 6 || this.password.length > 12) {
        ElMessage.error("密码必须为 6 至 12 位");
        return;
      }
      if (this.password !== this.passwordAgain) {
        ElMessage.error("重复密码不相同！");
        return;
      }
      try {
        const response = await axios.post(
          "https://3yya.com/u/2c66e040a48df8d3/bbs/app/users",
          {
            username: this.username,
            password: this.password,
          }
        );
        this.userStore.setToken(response.data.token);
        // 跳转到首页
        this.$router.push({
          name: "home",
        });
      } catch (error) {
        if (error.response.status == 400) {
          console.log(error);
          if (error.response.data.code == 2001) {
            ElMessage.error("抱歉，用户名已存在！");
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.login {
  width: 360px;
  padding: 20px;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.login h1 {
  margin: 0;
}
label {
  width: 50px;
  text-align: center;
}
.btn {
  width: 100%;
}
</style>
