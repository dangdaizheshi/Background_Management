import axios from 'axios';

const http = axios.create({
  baseURL: 'http://117.72.157.194:10086/',
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6MSwiZXhwIjoxNzk4MTc5MzE4LCJpc3MiOiJXdWtvbmcifQ.BkywkGT8M4pJr7bcRkuNZCkgtLqHDMiH4AIXLv2Xmdw'
    config.headers['token'] = token
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
});

export default http;