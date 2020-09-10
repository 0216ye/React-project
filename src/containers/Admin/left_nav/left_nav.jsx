import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect}    from 'react-redux'
import { Menu }from 'antd';
import  * as Icon from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action '
import menuList from '../../../config/menu_config'
import logo from '../../../static/imgs/logo.png'
import '../left_nav/css/left_nav.less'
const { SubMenu } = Menu;
class LeftNva extends Component {
    //以下 toggleCollapsed和state不知道可以干嘛，但没有会报一下奇怪的错误
    // state = {
    //     collapsed: false,
    //   };
    //   toggleCollapsed = () => {
    //     this.setState({
    //       collapsed: !this.state.collapsed,
    //     });
    //   };

    //用于动态创建菜单的方法-->用到了递归
    createMenu = (target) =>{
        return  target.map(item =>{
        //因为icon参数是一个节点，根据 React.createElement 动态的生成一个节点，并保存着
        const itemIcon =  React.createElement(Icon[item.icon])    
         /*判断是否为一级菜单*/
        if (!item.childrens) {
            return (
            <Menu.Item key={item.key} icon = {itemIcon} onClick = {()=>{this.props.saveTitle(item.title)}}>
                <Link to={item.path}>
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
            )
        }else {
            //非一级菜单
            return (
                /**   /**一级根菜单 * */
                <SubMenu key={item.key} title={item.title} icon = {itemIcon} >   
                {/**一级根菜单下面的二级菜单使用了递归 */}
                    {this.createMenu(item.childrens)}                 
                </SubMenu>
            )
        }
        } )
    }
    render() {
        return (
            <div >
                <header className='left-nav-header'>
                    <img src={logo} alt="logo图片" />
                    <h1 >
                        商品管理系统
                </h1>
                </header>
                <Menu
                    mode="inline"
                    theme="dark"
                    /**根据url路径最后一个 '/ '后的参数，判断给哪个添加高亮(点击)  & 如果路径中有product字符串，则选中该菜单 */
                    defaultSelectedKeys={ this.props.location.pathname.indexOf('product') !== -1 ? 'product' : this.props.location.pathname.split('/').reverse()[0]}
                    /*根据 '/'分割的数组 ['','admin','chart','line']前两位不需要，使用splice切割数组，让保存下来的数组的菜单处于打开的状态 */
                    defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
                 
                >
                    {
                        //调用创建菜单的方法
                        this.createMenu(menuList)
                    }
                </Menu>
            </div>
        );
    }
}
export default connect(
    state => ({}),
    {
        saveTitle:createSaveTitleAction
    }
)(withRouter(LeftNva))//withRouter可以让非路由组件，可以使用路由组件特有的API