import requset from '../utils/requset'

export const loginApi = (username: string, password: string) => {
  return requset({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}