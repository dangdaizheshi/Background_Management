import axios from 'axios';
import tokenUtils from '../utils/tokenUtil'
import notificationUtils from '../utils/notificationUtils'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const token = tokenUtils.getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    return response.data.data;
  }, function (error) {
    // ElNotification({
    //   title: 'Error',
    //   message: error.response.data.msg,
    //   type: 'error',
    //   duration: 3000
    // })
    notificationUtils.toast('error', error.response.data.msg)
    return Promise.reject(error);
});

  export default request;