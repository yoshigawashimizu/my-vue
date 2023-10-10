import Mock from 'mockjs'
import HomeApi from './mockData/home'
import UserApi from './mockData/user'
import PermissionApi from './mockData/permission.js'
Mock.mock('/home/getData', HomeApi.getHomeData)

// 本地获取user数据

Mock.mock(/user\/getUser/, 'get', UserApi.getUserList)

Mock.mock(/user\/add/, 'post', UserApi.createUser)

Mock.mock(/user\/edit/, 'post', UserApi.updateUser)

Mock.mock(/user\/delete/, 'get', UserApi.deleteUser)

Mock.mock(/permission\/getMenu/, 'post', PermissionApi.getMenu)
