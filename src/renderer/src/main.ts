import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/css/resets.css'
// Element Plus 暗黑模式样式
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
/* 注册所有图标（需要动态引入图标，目前解决方法，或者使用在线图标）
@element-plus/icons-vue 中导入所有图标并进行全局注册 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import GlobalUI from '@components/GlobalUI'
app.use(GlobalUI)
app.use(router)
app.use(pinia)

app.mount('#app')
