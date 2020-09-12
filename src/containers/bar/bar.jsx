import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {
    state  = {
        salves:[5, 20, 36, 10, 10, 20],
        inventory: [15, 30, 46, 20, 20, 40]

    }
    updata = () => {
        let {salves,inventory} = this.state
        salves =  salves.map(item => item+1  )
        inventory = inventory.map(item => item-1)
        this.setState({salves,inventory})

    }
    getOption = () => {
        let {salves,inventory} = this.state
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量,库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: salves
                },
                {
                    name : '库存',
                    type : 'bar',
                    data :inventory
                }
            ]
        };
    }
    render() {
        return (
            <div>
                <Card 
                    title='柱状图'
                    extra = {<Button type  = 'primary' onClick = {this.updata}>更新</Button>}  >
                    <ReactEcharts option={this.getOption()} style={{height: 300}} />
                </Card>
            </div>
        )
    }
}