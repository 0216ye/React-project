import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card, Button, Table,Modal,Form,Input,message,Tree } from 'antd';
import {UserAddOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'
import {PAGE_SIZE} from '../../config/index'
import {reqRoleList,reqAddRole,reqAuthRolt} from '../../api'
import menuList from '../../config/menu_config'
class Role extends Component {
    forRef  = React.createRef()
    state = {
        isShowAdd : false,
        isShowAuth : false,
        roleList : [] ,//保存着所有角色的信息
        menuList, //用于创建Tree
        checkedKeys:[],//存着已选中的信息
        isLoading: true
    }
    componentDidMount(){
        this.getRoleList()
    }

    //获取 角色列表 信息
    getRoleList = async () => {   
        let result = await reqRoleList()
        let {status,data,msg}  =result
        if (status === 0)  this.setState({isLoading:false,roleList:data.reverse()})//反转获取到的数组，将最近添加的显示最前面
        else message.error(msg,1)
    }
    //新增角色 -->确认按钮
    handleOk = async (event) => {
        //获取输入的值
        let roleName = this.forRef.current.getFieldValue()
       
        let result = await reqAddRole(roleName)
        let {status,data,msg} = result
        if (status === 0 ){
            message.success('添加角色成功',1)
            //获取原有的角色信息，将新的角色保存到最前面
            let roleList  =[...this.state.roleList]
            roleList.unshift(data)
            this.setState({
                roleList,
                isShowAdd:false,
            })
        }
        else message.error(msg,1)
    }
    //新增角色 -->取消按钮
    handleCancel = () => {
        this.setState({isShowAdd:false})
    }
    //设置权限 ->确认按钮
    handleRoleOk = async () => {
        let {checkedKeys,_id} = this.state
        let userName = this.props.userName
        let result = await reqAuthRolt({_id,menus:checkedKeys,auth_name:userName})
        let {status,msg} = result
        if (status ===0){
            message.success('授权成功',1)
            //重新从服务器获取最新的数据
            this.getRoleList()
            this.setState({
                isShowAuth:false
            })
        }   
        else message.error(msg,1)
    }
    //设置权限 ->取消按钮
    handleRoleCancel = () => {
        this.setState({isShowAuth:false})
    }    
    //保存着设置的权限
    onCheck = checkedKeys => {
    this.setState({checkedKeys})
    };
   
    //用于展示授权弹窗-->用于数据回显
    showAuth = (id) => {
        const {roleList} = this.state
        // 找到与当前点击传递过来id匹配的一项，将其的menus(保存着自己选中的状态)赋给checkedKeys
        let result =  roleList.find((item) => {
            return item._id === id
        })
        if (result) {
            this.setState({checkedKeys:result.menus})
        }
        //展示弹窗和保存id
        this.setState({
            isShowAuth:true,
            _id:id
        })
    }
    //用于展示添加弹窗和清空表单
    showAdd = () => {
        this.setState({isShowAdd:true})
        //清空表单-->页面刚刷新时，表单无数据，直接使用 this.forRef.current.resetFields()会报错
        if (this.forRef.current){
          this.forRef.current.resetFields()
        }
    }
    //遍历数组成Tree
    renderTreeNodes = (menuList) => {
        return  menuList.map((item) => {
            if(item.childrens){
                this.renderTreeNodes(item.childrens)
            }
            return item
        })
    }
    render() {
        let {roleList,menuList}  = this.state
        const dataSource = roleList

        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: (item) => {
                    return item ? dayjs(item).format('YYYY年 MM月DD日 HH:mm:ss ') : ''
                }
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render : (item) => {
                    return item ? dayjs(item).format('YYYY年 MM月DD日 HH:mm:ss ') : ''
                }
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
            },
            {
                title: '操作',
                key: 'option',
                render : (item) => {
                    return  <Button type = 'link' onClick = {()=>{this.showAuth(item._id)}}>设置权限</Button>
                }
            },
        ];

        const treeData = this.renderTreeNodes(menuList)
          
        return (
            <div>
                <Card 
                    title={
                        <Button type='primary'  onClick = {this.showAdd} >
                            <UserAddOutlined />
                            添加角色
                        </Button>}>
                    <Table 
                        dataSource={dataSource}
                        columns={columns} 
                        bordered
                        pagination = {{defaultPageSize:PAGE_SIZE}}
                        rowKey= "_id"
                        loading = {this.state.isLoading}
                    />;
                </Card>
                {/**新增角色提示框 */}
                <Modal
                    title = '添加角色'
                    okText = '确定'
                    cancelText = '取消'
                    visible= {this.state.isShowAdd}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                {/**提示框内的表单 */}
                <Form  
                    ref = {this.forRef}
                >
                    <Form.Item
                          label = '角色名称'  
                          name="roleName"
                          rules={[
                            {required: true,message: '角色名称不能为空'},
                          ]} 
                    >
                        <Input placeholder="请输入要添加的角色名称"/>
                    </Form.Item>
                </Form>
                </Modal>
                {/*设置权限提示框 */}
                <Modal
                    title = '设置角色权限'
                    okText = '确定'
                    cancelText = '取消'
                    visible= {this.state.isShowAuth}
                    onOk={this.handleRoleOk}
                    onCancel={this.handleRoleCancel}
                >
                     <Tree
                        checkable //允许选中
                        onCheck={this.onCheck}//	点击复选框触发
                        checkedKeys={this.state.checkedKeys}
                        defaultExpandAll = {true} //默认一上来展开所有父节点
                        treeData= {treeData}
                    >
                    </Tree>
                </Modal>
            </div>
        )
    }
}
export default connect(
    state =>({userName:state.userInfo.user.username}),
    {}
)(Role)