import requset from '../utils/requset'

export const loginApi = (username: string, password: string) => {
  return requset({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}