/* 二次封装axios */
import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '网络请求异常,请稍后重试......'

// 创建一个axios实例对象
const service = axios.create({
    baseURL: config.baseApi
})

// 请求前
service.interceptors.request.use((req) => {
    // 自定义header
    // jwt-token认证时
    return req
})


// 响应后
service.interceptors.response.use((res) => {
    console.log('获取响应数据res',res);
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    } else {
        // 例如:网络请求错误
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 核心函数
function request(options) {
    options.method = options.method || 'get'
    // 大小写
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    // 对mock的处理
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    // 对线上环境做处理
    if (config.env == 'prod') {
        // 如果是线上环境prod,就不用mock的api
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request