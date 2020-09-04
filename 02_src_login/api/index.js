//该文件用于发送各种请求！

//引入包装过的axios
import myAxios from './myAxios' 
import {BASE_URL} from '../config'
//发送POST的登录请求                            --将axios返回的Promise直接返回出去
export  const reqLogin = (username,password) => myAxios.post(`${BASE_URL}/login`, {username,password})  