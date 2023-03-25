import axios from "axios";

// 创建axios请求实例
// const instance = axios.create({ baseURL: "http://njunlp.club:1024/api" });
const instance = axios.create({ baseURL: "/api" });
// axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//Access-Control-Allow-Origin 指向前端 ip:port
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.VUE_APP_Access_Control_Allow_Origin;


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
