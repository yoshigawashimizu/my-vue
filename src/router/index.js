/** 
 * 路由的配置文件
 * */

// vue3 新引入方式 
// 只导入两个方法
// createRouter:创建路由
// createWebHashHistory:使用路由的方式--使用哈希的模式
import { createRouter, createWebHashHistory } from "vue-router"
import Login from "../views/Login.vue"

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/Main.vue'),
        redirect: '/home',
        /* children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/User.vue')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../views/other/Page1.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../views/other/Page2.vue')
            },

        ] */
        children: []


    },
    {
        // 登录界面
        path: '/login', name: 'login', component: Login
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router