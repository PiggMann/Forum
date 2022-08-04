<template>
  <div class="login">
    <h1>登录页面</h1>
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
    <el-button class="btn" size="large" type="primary" @click="login" round
      >登录</el-button
    >
  </div>
</template>
<script>
import { useUserSotre } from "../store/user";
import { ElMessage } from "element-plus";

export default {
  data() {
    const userStore = useUserSotre();
    return {
      userStore,
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$api.login(this.username, this.password);

        this.userStore.setToken(response.data.token);

        // 跳转到首页
        this.$router.push({
          name: "home",
        });
      } catch (error) {
        if (error.response.status == 400) {
          // console.log(error);
          if (error.response.data.code == 2000) {
            ElMessage.error("用户名或密码错误哦！");
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
