import axios from "axios";
import { useUserSotre } from "../store/user";

export default {
  install: (app) => {
    const userStore = useUserSotre();

    const http = axios.create({
      baseURL: "https://3yya.com/u/2c66e040a48df8d3/bbs/app",
    });

    // 添加请求拦截器
    http.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        // console.log(config);
        if (userStore.isLogged) {
          // 配置token
          config.headers["Authorization"] = userStore.token;
        }
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    http.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // 如果token失效 退出登录
        if (error.response.status === 400) {
          if (error.response.data.code === 1100) {
            userStore.logout();
          }
        }
        return Promise.reject(error);
      }
    );

    app.config.globalProperties.$http = http;
  },
};
