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