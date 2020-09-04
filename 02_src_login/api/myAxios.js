import axios from 'axios'
//引入用于转换axios的post请求参数(默认为JSON)转为urlencoded格式
import qs from 'querystring'
//引入antd UI库
import {message} from 'antd'
//引入进度条
import NProgress from 'nprogress'
//引入进度条的样式
import 'nprogress/nprogress.css'
//创建axios的实例
const instance = axios.create({
    //配置请求超时时间
    timeout: 3000,
});

//请求拦截器
instance.interceptors.request.use(
    (config) => {
        //开始执行进度条
        NProgress.start()
        //axios的psot默认将参数对象设置为JSON格式，因为服务器没有设置接收JSON格式，所以使用qs库的方法将对象转为URLencoded个小
        let { method, data } = config
        //如果请求的方法是post
        if (method.toLowerCase() === 'post') {
            //请求的参数为对象  --> config.data输出格式是一个对象，只不过底层转为了JSON
            if(data instanceof Object){
                //！！！axios的psot默认将参数对象转为JSON格式，因为服务器没有设置接收JSON格式，所以使用qs库的方法将对象转为URLencoded个小
                config.data = qs.stringify(data)
            }
        }
        return config;
    }
);


//响应拦截器
instance.interceptors.response.use(
    //请求成功走这里
    (response) => {
        //结束进度条
        NProgress.done()

        return response.data;
    }, 
    //请求失败走这里
    (error) => {
        //结束进度条
        NProgress.done()
        message.error(error.message,1)
        //中断Promise链,使得Login.jsx中的await只接受到成功的Promise
        return new Promise(()=>{})
    }
);
export default instance