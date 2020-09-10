/* eslint-disable react/no-danger-with-children */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, List, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {reqProductById,reqCategory} from '../../../api'
import {BASE_URL} from '../../../config'
import './css/detail.less'

class Detail extends Component {
    state = {
        categoryId: '', //保存商品分类的ID
        categoryName:'',//保存商品分类的名称
        desc: '',
        detail: '',
        imgs: [],
        name: '',
        price: '',
        isLoading: true
    }
    componentDidMount() {
        const { id } = this.props.match.params
        //从redux中读取当前所在页中的所有数据(数组) -->页面刷新时，redux保存的回丢失
        const reduxProduct = this.props.productList  //商品管理信息
        const reduxCategory = this.props.categoryList //商品分类信息: _id 和name
        //获取到的redux有值则进判断中 -->为商品管理的判断
        if (reduxProduct.length){
            //从url最后一个'/'后读取--> 该id为product组件点击详情时带到url中的  
            let result = reduxProduct.find((item) =>  item._id === id) //当url中的id和redux保存的数据中的id匹配上时，返回给result
            if (result){
                //因为setState是异步的，不能立即储存立即获取,得再改方法的包裹函数外才能获取到!
                this.categoryId = result.categoryId
                this.setState({...result,isLoading:false})
            }else message.error('获取所属分类出错',1)
        } else  this.getProduct(id) //真正发送请求获取数据
        


        if (reduxCategory.length){
            let result = reduxCategory.find((item) => {
                return  item._id === this.categoryId
            })  
            if (result)   this.setState({categoryName:result.name,isLoading:false})
            else  message.error('获取所属分类出错',1)  
        }else{
            //真正的发请求获取
            this.getCategory()
        }
    }
    //根据ID发送请求获取对于商品的信息
    getProduct = async (id) => {
        let result = await reqProductById(id)
        let {status,data} = result
         /*
            //简写了以下的代码 -->react中的babel环境-->所以可以使用三点运算符(本来是用于数组的)
            将该条匹配上的信息的数据维护到状态中
            const { categoryId, desc, detail, imgs, name, price, _id } = result
            this.setState({ categoryId, desc, detail, imgs, name, price, _id })
        */
        if (status === 0 ){
            this.categoryId = data.categoryId
            this.setState({...data,isLoading:false})
        }
        else  message.error('获取所属分类出错',1)
    }

    getCategory = async () => {
        let categoryList = await reqCategory()
        let {status,data} = categoryList
        if (status === 0 ){
            let result = data.find((item) => {
                return item._id === this.categoryId
            })
            if(result)  this.setState({categoryName:result.name,isLoading:false})
            else  message.error('获取所属分类出错',1)
        }
  
    }
    render() {
        let { categoryName, desc, detail, imgs, name, price,isLoading} = this.state
        return (
            <Card
                title={
                    <div >
                        <Button type='link' size='small' onClick={() => { this.props.history.goBack() }}><ArrowLeftOutlined /> </Button>
                        <span>商品详情</span>
                    </div>
                }
            >
                <List loading = {isLoading} >
                    <List.Item  className = 'list-item' >
                        <span className='prodTitle' >商品名称: </span>
                        <span >{name} </span>
                    </List.Item>
                    <List.Item className = 'list-item' >
                        <span className='prodTitle' >商品描述: </span>
                        <span>{desc} </span>
                    </List.Item>
                    <List.Item className = 'list-item' >
                        <span className='prodTitle' >商品价格: </span>
                        <span>{price} </span>
                    </List.Item>
                    <List.Item className = 'list-item' >
                        <span className='prodTitle' >所属分类: </span>
                        <span >{categoryName} </span>
                    </List.Item>
                    <List.Item className = 'list-item' >
                        <span className='prodTitle' >商品图片: </span>
                        {
                            imgs.map((item,index) => {
                                return <img key = {index} src = { `${BASE_URL}/upload/`+item} alt = '商品图片' />
                            })
                        }
                    </List.Item>
                    <List.Item className = 'list-item' >
                        <span className='prodTitle' >商品详情: </span>
                        <span dangerouslySetInnerHTML={{__html:detail }}></span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}
export default connect(
    //获取redux中保存的信息，交由当前Detail组件的Props参数
    state => ({ productList: state.productList,categoryList:state.categoryList }),
    {}
)(Detail)