import React,{Component} from 'react'
import { Card,Button,Select,Input,Table,message } from 'antd';
import {
    PlusCircleOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import {reqProductList} from '../../api/index'
import {PAGE_SIZE} from '../../config/index'
const { Option } = Select;
                                 
export default class Product extends Component{
    state = {
        productList: [], //保存商品分页的数据
        current:1, //当前所在的页的值
        total: '' //总数量
    }

    componentDidMount(){
        this.getProduct()
    }

    //获取商品分页列表的方法-->  //形参默认值，第一次值为指定的，后续的由分页器的onChange回调传参进行修改
    getProduct = async (number = 1,pageSize = PAGE_SIZE ) => { 
        let result = await reqProductList(number,pageSize)
        let {status,data} = result
        if (status === 0 ){
            this.setState({
                //将数据维护到状态中
                productList:data.list, 
                //设置当前所在的页的值
                current:number,
                //设置获取到的总的数据量
                total:data.total
            })
        }else{
            message.error('获取商品信息出错',1)
        }
       
    }
    render(){
        let {total,current} =this.state
        //Table表格的数据源
        const dataSource =this.state.productList
        const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              width:'18%',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              title: '价格',
              align:'center',//居中对齐
              width:'10%',
              dataIndex: 'price',
              key: 'price',
              render:(price) => {
                return '¥'+price //对价格进行加工-->价格前加个钱符
              }
            },
            {
              title: '状态',
              align:'center',//居中对齐
              width:'10%',
              dataIndex: 'status',
              key: 'status',
              render:(status) => {
                return (
                    <div>
                        <Button type='primary'>上架</Button><br/>
                        <span>在售</span>
                    </div>
                )
              }
              },
            {
              title: '操作',
              align:'center',//居中对齐
              width:'10%',
              dataIndex: 'oper',
              key: 'oper',
              render:(oper) => {
                return (
                    <div>
                        <Button type ='link'>详情</Button><br/>
                        <Button type ='link'>修改</Button>
                    </div>
                )
              }
            }
          ];
       return (
        <Card
            title = {
               <div>
                <Select defaultValue="name" style={{ width: 115 }}>
                    <Option value="name">按名称搜索</Option>
                    <Option value="desc">按分类搜索</Option>
                </Select>
                <Input 
                    style = {{width:'17%',margin:'0px 8px'}}
                    placeholder="请输入查询的关键词" //默认提示信息
                    allowClear = {true}   //产生一个小图标，点击可以清空输入栏
                />
                <Button type ='primary'><SearchOutlined />搜索</Button>
               </div>
            } //选择器
            extra={<Button type ='primary'><PlusCircleOutlined />添加商品</Button>} 
         >
           <Table 
                dataSource={dataSource} 
                columns={columns} 
                bordered
                rowKey = '_id'
                pagination = {{//分页器
                    total:total, // 总的数据量
                    current:current, //当前所在的页
                    pageSize:PAGE_SIZE, //每页显示的数据量
                    onChange : (value,pageSize) => { //页码改变的回调，参数是改变后的页码及每页条数
                        this.setState({current:value})
                        this.getProduct(value)
                    }
                }}    
            />
         </Card>
       )
   }
}