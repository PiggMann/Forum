<template>
  <!-- 导航栏 -->
  <Navigator />

  <router-view></router-view>
</template>
<script>
import { useUserSotre } from "./store/user";

import Navigator from "./components/Navigator.vue";

export default {
  components: {
    Navigator,
  },
  data() {
    const userSotre = useUserSotre();
    return {
      userSotre,
    };
  },
  async mounted() {
    if (this.userSotre.isLogged) {
      // 用户信息
      const response = await this.$api.getSelfInfo();

      this.userSotre.setUserInfo({
        userId: response.data.user_id,
        username: response.data.username,
      });
    }
  },
};
</script>
<style>
html {
  background-color: #f6f6f6;
}
body {
  margin: 0;
}
:root {
  box-sizing: border-box; /* 设置根元素的 box-sizing: border-box */
}
*,
*:before,
*:after {
  box-sizing: inherit; /* box-sizing 继承自父元素 */
}
.bottom20 {
  margin-bottom: 20px;
}
.right10 {
  right: 10px;
}
</style>
