import axios from 'axios';

const http = axios.create({
  baseURL: 'http://117.72.157.194:10086/',
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
});

export default http;