import React, {Component} from 'react'
export default class App extends Component {
  state= {
    count:0
  }

  //加法
  increment =() => {
    let {value}  = this.selectNumber
    let {count} = this.state
    this.setState({count:count+value*1})
  } 
  //减法
  subduction = () => {
    let {value}  = this.selectNumber
    let {count} = this.state
    this.setState({count:count-value*1})
  }
  //为奇数时，可以加
  incrementIfOdd = () => {
    let {value}  = this.selectNumber
    let {count} = this.state

    if (count%2 === 1){
      this.setState({count:count+value*1})
    }
    if (count%2 === -1){
      this.setState({count:count+value*1})
    }
  }
  subductionAsync = () => {
    let {value}  = this.selectNumber
    let {count} = this.state
    setTimeout(() => {
      this.setState({count:count-value*1})
    }, 1000);
  }

  render() {
    let {count} = this.state
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
