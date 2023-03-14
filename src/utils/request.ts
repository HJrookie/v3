import axios, {AxiosInstance} from "axios";
import { ElMessage } from "element-plus";
// import store from "@/store";
import { getToken } from "@/utils/auth";
// import { tansParams, blobValidate } from "@/utils/ruoyi";
// import { saveAs } from "file-saver";

let downloadLoadingInstance;
// 是否显示重新登录
let isReloginShow;

// @ts-ignore
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service: AxiosInstance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const noToken = (config.headers || {})?.noToken;
    // 是否需要防止数据重复提交
    if (noToken) {
    } else {
      if (getToken()) {
      }
      let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJ0bmVyIiwiYXVkIjoibGVub3ZvZWR1IiwibmJmIjoxNjc4NzgwODE4LCJpc3MiOiJsZW5vdm9lZHUiLCJleHAiOjE2NzkzODU2MTgsImlhdCI6MTY3ODc4MDgxOCwiZW1haWwiOiIxMDQzMDQ0NDM2QHFxLmNvbSJ9.K7R4AgqSX6pStpqNwRsUwAhc0lwkUvKbAUqBxW_i2gw`;
      // (config?.headers ?? {})["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
      (config?.headers ?? {})["token"] = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 二进制数据则直接返回
    if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
      return res.data;
    }

    // 代表成功
    if (res.data.status === 0 || res.data.status === 200) {
      return res.data;
    } else if (res.data.status === 501 || res.data.status === 500) {
      ElMessage({
        message: res.data.message,
        type: "error",
      });
      return Promise.reject(new Error(res?.data?.message ?? ""));
    } else if (res.data.status === 401) {
      // if (!isReloginShow) {
      //   isReloginShow = true;
      //   MessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
      //     confirmButtonText: "重新登录",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   })
      //     .then(() => {
      //       isReloginShow = false;
      //       store.dispatch("LogOut").then(() => {
      //         // 如果是登录页面不需要重新加载
      //         // if (window.location.hash.indexOf("#/login") != 0) {
      //         location.href = "/login";
      //         // }
      //       });
      //     })
      //     .catch(() => {
      //       isReloginShow = false;
      //     });
      // }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else {
      return res?.data;
    }
  },
  (error) => {
    ElMessage({
      message: error?.message ?? "",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

const downloadService = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000, // request timeout
});

// 下载时自定义文件名, sj 单位管理 (参赛单位 和 区局) 要自定义下载的文件的名称(参赛单位汇总表 ...)  用户管理那边也是  todo 注释需要移除
export const downloadFile = (config: any, customFileName: any) => {
  return downloadService(config).then((ress) => {
    window.l("ress", ress);
    const fileName = customFileName || decodeURI((ress.headers["content-disposition"] || "").split("filename=")[1].trim().replace('"', "").replace('"', ""));
    const a = document.createElement("a");
    const blob = new Blob([ress.data], { type: "application/octet-stream" });
    const objectUrl = URL.createObjectURL(blob);
    a.setAttribute("href", objectUrl);
    a.setAttribute("download", fileName);
    a.click();
  });
};

export default service;
