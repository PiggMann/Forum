<template>
  <header class="navigator">
    <div class="box">
      <router-link class="brand" :to="{ name: 'home' }">
        猪猪侠的吹牛社区
      </router-link>
      <div>
        <el-dropdown v-if="userStore.isLogged">
          <label>
            {{ userStore.username }}
          </label>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userStore.logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <template v-else>
          <el-button text>
            <router-link :to="{ name: 'login' }"> 登录 </router-link>
          </el-button>
          <el-button text>
            <router-link :to="{ name: 'signup' }"> 注册 </router-link>
          </el-button>
        </template>
      </div>
    </div>
  </header>
</template>
<script>
import { useUserSotre } from "../store/user";

export default {
  data() {
    const userStore = useUserSotre();
    return {
      userStore,
    };
  },
};
</script>
<style>
.navigator {
  background-color: #fff;
  margin-bottom: 40px;
}
.box {
  height: 60px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  color: #333;
  text-decoration: none;
}
.brand {
  font-size: 20px;
  font-weight: bold;
}
</style>
