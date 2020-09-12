import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react';
export default class Line extends Component{
    getOption = () =>{
        return {
            title: {
                text: '浏览器占比变化',
                subtext: '纯属虚构',
                top: 10,
                left: 10
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(250,250,250,1)'
            },
            legend: {
                type: 'scroll',
                bottom:10,
                data: (function (){
                    var list = [];
                    for (var i = 1; i <=28; i++) {
                        list.push(i + 2000 + '');
                    }
                    return list;
                })()
            },
            visualMap: {
                top: 'middle',
                right: 10,
                color: ['green', 'blue','yellow'],
                calculable: true
            },
            radar: {
                indicator: [
                    { text: 'IE8-', max: 400},
                    { text: 'IE9+', max: 400},
                    { text: 'Safari', max: 400},
                    { text: 'Firefox', max: 400},
                    { text: 'Chrome', max: 400}
                ]
            },
            series: (function (){
                var series = [];
                for (var i = 1; i <= 28; i++) {
                    series.push({
                        name: '浏览器（数据纯属虚构）',
                        type: 'radar',
                        symbol: 'none',
                        lineStyle: {
                            width: 1
                        },
                        emphasis: {
                            areaStyle: {
                                color: 'rgba(250,250,250,0.6)'
                            }
                        },
                        data: [{
                            value: [
                                (40 - i) * 10,
                                (38 - i) * 4 + 60,
                                i * 5 + 10,
                                i * 9,
                                i * i /2
                            ],
                            name: i + 2000 + ''
                        }]
                    });
                }
                return series;
            })()
        };
    }
    render(){
       return (
           <div>
              <ReactEcharts option={this.getOption()} style = {{height:570}} />
           </div>
       )
   }
}