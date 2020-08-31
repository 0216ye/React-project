import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png'
import './css/login.less'


export default  class Login extends Component {
    
    //用于按钮提交
     onFinish = values => {
         console.log(values)
        console.log('Received values of form: ', values);
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
        }else if(value.length > 12) {
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
        return (
            <div>
                <header className="login-header" >
                    <img src={logo} alt="图片" />
                    <h1>商品后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h1>用户登录</h1>
                    <Form  
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish} 
                        className ="login-form"
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