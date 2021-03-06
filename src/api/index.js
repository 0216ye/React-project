//该文件用于发送各种请求！

//引入包装过的axios
import myAxios from './myAxios' 
//引入用于发送jsonp的库
import jsonp from 'jsonp'
import {message} from 'antd'
import {BASE_URL,CITY,WEATHER_AK} from '../config'
//发送POST的登录请求                            --将axios返回的Promise直接返回出去
export  const reqLogin = (username,password) => myAxios.post(`${BASE_URL}/login`, {username,password})  

//商品分类查询请求
export const reqCategory = () => myAxios.get(`${BASE_URL}/manage/category/list`)

//百度天气接口请求
export const reqWeather = () =>{
    return new Promise((resolve,reject) =>{
        jsonp(
            `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`,
            (error,data)=>{
                // 接口请求出错
                if (error){
                    message.error('获取天气数据时发送错误,请联系管理员!',1000)
                    //中断Promise链
                    return new Promise(()=>{})
                }else {//接口请求，正确返回数据
                    let {weather,dayPictureUrl,nightPictureUrl,temperature} = data.results[0].weather_data[0]
                    const weatherInfo = {weather,dayPictureUrl,nightPictureUrl,temperature}
                    //将获取到的数据作为Promise成功的值
                    resolve(weatherInfo)
                }
            }
        )
    })
}

//添加商品分类请求
export const reqAddCategory = (categoryName) =>  myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName:categoryName})

//修改商品分类请求
export const reqUpdateCategory = (categoryId,categoryName) =>  myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})

//获取商品分页列表请求
export const reqProductList = (pageNum,pageSize) => myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

//对商品进行上架/下架处理请求
export const reqUpdateStatus = (productId,status) =>  myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})

// 根据商品名称搜索/根据商品描述 搜索分页列表的请求
export const reqSearchProductList = (pageNum,pageSize,searchType,keyWord) => myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})
    //以下为完整写法，上面的为简写:因为searchType的值为productName/productDesc,后端接收的key也是这两个其中一个 
   /* if (searchType === 'productName'){
        console.log('发送请求')
      return  myAxios.get(`${BASE_URL}/manage/product/search`,{
            params:{ //根据select选择器选中的不同，get的参数也不一样
                pageNum,
                pageSize,
                productName:keyWord
            }
        })
    }else{
      return  myAxios.get(`${BASE_URL}/manage/product/search`,{
            params:{
                pageNum,
                pageSize,
                productDesc:keyWord
            }
        })  
    }
    */
   
// 根据商品ID获取商品请求
export const reqProductById = (productId) => myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})


// 根据图片的name删除对应的图片请求
export  const reqDeleteImg = (name) => myAxios.post(`${BASE_URL}/manage/img/delete`, {name})  

//添加商品的请求
export  const reqAddProduct = (productObj) => myAxios.post(`${BASE_URL}/manage/product/add`, {...productObj})  

//更新商品的请求
export  const reqUpdateProductList = (productObj) => myAxios.post(`${BASE_URL}/manage/product/update`, {...productObj})  

//获取角色列表请求
export const reqRoleList = () => myAxios.get(`${BASE_URL}/manage/role/list`)

//添加角色请求 -->下面的参数为解构实参的对象，获取到指定的roleName
export  const reqAddRole = ({roleName}) => myAxios.post(`${BASE_URL}/manage/role/add`, {roleName})  

//请求给角色授权
export  const reqAuthRolt = (roleObj) => myAxios.post(`${BASE_URL}/manage/role/update`, {...roleObj,auth_time:Date.now()})  

//获取所有用户列表(同时携带了角色列表回来)
export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)

//添加用户的请求
export  const reqAddUser = (userObj) => myAxios.post(`${BASE_URL}/manage/user/add`, {...userObj})  

//删除用户的请求
export  const reqDeleteUser = (userId) => myAxios.post(`${BASE_URL}/manage/user/delete`, {userId})  