import {SAVE_USER_TOEKN,DELETE_USER_TOEKN} from '../action_types'
//获取浏览器缓存下来的信息，可以用来判断是否已经登录
let user = JSON.parse(localStorage.getItem('user')) //将字符串转为对象
let token = localStorage.getItem('token')

//初始化redux状态的值
let initStore = {
    user: user || {},//保存用户信息
    token: token || '',//用于验证
    isLogin: user && token ? true : false //判断是否在登录页面
}
export default  function test(preStore = initStore,action){
    let {type,data} = action 
    //data:{user:{_id: "5f506a9d9bdc8b3a58732185", username: "admin", create_time: 1599105693838, role: {…}}, token:'xxxx'}
    let newStore
    switch (type) {
        case SAVE_USER_TOEKN:
            //将获取到的旧的状态加工成新的状态并返回
            newStore  = {user:data.user,token:data.token,isLogin:true}
            return newStore
        case DELETE_USER_TOEKN:
            //将获取到的旧的状态加工成新的状态并返回
            newStore  = {user:{},token:"",isLogin:false}
            return newStore
        default:
            return preStore
    }
}
