import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon/index.vue'
import router from './router'
import { createPinia } from 'pinia'
//import './permission'
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})
app.component('SvgIcon', SvgIcon) // 全局组件注册

import globalComponent from './components/index'
app.use(globalComponent)
app.mount('#app')