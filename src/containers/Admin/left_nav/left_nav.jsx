import React, { Component } from 'react'
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    ToolOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import '../left_nav/css/left_nav.less'
import logo from '../../../static/imgs/logo.png'
const { SubMenu, Item } = Menu;
export default class LeftNva extends Component {
    // state = {
    //     collapsed: false,
    //   };

    toggleCollapsed = () => {
        // this.setState({
        //   collapsed: !this.state.collapsed,
        // });
    };
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
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={this.state.collapsed}

                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to='/admin/home'>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>


                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品">
                        
                        <Menu.Item key="10" icon={<UnorderedListOutlined />}>
                            <Link to = '/admin/prod-about/category'>
                                <span>分类管理</span>                       
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<ToolOutlined />}>
                        <Link to = '/admin/prod-about/product'>
                                <span>商品管理</span>                       
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub22" icon={<AppstoreOutlined />} title="商品">
                        
                        <Menu.Item key="10" icon={<UnorderedListOutlined />}>
                            <Link to = '/admin/prod-about/category'>
                                <span>分类管理</span>                       
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<ToolOutlined />}>
                        <Link to = '/admin/prod-about/product'>
                                <span>商品管理</span>                       
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}