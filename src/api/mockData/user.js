// 用户数据
import mockjs from "mockjs";

// get请求从config.url获取参数,post从config.body中获取参数
function param20bj(url) {

    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'

    )



}

let List = []
const count = 200
// 用for循环创建了200条数据
for (let i = 0; i < count; i++) {
    List.push(
        mockjs.mock({
            id: mockjs.Random.guid(),
            name: mockjs.Random.cname(),
            addr: mockjs.mock('@county(true)'),
            'age|18-60': 1,
            birth: mockjs.Random.date(),
            sex: mockjs.Random.integer(0, 1)
        })
    )
}

export default {
    /** 
    * 获取列表
    * 要带参数 name,page,limit; name可以不填,page,limit有默认值 
    * @param name, page , limit
    * @return {{code: number, count: number,data: *[]}}
    */
    getUserList: (config) => {
        // 获取 当前页码page 和条数limit 
        console.log('getUserList 的形参数据', config)
        const { name, page = 1, limit = 20 } = param20bj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)

        const mockList = List.filter((user) => {
            if (name && user.name.indexOf(name) === -1 &&
                user.addr.indexOf(name) === -1) return false
            return true
        })

        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit *
            (page - 1))

        return {
            code: 200,
            data: {
                count: mockList.length,
                list: pageList
            }
        }
    },

    /**
     * 新增用户
     * @param name, addr, age, birth,sex
     * @return {{code: number,data:{message:string}}}
     * 
     */
    createUser: (config) => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: mockjs.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex,
        })

        return {
            code: 200,
            data: {
                message: '添加成功'
            }
        }
    },

    /**
     * 删除用户
     * @param id 被删除的用户的id
     * @return {*} 返回值未知
     */
    deleteUser: (config) => {
        // 通过id作为标识
        const { id } = JSON.parse(config.body)

        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter((u) => { return u.id !== id })
            return {
                code: 200,
                message: '删除成功'
            }
        }
    },
    /**
     * 修改用户
     * @param id, name, addr, age, birth, sex
     * @return {{code:number,data:{message:string}}}
     */
    updateUser: config => {
        const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some((u) => {
            if (u.id === id) {
                u.name = name
                u.addr = addr
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 200,
            data: {
                message: '编辑成功'
            }
        }
    }
}
