import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Form, Input, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategory, reqAddProduct, reqProductById,reqUpdateProductList} from '../../../api'
import PicturesWall from './picturesWall/pictures_wall'
import RichTextEditor from './richText/rich_text'
const { Option } = Select

class AddUpdate extends Component {
    // 创建ref容器 -->用于上传图片的组件
    pwRef = React.createRef()
    //获取富文本组件的ref
    richTextRef = React.createRef()
    //获取Form组件的ref
    formRef = React.createRef();

    state = {
        categoryList: [], //保存商品分类的信息
        opeaType: 'add',//操作的类型
        _id : ''
    }


    componentDidMount() {
        let { id } = this.props.match.params
        //尝试从redux中读取商品分类信息
        let { categoryList, productList } = this.props
        if (categoryList.length) this.setState({ categoryList })      //如果redux中有，则维护到状态中
        //真正发请求获取
        else this.getCategoryList()

        if (id) {
            this.setState({ opeaType: 'update' })
            if (productList.length) {
                let result = productList.find((item) => {
                    return item._id === id
                })
                if (result) {
                    this.setState({_id:result._id})
                    this.pwRef.current.setImgArr(result.imgs)
                    this.richTextRef.current.setDetail(result.detail)
                    //设置input的初始值
                    if (this.formRef.current) {
                        //动态的修改Input的值，因为initialValues 4.0已经不允许从setState 动态更新，
                        this.formRef.current.setFieldsValue({ ...result })
                    }
                } else message.error('获取商品信息失败!', 1)
            } else this.getProductList(id)
        }

    }
    getProductList = async (id) => {
        let result = await reqProductById(id)
        let { status, data } = result
        if (status === 0) {
            this.setState({_id:data._id})
            //将返回的图片数组的信息通过ref传递给upload组件
            this.pwRef.current.setImgArr(data.imgs)
            //将返回的富文本信息通过ref传递给富文本组件
            this.richTextRef.current.setDetail(data.detail)
            if (this.formRef.current) {
                //动态的修改Input的值，因为initialValues 4.0已经不允许从setState 动态更新，
                this.formRef.current.setFieldsValue({ ...data })
            }
        } else message.error('获取商品信息失败!', 1)

    }
    //当redux中没有保存商品分类信息--->真正发请求获取
    getCategoryList = async () => {
        let result = await reqCategory()
        let { status, data ,msg} = result
        if (status === 0) this.setState({ categoryList: data })
        else message.error(msg, 1)
    }
    onFinish = async (values) => {
        let {opeaType,_id} = this.state
        //通过ref获取上传图片组件获取图片name数组的方法
        let imgs = this.pwRef.current.getImgArr()
        //通过ref获取富文本组件返回的 带HTML标签的文字，将其保存到数据库中
        let detail = this.richTextRef.current.getDetail()
        //发送请求 -->根据操作的类型判断发送那个请求(更新或添加)
        let result 
        if (opeaType === 'add')     result = await reqAddProduct({ ...values, imgs, detail })
        else   result = await reqUpdateProductList({ ...values,imgs, detail,_id })
        if (result.status === 0) {
            message.success('操作商品成功!', 1)
            this.props.history.replace('/admin/prod-about/product')
        }
        else message.error(result.msg, 1)
    }

    render() {
        return (
            <Card title={
                <div>
                    <Button type='link' size='small' onClick={() => { this.props.history.goBack() }}   ><ArrowLeftOutlined /></Button>
                    <span>{this.state.opeaType === 'add' ? '添加商品' : '修改商品'}</span>
                </div>
            }>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} labelCol={{ md: 3 }} wrapperCol={{ md: 10 }}>
                    <Form.Item label="商品名称"
                        name='name'
                        rules={[
                            { required: true, message: '商品名称必须输入' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="商品描述"
                        name="desc"
                        rules={[
                            {
                                required: true, message: '商品描述必须输入'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="商品价格"
                        name="price"
                        rules={[
                            { required: true, message: '商品价格必须输入' },
                            { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/, message: '输入的金额不合法' }
                        ]}

                    >
                        <Input ref="i" prefix='￥' type='number' addonAfter='元' />
                    </Form.Item>
                    <Form.Item label="商品分类"
                        name="categoryId"
                        rules={[
                            {
                                required: true, message: '商品分类必须输入'
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择分类"
                            allowClear
                        >
                            {
                                this.state.categoryList.map((item) => {
                                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="商品图片"
                        name="imgs"
                        
                    >
                        <PicturesWall ref={this.pwRef} />
                    </Form.Item>
                    <Form.Item label="商品详情"
                        name="detail"
                        wrapperCol={{ md: 18 }}
                    >
                        <RichTextEditor ref={this.richTextRef} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default connect(
    state => ({
        categoryList: state.categoryList,
        productList: state.productList
    })
)(AddUpdate)