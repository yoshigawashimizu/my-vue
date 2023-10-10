import { createStore } from 'vuex'
import Cookie from 'js-cookie'

export default createStore({
    state: {
        isCollapse: false,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menu: [],
        token: '',
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            // 判断
            if (val.home == 'home') {
                state.currentMenu == null
            } else {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        closeTab(state, val) {
            let res = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(res, 1)
        },
        setMenu(state, val) {
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            if (!localStorage.getItem('menu')) {
                // 如果localStorage里没有menu数据
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu

            const menuArray = []

            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        item.component = () => import(url)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item => {
                router.addRoute('main', item)
            })

        },
        cleanMenu(state) {
            // 清空menu数组
            state.menu = []
            localStorage.removeItem('menu')
        },
        setToken(state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        },
        clearToken(state) {
            // 清除cookie中的token
            state.token = ''
            Cookie.remove('token')
        },

    },


})