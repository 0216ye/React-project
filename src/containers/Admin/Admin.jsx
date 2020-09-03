import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
class Admin  extends Component{
    componentDidMount(){
        console.log(this.props)
    }
    outLogin = () => {
    //调用清除用户登录信息的方法
        this.props.deleteUserInfo()
    }
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
            <div>    
                你好，我的名字是{this.props.userInfo.user.username}
                <button onClick = {this.outLogin}>点击退出登录</button>
            </div>
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
    {deleteUserInfo:createDeleteUserInfoAction}
)(Admin)