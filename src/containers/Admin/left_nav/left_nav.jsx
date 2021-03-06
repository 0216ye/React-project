import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { createSaveTitleAction } from '../../../redux/action_creators/menu_action '
import menuList from '../../../config/menu_config'
import logo from '../../../static/imgs/logo.png'
import '../left_nav/css/left_nav.less'
const { SubMenu, Item } = Menu;
class LeftNva extends Component {

    //用于判断用户有哪些权限，能看见什么菜单
    hasAuth = (item) => {
        let username = this.props.userName.user.username //用户名
        let menus = this.props.userName.user.role.menus//menus:["prod-about", "category", "product"]
        if (username === 'admin') return true
        else if (!item.children){
            //item没有子菜单
            console.log(menus)
            return menus.find((item2) => { return item2 === item.key } )
        }else if ( item.children){
            //有子菜单-->some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值
            return item.children.some((item3)=>   {
               return  menus.indexOf(item3.key) !== -1
            } )
        }
        
    }
    //用于动态创建菜单的方法-->用到了递归
    createMenu = (target) => {
        return target.map((item) => {
            //因为icon参数是一个节点，根据 React.createElement 动态的生成一个节点，并保存着
            const itemIcon = React.createElement(Icon[item.icon])
            /*判断是否为一级菜单*/
            if (this.hasAuth(item)){
                if (!item.children) {
                    return (
                        <Item key={item.key} icon={itemIcon} onClick={() => { this.props.saveTitle(item.title) }}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </Item>
                    )
                } else {
                    //非一级菜单
                    return (
                        /**   /**一级根菜单 * */
                        <SubMenu key={item.key} title={item.title} icon={itemIcon} >
                            {/**一级根菜单下面的二级菜单使用了递归 */}
                            {this.createMenu(item.children)}
                        </SubMenu>
                    )
                }
            }
        })
    }
    render() {
        let { pathname } = this.props.location
        return (
            <div >
                <header className='left-nav-header'>
                    <img src={logo} alt="logo图片" />
                    <h1 >商品管理系统</h1>
                </header>
                <Menu
                    mode="inline"
                    theme="dark"
                    /**根据url路径最后一个 '/ '后的参数，判断给哪个添加高亮(点击)  & 如果路径中有product字符串，则选中该菜单 */
                    defaultSelectedKeys={pathname.indexOf('product') !== -1 ? 'product' : this.props.location.pathname.split('/').reverse()[0]}
                    /*根据 '/'分割的数组 ['','admin','chart','line']前两位不需要，使用splice切割数组，让保存下来的数组的菜单处于打开的状态 */
                    defaultOpenKeys={pathname.split('/').splice(2)}
                >
                    {
                        this.createMenu(menuList)
                    }
                </Menu>
            </div>
        );
    }
}
export default connect(
    state => ({
        userName: state.userInfo,
    }),
    {
        saveTitle: createSaveTitleAction
    }
)(withRouter(LeftNva))//withRouter可以让非路由组件，可以使用路由组件特有的API