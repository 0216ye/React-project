import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, message } from 'antd';
import {
    PlusCircleOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { reqProductList, reqUpdateStatus, reqSearchProductList } from '../../api/index'
import { PAGE_SIZE } from '../../config/index'
const { Option } = Select;
//该组件中 Select和Input的值，通过了受控组件(值是否自动维护到状态中)进行了获取
export default class Product extends Component {
    state = {
        productList: [], //保存商品分页的数据
        current: 1, //当前所在的页的值
        total: '',//总数量
        keyWord: '',//保存着输入框输入的内容
        searchType: 'productName' //保存着select选择器的name
    }

    componentDidMount() {
        //获取商品分页列表的方法
        this.getProductList()
    }

    //获取商品分页列表的方法-->  //形参默认值，第一次值为指定的，后续的由分页器的onChange回调传参进行修改
    //该方法被搜索按钮(发送搜索产品分页列表的方法)复用
    getProductList = async (number = 1, pageSize = PAGE_SIZE) => {
        let {keyWord,searchType} = this.state
        let result
        //判断是通过搜索按钮点击的还是通过分页器点击的!
        if (this.isSearch)  result = await reqSearchProductList(number,PAGE_SIZE,searchType,keyWord) //根据商品名称搜索/根据商品描述 发送搜索分页列表请求
        else   result = await reqProductList(number, pageSize) //获取商品分页列表请求
        let {status,data}  = result
        if (status === 0) {
            this.setState({ 
                //将数据维护到状态中
                productList: data.list,
                //设置当前所在的页的值
                current: number,
                //设置获取到的总的数据量
                total: data.total
            })
        } else {
            message.error('获取商品信息出错', 1)
        }

    }

    //操作每条数据的状态的方法 -->将实参解构赋值
    updaProductList = async ({ status, _id }) => {
        //更改获取到的当前点击的那条数据的状态
        if (status === 1) status = 2
        else status = 1
        //发送请求
        let result = await reqUpdateStatus(_id, status)
        console.log(result)
        if (result.status === 0) {
            //更新商品状态请求成功
            message.success('更新商品状态成功!', 1)
            let productList = [...this.state.productList]
            //遍历当前页面上的每条数据，如果_id与当前点击的一致，则修改其状态
            productList = productList.map((item) => {
                if (item._id === _id) {
                    item.status = status
                }
                return item
            })
            //维护到状态中，以更新页面
            this.setState({ productList })
        } else {
            //更新商品状态请求失败
            message.error(result.msg, 1)
        }
    }

    //发送搜索产品分页列表的方法 -->复用了获取商品分页列表的方法
    search = async () => {
        //当通过 搜索按钮点击时，为this添加一个属性，用于判断是通过搜索按钮发送请求还是分页器发送请求
        this.isSearch = true
        this.getProductList()
    }
    render() {
        let { total, current } = this.state
        //Table表格的数据源
        const dataSource = this.state.productList
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                width: '18%',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                align: 'center',//居中对齐
                width: '10%',
                dataIndex: 'price',
                key: 'price',
                render: (price) => {
                    return '¥' + price //对价格进行加工-->价格前加个钱符
                }
            },
            {
                title: '状态',
                align: 'center',//居中对齐
                width: '20%',
                // dataIndex: 'status', //不写这个render返回的是dataIndex所在的对象
                key: 'status',
                render: (item) => {
                    return (
                        <div>
                            <Button
                                type={item.status === 1 ? 'danger' : 'primary'}
                                onClick={() => {
                                    this.updaProductList(item)
                                }}
                            >
                                {item.status === 1 ? '上架' : '下架'}
                            </Button><br />
                            <span>状态:{item.status === 1 ? '已下架' : '在售'}</span>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                align: 'center',//居中对齐
                width: '10%',
                dataIndex: 'oper',
                key: 'oper',
                render: (oper) => {
                    return (
                        <div>
                            <Button type='link' onClick = {()=>{this.props.history.push('/admin/prod-about/product/detail/111')}}>详情</Button><br />
                            <Button type='link' onClick = {()=>{this.props.history.push('/admin/prod-about/product/add_update/222')}} >修改</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <Card
                title={
                    <div>
                        <Select
                            defaultValue="productName" 
                            style={{ width: 115 }}
                            onChange={(value) => {
                                //值改变时的回调 -->value:productName/productDesc
                                this.setState({ searchType: value })
                            }}
                        >
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input
                            style={{ width: '17%', margin: '0px 8px' }}
                            placeholder="请输入查询的关键词" //默认提示信息
                            allowClear={true}   //产生一个小图标，点击可以清空输入栏
                            onChange={(event) => {
                                //值改变时的回调
                                this.setState({ keyWord: event.target.value })
                            }}
                        />
                        <Button type='primary' onClick={this.search}>
                            <SearchOutlined />搜索
                        </Button>
                    </div>
                } //选择器
                extra={<Button type='primary' onClick ={()=>{this.props.history.push('/admin/prod-about/product/add_update/sdkjasd')}}><PlusCircleOutlined/>添加商品</Button>}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey='_id' //表格行 key 的取值改为_id
                    pagination={{//分页器
                        total: total, // 总的数据量
                        current: current, //当前所在的页
                        pageSize: PAGE_SIZE, //每页显示的数据量
                        onChange: (number, pageSize) => { //页码改变的回调，参数是改变后的页码及每页条数
                            //将获取到的当前页的值维护到状态中
                            this.setState({ current: number })
                            //调用获取商品列表的方法
                            this.getProductList(number)
                        }
                    }}
                />
            </Card>
        )
    }
}