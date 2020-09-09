import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import Header from './header/header.jsx'
import LeftNac from './left_nav/left_nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import AddUpdat from '../product/addUpdate/add_update'
import Detail from '../product/detaile/detail'
import './css/admin.less'
const {Footer, Sider, Content } = Layout;
class Admin  extends Component{
    
    //在render中跳转页面，一般使用Redirect进行重定向页面
    render(){
        let {isLogin} =  this.props.userInfo
    // 没有登录
     if (!isLogin){
         //打回登录页面
        return <Redirect to = '/login' />
     }else {
        //登录状态
        return (
            <Layout className = 'admin'>
                <Sider className = 'sider'>
                    <LeftNac/>
                </Sider>
                <Layout>
                <Header/>
                <Content className = 'context'>
                    <Switch>
                        <Route path = '/admin/home' component = {Home} />
                        <Route path = '/admin/prod-about/category' component = {Category} />
                        <Route path = '/admin/prod-about/product' component = {Product} exact /> {/**精准匹配 */}
                        <Route path = '/admin/prod-about/product/detail/:id' component = {Detail} /> {/**\/:id -->为参数路由 */}
                        <Route path = '/admin/prod-about/product/add_update' component = {AddUpdat} exact/>
                        <Route path = '/admin/prod-about/product/add_update/:id' component = {AddUpdat} />
                        <Route path = '/admin/user' component = {User}/>
                        <Route path = '/admin/role' component = {Role}/>
                        <Route path = '/admin/chart/bar' component = {Bar}/>
                        <Route path = '/admin/chart/line' component = {Line}/>
                        <Route path = '/admin/chart/pie' component = {Pie}/>
                        <Redirect to = '/admin/home' />
                    </Switch>
                </Content>
                <Footer className = 'footer'>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )         
     }
   }
}
/*
以下代码中的所有的key是控制容器组件传递给UI组件的key
以下代码中的所有的value是控制容器组件传递给UI组件的value
*/
export default connect(
    state => ({userInfo:state.userInfo}),
    //用于删除用户信息，返回登录页面的方法
    // {deleteUserInfo:createDeleteUserInfoAction}
)(Admin)