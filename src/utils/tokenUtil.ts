// 操作 token 的工具类，用于将token存入cookie中，从cookie中获取token，并删除token

import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()

const tokenUtils = {
    setToken(token: string) {
        cookies.set('token', token)
    },
    getToken() {
        return cookies.get('token')
    },
    removeToken() {
        cookies.remove('token')
    }
}

export default tokenUtils