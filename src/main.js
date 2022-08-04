import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";

import pinia from "./pinia";

// 插件
import common from "./plugins/common";
import http from "./plugins/http";
import api from "./plugins/api";

const app = createApp(App);

// 挂载router
app.use(router);

// 挂载 ElementPlus
app.use(ElementPlus);

// 挂载 pinia
app.use(pinia);

app.use(common);

app.use(http);

app.use(api);

app.mount("#app");
