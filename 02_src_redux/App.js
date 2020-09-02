import React, {Component} from 'react'
import {createIncrement,createSubduction} from './redux/action_creators'
export default class App extends Component {
  
 /*
    store中的API
    dispatch: ƒ dispatch(action)
    getState: ƒ getState()
    replaceReducer: ƒ replaceReducer(nextReducer)
    subscribe: ƒ subscribe(listener)
    Symbol(observable): ƒ observable()
  */

  //加法
  increment =() => {
    let {value}  = this.selectNumber
    //dispatch传入一个action-creatores对象，该对象接受获取到的value作为参数
    this.props.store.dispatch(createIncrement(value))
  } 
  //减法
  subduction = () => {
    let {value}  = this.selectNumber
    this.props.store.dispatch(createSubduction(value))
  }
  //为奇数时，可以加
  incrementIfOdd = () => {
    let {value}  = this.selectNumber
    //获取状态中的值
    let count =  this.props.store.getState()
    if (count%2 === 1){
      this.props.store.dispatch(createIncrement(value))
    }
    if (count%2 === -1){
      this.props.store.dispatch(createIncrement(value))
    }
  }
  subductionAsync = () => {
    let {value}  = this.selectNumber
    setTimeout(() => {
      this.props.store.dispatch(createIncrement(value))
    }, 1000);
  }

  render() {
    let count = this.props.store.getState()
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
