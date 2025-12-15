import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon/index.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn,
})
app.component('SvgIcon', SvgIcon) // 全局组件注册
const pinia = createPinia()
app.use(pinia)

import globalComponent from './components/index'
app.use(globalComponent)
app.mount('#app')