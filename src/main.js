import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './api/mock.js'
import api from './api/api.js'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 图标注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
// 引入vuex
import store from './store/index.js'



const app = createApp(App)
// 图标注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$api = api
store.commit('addMenu', router)

// 如果用户输入的路由路径不对,将重定向到首页
function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    if (hasCheck) {
        return true
    } else {
        return false
    }
    // console.log('router对象是否获取到了路由', router.getRoutes())
}
router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.token
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        // 已登录的用户尝试重新进入登录界面
        next({ name: 'home' })
    } else if (!checkRouter(to.path)) {
        // 用户跳转到错误地址后强制跳转会首页
        next({ name: 'home' })
    } else {
        next()
    }
})
app.use(router).use(store)
app.mount('#app')
// app.use(ElementPlus)