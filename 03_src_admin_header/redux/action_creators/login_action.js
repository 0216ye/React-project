import { SAVE_USER_TOEKN,DELETE_USER_TOEKN } from '../action_types'
//用于Login表单用户登录的方法
export const createSaveUserInfoAction = value => {
    //设置浏览器缓存，使得在admin页面（已经登录）刷新不会重新跳转到login页面
    let {user,token} =  value
    localStorage.setItem('user',JSON.stringify(user))//key-value都是字符串格式
    localStorage.setItem('token',token)
    return { type: SAVE_USER_TOEKN, data: value }
}
// 用于admin页面退出登录的方法
export const createDeleteUserInfoAction = () => {
    //清除浏览器缓存，跳转到login页面
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return { type: DELETE_USER_TOEKN }
}