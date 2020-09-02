/*UI组件
    a.	只负责 UI 的呈现，不带有任何业务逻辑
    b.	通过props接收数据(一般数据和函数)
    c.	不使用任何 Redux 的 API
    d.	一般保存在components文件夹下
*/
import React, {Component} from 'react'
export default class Count extends Component {
    componentDidMount(){
        //容器组件count_containers可以将state和dispatch传递给UI组件Count,并且是以Props属性传递的！
        console.log(this.props)
    }
  //加法
  increment =() => {
    let {value}  = this.selectNumber
    this.props.increment(value)
  } 
  //减法
  subduction = () => {
    let {value}  = this.selectNumber
    this.props.subduction(value)
  }
  //为奇数时，可以加
  incrementIfOdd = () => {
    let {value}  = this.selectNumber
    // 获取状态中的值
    let {count} =  this.props
    if (count%2 === 1){
        this.props.increment(value)
    }
    if (count%2 === -1){
        this.props.increment(value)
    }
  }
  //异步的增加方法
  subductionAsync = () => {
    let {value}  = this.selectNumber
        this.props.incrementAsync(value,1000)
  }

  render() {
    let {count} = this.props
    return (
      <div>
        <h2>计数为{count}</h2>
        <select ref = {selectNumber=>{this.selectNumber = selectNumber}} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick ={this.increment}>+</button>&nbsp;
        <button onClick ={this.subduction}>-</button>&nbsp;
        <button onClick ={this.incrementIfOdd}>increment if odd </button>&nbsp;
        <button onClick ={this.subductionAsync}>increment async</button>&nbsp;
      </div>
    )
  }
} 
