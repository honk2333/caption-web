import axios from "axios";

// 创建axios请求实例
const instance = axios.create({ baseURL: "http://njunlp.club:1024/api" });


// 响应拦截器
instance.interceptors.response.use(
  response => {
    const { status, data } = response;
    if (status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(response.data);
  },
  error => Promise.reject(error)
);

export default instance;
