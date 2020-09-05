import React, { Component } from 'react'
import { connect } from 'react-redux'
//引入用于提示确认关闭的提示框
import { Modal, Button } from 'antd';
//引入用于解析时间戳格式
import dayjs from 'dayjs'
//引入 WithRouter :可以让非路由组件，可以使用路由组件特有的API
import {withRouter} from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createDeleteUserInfoAction } from '../../../redux/action_creators/login_action'
//引入控制全屏的库
import screenfull from 'screenfull'
import { createFromIconfontCN } from '@ant-design/icons';
//引入发送请求的方法
import {reqWeather} from '../../../api'
import './css/header.less'

//引入阿里图标库的图标js路径
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2047999_1p4junxhx4m.js'
});
//退出登录提示框对象
const { confirm } = Modal;

class Header extends Component {

    state = {
        isFull: false, //控制切换全屏
        data: dayjs().format('YYYY年 MM月DD日 HH:mm:ss '), //用于获取格式化后的时间
        weatherInfo:{}, //用于保存从百度天气接口请求回来的数据 
        dateHours:new Date().getHours()     //将当前的小时数保存到实例对象上
    }
     //发送百度天气请求接口
     getWeather = async()=>{
        let weatherInfo = await reqWeather()
        //将获取到的数据维护到state状态中
        this.setState({weatherInfo})
    }

    //当Header组件挂载到页面时,执行以下代码
    componentDidMount() {
        //给控制全屏的节点绑定监听改变的事件
        screenfull.on('change', () => {
            let isFull = !this.state.isFull
            this.setState({ isFull })
        });
        //用与每个一秒维护状态到state中，当state更改，会自动将新的数据维护到页面中，以显示最新时间
        this.timer =  setInterval(()=>{
            this.setState({ data: dayjs().format('YYYY年 MM月DD日 HH:mm:ss ')})
        },1000)
        //调用查询天气的接口
        this.getWeather()
        
    } 

    //当组件中页面上卸载下来时，关闭用于更新时间的定时器，否则会报错
    componentWillUnmount(){
        clearInterval(this.timer)
    }

    //退出登录的方法
    outAdmin = () => {
        //获取删除用户的方法，用于退出登录
        let { deleteUserInfo } = this.props
        confirm({
            title: '是否确定退出?',
            cancelText: '取消',
            okText: '确定',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                return new Promise((resolve, reject) => {
                    //一秒后退出登录
                    setTimeout(() => {
                        resolve()
                        deleteUserInfo()
                    }, 1000);
                })
            }
        });
    }
    //控制全屏图片点击的事件-->全屏的开关
    fullScreen = () => {
        screenfull.toggle()
    }

    render() {
        let { isFull, data ,weatherInfo,dateHours} = this.state
        let { user } = this.props.userInfo
        return (
            <header id='header'>
                <div className='header-top'>
                    <Button size='small' className='header-top-button' onClick={this.fullScreen} >
                        {/*自定义图标，并且随着state状态更改而更改*/}
                        <IconFont type={isFull ? 'icon-screen-exit' : 'icon-screen-full'} />
                    </Button>
                    <span className='username'>欢迎 , {user.username}</span>
                    <Button type='link' size='small' onClick={this.outAdmin} > 退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        {this.props.location.pathname}
                    </div>
                    <div className='header-bottom-right'>
                        <span className='time'>{data}</span>
                        <img src={dateHours >= 6 && dateHours <= 18 ? weatherInfo.dayPictureUrl :weatherInfo.nightPictureUrl} alt='天气图片' />
                         <pre>{weatherInfo.weather}  温度:{weatherInfo.temperature}</pre>
                    </div>
                </div>
            </header>
        )
    }
}
export default connect(
    state => ({ userInfo: state.userInfo }),
    { deleteUserInfo: createDeleteUserInfoAction }
)(withRouter(Header))