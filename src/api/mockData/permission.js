// 权限
// 模拟用户登录后端返回token
import Mock from "mockjs";


export default {
    getMenu: (config) => {
        const { username, password } = JSON.parse(config.body)

        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    // menu数据 无问题
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 'house',
                            url: 'home/Home'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'mall/Mall'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/User'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/page1',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: 'other/Page1'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: 'other/Page2'
                                },
                            ]

                        },

                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 'house',
                            url: 'home/Home'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'user/User'
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: "获取成功",
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '登录失败,用户名或密码错误'
                }
            }
        }
    }
}