/* 环境配置文件 */

// env:当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    // 开发环境
    development: {
        baseApi: '/api',
        mockApi: 'https://yapi.pro/mock/127934/api',

    },
    // 测试环境
    test: {
        baseApi: '',
        mockApi: '',

    },
    // 线上环境
    prod: {
        // 真实后台api
        baseApi: '',
        mockApi: '',

    },

}

export default {
    env,
    // mock的总开关
    mock: true,
    ...EnvConfig[env]
}