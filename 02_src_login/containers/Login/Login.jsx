import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd';
//引入connect连接容器组件和UI组件
import {connect} from 'react-redux'
//引入用于重定向网页的组件
import {Redirect} from 'react-router-dom'
//引入用于发送各种请求的API
import {reqLogin} from '../../api'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png'
import './css/login.less'

class Login extends Component {



    //用于表单按钮提交
     onFinish = async (values) => {
        //values:{username: "admin", password: "admin"}
        let {username,password} = values
        /*reqLogin(username,password)
           .then((result) =>{
                console.log(result)
            })
          .catch((reason) =>{
            console.log(reason)
          })
        */
        
        //拦截器处理失败的状态，所以这里只会返回成功的Promise，可以省去try-catch
        let result = await reqLogin(username,password)
        let {msg,status,data} = result
        //状态为0 即成功，状态为1，即为失败
        if (status === 0){
            //1 将后台返回的数据保存到redux中 -->通过容器组件传递过来的saveUserInfo方法，将获取到的数据传过去
            this.props.saveUserInfo(data)
            //2跳转到admin页面-->利用浏览器历史记录的history的replace方法，将路径修改为指定路径，并且replace不能回退
            this.props.history.replace('/admin')
            console.log(data)
          
        }else {
            //参数二为：秒数
            //提示输入用户名或者密码错误
            message.warning(msg,1)
         
        }
      };
    

    //自定义校验密码的方法
    pwValidator =(rule,value)=>{
        if (!value){
            //   1). 必须输入
            return Promise.reject('密码必须输入')
        }else if (value.length < 4){
            // 2). 必须大于等于4位
            console.log('12')
            return Promise.reject('密码必须大于等于4位')
        }else if(value.length >222) {
            console.log('12')
            // 3). 必须小于等于12位  
            return Promise.reject('密码必须小于等于12位')
        }else if (!(/^\w+$/).test(value)){
            // 4). 必须是英文、数字或下划线组成
            return Promise.reject('密码必须是英文、数字或下划线组成')
        }else{
            return Promise.resolve()
        }
    }
    render() {
        //获取Props参数中的isLogin
        let {isLogin} =  this.props 
        //已经为登录状态，不能退回Login页面
        if (isLogin){
            //重定向页面，指向admin页面
            return <Redirect to = '/admin' />
        }else {
            //非登录状态
            return (
                <div>
                    <header className="login-header" >
                        <img src={logo} alt="图片" />
                        <h1>商品后台管理系统</h1>
                    </header>
                    <section className="login-content">
                        <h1>用户登录</h1>
                        <Form  
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish} 
                        >
                            <Form.Item 
                                name="username"
                                /*
                                用户名/密码的的合法性要求
                                1). 必须输入
                                2). 必须大于等于4位
                                3). 必须小于等于12位  
                                4). 必须是英文、数字或下划线组成
                                声明式校验用户名
                                 */
                                rules={[
                                    {required: true,message: '用户名不能为空'},
                                    {max:12,message:'用户名必须小于等于12位'},
                                    {min:4,message:'用户名必须大于等于4位'},
                                    {pattern:/^\w+$/,message:'用户名必须是英文、数字或下划线组成'},
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                            
                                name="password"
                                /*自定义校验密码*/
                                rules={[
                                    {validator: this.pwValidator},//校验器(validator)
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                 </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            )
        }
       
    }
}   

//Login即做容器组件又做UI组件
export default connect(
    //因为Login作为UI组件时，不需要使用state状态的值，所以这里不需要将state传递为Props参数
    state => ({isLogin:state.userInfo.isLogin}),
    {
        //保存获取到数据的方法
        saveUserInfo:createSaveUserInfoAction
    }
)(Login)