import React,{Component} from 'react'
import { Card,Button,Table,message,Modal,Form,Input} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {reqCategory,reqAddCategory,reqUpdateCategory} from '../../api/index'
import {PAGE_SIZE} from '../../config/index'
export default class Category extends Component{
  //获取Form组件的ref
  formRef = React.createRef();
  state = {
    category:[], //保存获取到的商品分类列表
    visible: false, //是否展示提示框
    titleType: '', //判断是显示(添加分类还是修改分类)
    isLoading:true , //判断是否显示加载中
    modalCurrentValue:'' ,//弹窗显示的值-->用于数据的回显
    modalCurrentId: '' //弹窗显示的值对应的ID-->用于数据的回显
  }
  componentDidMount(){
    //调用发送商品列表请求
    this.getCategory()
  }
  //获取商品列表的请求
  getCategory = async() => {
    let result =  await  reqCategory()
    //结束Table显示加载状态
    this.setState({isLoading:false})
    const {status,data,msg} = result
    if (status === 0 )    this.setState({category:data.reverse()})//将获取到的数据数组反转，然后维护到状态中
    else  message.error(msg,1) //提示错误
  }  

  //用于展示Modal提示框 -->添加
  showAdd = () => {
     //第一次this.formRef.current为null，当为null再使用 this.formRef.current，否则报错
     if (this.formRef.current){
      //动态的修改Input的值，因为initialValues 4.0已经不允许从setState 动态更新，
      this.formRef.current.setFieldsValue({
        categoryName: '',
      })
    }
    this.setState({
      modalCurrentValue:'',
      modalCurrentId:'',  
      titleType: 'add',
      visible: true,
    });
  };
  //用于展示Modal提示框 -->修改
  showUpdate = (item) => {
    // 将每条数据的唯一标识ID，和name的值保存到state中
    let {_id,name} = item
    //第一次this.formRef.current为null，当为null再使用 this.formRef.current，否则报错
    if (this.formRef.current){
      //动态的修改Input的值，因为initialValues 4.0已经不允许从setState 动态更新，
      this.formRef.current.setFieldsValue({
        categoryName: name,
      })
    }
    this.setState({
      titleType: 'update',
      modalCurrentValue:name,//第一次重状态中读取
      modalCurrentId:_id, //
      visible: true,
    });
  };
  //添加商品分类的方法
  toAdd = async (value) => {
    
    // this.setState({modalCurrentValue:''})
    //发送请求
    let result = await reqAddCategory(value)
    //获取返回的数据
    const {data,status,msg} = result 
    //请求成功
    if (status === 0){
      //获取state中原来的category的数据
      let category = [...this.state.category]
      //将新增的分类添加到维护商品分类的数组的最前面
      category.unshift(data)
      //将添加后，修改过的整个category数据重新维护到state中
      this.setState({category})
      //添加成功提示框
      message.success('新增分类成功！',1)
      //重置表单的警告字段
      this.formRef.current.resetFields()
      //隐藏大的输入框
      this.setState({
        visible: false,
      });
    }else {
      //请求失败
      message.error(msg,1)
    }
  }
  //修改商品分类的方法
  toUpdate = async (value) => {
    let {categoryName} = value ////value: {categoryName: "傻蛋"}
    let {modalCurrentId} = this.state 
    let result = await reqUpdateCategory(modalCurrentId,categoryName)
    //解构赋值
    let {status,msg} = result
    if ( status === 0 ){
      message.success('修改商品分类成功!',1)
      //重新获取数据库中保存的商品分类信息-->会维护到状态中(使修改后的能直接显示到页面)
      this.getCategory()
       //重置表单的警告字段
       this.formRef.current.resetFields()
       //隐藏大的输入框
      this.setState({
        visible: false,
      });
    }else{
      //提示:更新错误
      message.error(msg,1)
    }
    
  }
  //用于modal关闭提示框-->确认按钮
  handleOk = () => { 
    let {titleType} = this.state
    //用于Input输入框的校验-->能够动态的获取到Input输入框输入的内容
    this.formRef.current.validateFields()
    .then((values) => { //values: {categoryName: "傻蛋"}
      if ( titleType === 'add'){
        //调用添加方法
        this.toAdd(values.categoryName) 
      }
      if (titleType === 'update' ) {
        //调用更新方法
        this.toUpdate(values)
      }
    })
    .catch((errorInfo) => {
      //弹出提示框，提示错误信息
      message.error(errorInfo.errorFields[0].errors,1)
    })
  };
  //用于modal关闭提示框-->取消按钮
  handleCancel = () => {
    //重置表单-->通过ref解决
    this.formRef.current.resetFields()
    this.setState({
      visible: false,
    });
  };
  componentDidMount
    render(){
        const dataSource = this.state.category
        const {titleType,visible} = this.state
          //操作列名-->表格显示的数据
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              // dataIndex: 'name', 没有这个，则render会返回一整个对象，
              key: 'name',
              //改方法的值为一个回调，底层调用时，会将dataIndex对应的值作为参数传入(nameCategory对应的值)
              render:(item) => {
                return <Button type ='link' onClick = {() => { this.showUpdate(item)}} >修改分类</Button>
              },
              width:'25%',
              align: 'center'
            }
          ];
       return (
          <div>
            {/**卡片组件 */}
            <Card 
              extra={<Button type ='primary' onClick = {this.showAdd} ><PlusCircleOutlined />添加</Button>}
            >
              <Table 
                dataSource={dataSource} 
                columns={columns}  
                bordered //显示表格边框
                rowKey = '_id' //设置唯一标识的key对应为获取到数据的_id标识
                pagination = {{ //分页器
                  pageSize:PAGE_SIZE,//设置每页显示的数量
                  hideOnSinglePage:true,  //只有一页时隐藏分页器
                  showQuickJumper : true, //用于快速跳转到某一页
                }}
                loading = {this.state.isLoading} //判断是否显示加载
              />
            </Card>
            {/**提示框 */}
            <Modal
              title= {titleType === 'add' ? '添加分类' : '修改分类'}
              visible={visible}
              okText = '确定'
              cancelText = '取消'
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/**提示框内的表单 */}
               <Form  
                  name="category_form"
                  className="category_form"
                  ref={this.formRef}  //创建ref
                  // initialValues={this.state.m}
                  initialValues={{
                    categoryName:this.state.modalCurrentValue,//对应的Form.Item的默认值
                  }}
                >
                  <Form.Item 
                      name="categoryName"
                      rules={[
                        {required: true,message: '分类名不能为空'},
                      ]}
                  >
                    <Input  placeholder="请输入分类名"  />
                  </Form.Item>
                </Form>
            </Modal>
          </div>
       )
   }
}