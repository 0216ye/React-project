import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Form, Input, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategory,reqAddProduct} from '../../../api'
import PicturesWall from './picturesWall/pictures_wall'
import RichTextEditor from './richText/rich_text'
const { Option } = Select

class AddUpdate extends Component {
    // 创建ref容器 -->用于上传图片的组件
    pwRef = React.createRef()
    richTextRef = React.createRef()

    state = {
        categoryList: [] //保存商品分类的信息
    }

    componentDidMount() {
        //尝试从redux中读取商品分类信息
        let { categoryList } = this.props
        if (categoryList.length) this.setState({ categoryList })      //如果redux中有，则维护到状态中
        //真正发请求获取
        else this.getCategoryList()
    }
    //当redux中没有保存商品分类信息--->真正发请求获取
    getCategoryList = async () => {
        let result = await reqCategory()
        let { status, data } = result
        if (status === 0) this.setState({ categoryList: data })
        else message.error('获取商品分类信息失败', 1)
    }
    onFinish = async (values) => {
        //通过ref获取上传图片组件获取图片name数组的方法
        let imgs = this.pwRef.current.getImgArr()
        //通过ref获取富文本组件返回的 带HTML标签的文字，将其保存到数据库中
        let detail = this.richTextRef.current.getDetail()
        //发送请求
        let result = await reqAddProduct({ ...values, imgs,detail})
        if (result.status === 0 ){
            message.success('添加商品成功!',1)
            this.props.history.replace('/admin/prod-about/product')
        }
        else message.error('添加商品失败!',1)
        
    }

    render() {
        return (
            <Card title={
                <div>
                    <Button type='link' size='small' onClick={() => { this.props.history.goBack() }}   ><ArrowLeftOutlined /></Button>
                    <span>添加商品</span>
                </div>
            }>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} labelCol={{ md: 3 }} wrapperCol={{ md: 10 }}>
                    <Form.Item label="商品名称"
                        name="name"
                        rules={[
                            {required: true, message: '商品名称必须输入'},
                            {max:12,message:'商品名称小于等于12位'},
                            {min:4,message:'商品名称必须大于等于1位'},
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
                            {required: true, message: '商品价格必须输入'},
                            {pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/,message:'输入的金额不合法'}
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
    state => ({ categoryList: state.categoryList })
)(AddUpdate)