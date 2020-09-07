import React,{Component} from 'react'
import { Card,Button,Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
export default class Category extends Component{
    demo =(a) => {
        console.log(a)
    }
    render(){
        const dataSource = [
            {
              key: '1',
              nameCategory: '零食',
            },
            {
              key: '2',
              nameCategory: '零食',
            }
          ];
          //操作列名
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'nameCategory',
              key: 'name',
            },
            {
              title: '操作',
              dataIndex: 'nameCategory',
              key: 'age',
              //改方法的值为一个回调，底层调用时，会将dataIndex对应的值作为参数传入(nameCategory对应的值)
              render:(a) => {
                return <Button type ='link' onClick = {() => { this.demo(a)}}>修改分类</Button>
              },
              width:'25%',
              align: 'center'
            }
          ];
       return (
        <Card 
        extra={<Button type ='primary' ><PlusCircleOutlined />添加</Button>}
       
        >
         <Table dataSource={dataSource} columns={columns} bordered/>;
        </Card>
       )
   }
}