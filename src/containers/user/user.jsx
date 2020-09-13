import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card, Button, Table, Modal, Form, Input, message, Select } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { PAGE_SIZE } from '../../config/index'
import { reqUserList, reqAddUser, reqDeleteUser } from '../../api'
import {createSaveUserInfoList} from '../../redux/action_creators/user_action'
const { Option } = Select
class User extends Component {
    formRef = React.createRef()
    state = {
        isLoading: true,
        isShowAdd: false,
        userList: [], //保存着用户信息
        roleList: [], //保存着角色信息
        titleType: 'add', //表单的操作的类型
        visible:false //展示删除弹窗
    }
    componentDidMount() {
        this.getUserList()
    
    }
    //获取用户列表
    getUserList = async () => {
        let result = await reqUserList()
        let { status, data, msg } = result
        if (status === 0) {
            this.setState({
                userList: data.users.reverse(),
                roleList: data.roles,
                isLoading: false
            })
            //将所有用户保存到redux中
            this.props.saveUserInfoList(data.users.reverse())
        }
        else message.error(msg, 1)
    }
    //展示添加用户弹窗的确认按钮
    handleOk = () => {
        this.formRef.current.validateFields()
            .then(
                async (values) => {
                    let result = await reqAddUser(values)
                    let { status, data, msg } = result
                    let userList = [...this.state.userList]
                    userList.unshift(data)
                    if (status === 0) {
                        message.success('创建用户成功', 1)
                        this.setState({
                            isShowAdd: false,
                            userList
                        })
                        //清空表单信息
                        // this.formRef.current.resetFields()
                    }
                    else message.error(msg, 1)
                }
            )
            .catch(
                errorInfo => {
                    message.error('输入内容有误，请重新输入', 1)
                }
            )

    }
    //展示添加用户弹窗的取消按钮
    handleCancel = () => {
        this.setState({ isShowAdd: false })
    }
    //更新用户的方法
    updateUser = (id) => {
        this.setState({ isShowAdd: true, titleType: 'update' })
        //因为更新state后，立即获取，获取不到state,使用redux
        let {getUserInfo} =this.props
        if (getUserInfo.length) {
            let result = getUserInfo.find(item => item._id === id)
            let {email,password,phone,role_id,username } = result
            // if (this.formRef.current){
            //     this.formRef.current.setFieldsValue({
            //         username,
            //         password,
            //         phone,
            //         email,
            //         role_id
            //     })
            // }
            setTimeout(() => {
                this.formRef.current.setFieldsValue({
                    username,
                    password,
                    phone,
                    email,
                    role_id   
                })
                }, 100)
        }
    

    }
      //用于点击展示创建用户的弹窗
      showAdd = () => {
        setTimeout(() => {
            this.formRef.current.resetFields()
        },100)
        this.setState({ isShowAdd: true,titleType:'add'})
    }
    //删除用户的方法
    deleteUser = async (id) => {
        this.setState({visible:true})
        //将传递过的id挂到this上
        this.id = id
    }
    //输出用户的弹窗-->确认按钮
    onHandleOk = async(id) => {
        let result = await reqDeleteUser(this.id)
        let { status, data, msg } = result
        if (status === 0) {
            this.setState({visible:false})
            message.success('删除成功!', 1)
            this.getUserList()
        }
        else message.error(msg, 1)
    }
    //用于删除用户的弹窗-->取消
    onCancel = () => {
        this.setState({visible:false})
    }
    render() {
        const dataSource = this.state.userList
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: item => dayjs(item).format('YYYY年 MM月DD日 HH:mm:ss ')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render: id => {
                    let result = this.state.roleList.find(item => {
                        return item._id === id
                    })
                    if (result) {
                        return result.name
                    }
                }
            },
            {
                title: '操作',
                key: 'phone',
                render: (item) => {
                    return (
                        <div>
                            <Button type='link' onClick={() => { this.updateUser(item._id) }} >修改</Button><br />
                            <Button type='link' onClick={() => { this.deleteUser(item._id) }}>删除</Button>
                        </div>
                    )
                }
            },
        ];

        return (
            <div>
                <Card
                    title={
                        <Button type='primary' onClick={this.showAdd}  >
                            <UserAddOutlined />
                            创建用户
                        </Button>
                    }
                >
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered
                        pagination={{ defaultPageSize: PAGE_SIZE }}
                        rowKey="_id"
                        loading={this.state.isLoading}
                    />
                    <Modal
                        title={this.state.titleType === 'add' ? '创建用户' : '修改用户'}
                        okText='确定'
                        cancelText='取消'
                        visible={this.state.isShowAdd}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form
                            ref={this.formRef}
                            labelCol={{ md: 4 }}
                            wrapperCol={{ md: 15 }}
                        >
                            <Form.Item label='用户名'
                                name="username"
                                rules={[
                                    { required: true, message: '用户名不能为空' },
                                    { max: 12, message: '用户名必须小于等于12位' },
                                    { min: 4, message: '用户名必须大于等于4位' },
                                    { pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成' },
                                ]}
                            >
                                <Input placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item label='密码'
                                name="password"
                                rules={[
                                    { required: true, message: '密码不能为空' },
                                    { min: 4, message: '密码不能小于6位' },
                                    { max: 12, message: '密码大于12位' },
                                ]}
                            >
                                <Input placeholder="请输入密码" />
                            </Form.Item>
                            <Form.Item label='手机号码'
                                name="phone"
                                rules={[
                                    { required: true, message: '手机号不能为空' },
                                    { min: 11, message: '请输入11位的手机号' },
                                    { max: 11, message: '请输入11位的手机号' },
                                ]}
                            >
                                <Input placeholder="请输入手机号" />
                            </Form.Item>
                            <Form.Item label='电子邮箱'
                                name="email"
                                rules={[
                                    { required: true, message: '邮箱不能为空' },
                                    { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入正确的邮箱号' }
                                ]}
                            >
                                <Input placeholder="请输入邮箱" />
                            </Form.Item>

                            <Form.Item label='角色'
                                name="role_id"
                                rules={[
                                    { required: true, message: '请选择一个角色分类' }
                                ]}
                            >
                                <Select allowClear placeholder="请选择分类">
                                    {
                                        this.state.roleList.map(item => {
                                            return <Option key={item._id} value={item._id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/**用删除用户的弹窗 */}
                    <Modal
                        okText='确定'
                        cancelText='取消'
                        visible = {this.state.visible}
                        onOk = {this.onHandleOk}
                        onCancel = {this.onCancel}
                    >
                        <p>确认删除该用户?</p>
                    </Modal>
                </Card>
            </div>
        )
    }
}
export default connect(
    state => ({getUserInfo:state.userInfoList}),
    {saveUserInfoList:createSaveUserInfoList}
)(User)