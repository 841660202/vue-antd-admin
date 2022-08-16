<!--
 * @Author: wangrong 897100547@qq.com
 * @Date: 2022-07-28 14:16:24
 * @LastEditors: wangrong 897100547@qq.com
 * @LastEditTime: 2022-08-15 20:08:33
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis3\Analysis3.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="chart_wraper">
        <div class="statistic_box">
            <a-button type="primary" v-for="item in chartOptions" :key="item.type" style="margin: 0 10px 10px 0;" @click="type=item.type">{{item.title}}</a-button>
            <div class="content_box">
                <div class="statistic_content" v-show="type=='histogram' || type== ''">
                    <p>柱状图</p>
                    <div class="chartBox">
                        <histogram-chart
                            :title="histogramChartForm.title"
                            :data="histogramChartForm.data"
                            :extend="histogramChartForm.extend"
                            :settings="histogramChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='line' || type== ''">
                    <p>折线图</p>
                    <div class="chartBox">
                        <line-chart
                            :title="lineChartForm.title"
                            :data="lineChartForm.data"
                            :extend="lineChartForm.extend"
                            :settings="lineChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='pie' || type== ''">
                    <p>饼图</p>
                    <div class="chartBox">
                        <pie-chart
                            :title="pieChartForm.title"
                            :data="pieChartForm.data"
                            :extend="pieChartForm.extend"
                            :settings="pieChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='ring' || type== ''">
                    <p>环形图</p>
                    <div class="chartBox">
                        <ring-chart
                            :title="ringChartForm.title"
                            :data="ringChartForm.data"
                            :extend="ringChartForm.extend"
                            :settings="ringChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='radar' || type== ''">
                    <p>雷达图</p>
                    <div class="chartBox">
                        <radar-chart
                            :title="radarChartForm.title"
                            :data="radarChartForm.data"
                            :extend="radarChartForm.extend"
                            :settings="radarChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='bar' || type== ''">
                    <p>条线图</p>
                    <div class="chartBox">
                        <bar-chart
                            :title="barChartForm.title"
                            :data="barChartForm.data"
                            :extend="barChartForm.extend"
                            :settings="barChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='funnel' || type== ''">
                    <p>漏斗图</p>
                    <div class="chartBox">
                        <funnel-chart
                            :title="funnelChartForm.title"
                            :data="funnelChartForm.data"
                            :extend="funnelChartForm.extend"
                            :settings="funnelChartForm.settings"
                        />
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='waterfall' || type== ''">
                    <p>瀑布图</p>
                    <div class="chartBox">
                        <waterfall-chart
                            :title="waterfallChartForm.title"
                            :data="waterfallChartForm.data"
                            :extend="waterfallChartForm.extend"
                            :settings="waterfallChartForm.settings"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
     
</template>
 
 
<script>
import HistogramChart from '@/components/v-chart/components3/HistogramChart' // 柱状图
import LineChart from '@/components/v-chart/components3/LineChart' // 折线图
import PieChart from '@/components/v-chart/components3/PieChart' // 饼图
import RingChart from '@/components/v-chart/components3/RingChart' // 环形图
import RadarChart from '@/components/v-chart/components3/RadarChart' // 雷达图
import BarChart from '@/components/v-chart/components3/BarChart' // 条线图
import FunnelChart from '@/components/v-chart/components3/FunnelChart' // 漏斗图
import WaterfallChart from '@/components/v-chart/components3/WaterfallChart' // 瀑布图

// 类型集合
let chartOptions = [
    { title: '折线图', type: 'line'},
    { title: '柱状图', type: 'histogram'},
    { title: '条形图', type: 'bar'},
    { title: '饼图', type: 'pie'},
    { title: '环形图', type: 'ring'},
    { title: '雷达图', type: 'radar'},
    { title: '漏斗图', type: 'funnel'},
    { title: '瀑布图', type: 'waterfall'},
]

// 类型集合转换
const chartType = chartOptions.reduce((acc, cur) => {
  acc[cur.type] = cur.title
  return acc
}, {})

export default {
    components: { 
        HistogramChart, // 柱状图
        LineChart,  // 折线图
        PieChart,   // 饼图
        RingChart,  // 环形图
        RadarChart, // 雷达图
        BarChart,   // 条线图
        FunnelChart, // 漏斗图
        WaterfallChart // 瀑布图
    },
    filters: {
        // 图形
        chartTypeFilter(type) {
            return chartType[type]
        }
    },
    data() {
        return {
            chartOptions,
            type: '',
            histogramChartForm: {
                title: 'xxx柱状图',              // 图形名称
                settings: {
                    labelMap: {
                        date: '日期',
                        userCount: '访问用户',
                        userOrder: '下单用户',
                        userRate: '下单率'
                    }, 
                    // dimension: [],          // 横轴显示字段
                    // metrics: ['date'], // 纵轴显示字段
                    axisSite: { right: ['userRate']},  // 右边坐标轴显示什么字段
                    yAxisName: ['访问用户', '下单用户'], // 两侧坐标轴名称
                },
                data: {
                    columns: ['date', 'userCount', 'userOrder', 'userRate'],
                    rows: [
                        { 'date': '1/1', 'userCount': 1393, 'userOrder': 1093, 'userRate': 0.32 },
                        { 'date': '1/2', 'userCount': 3530, 'userOrder': 3230, 'userRate': 0.26 },
                        { 'date': '1/3', 'userCount': 2923, 'userOrder': 2623, 'userRate': 0.76 },
                        { 'date': '1/4', 'userCount': 1723, 'userOrder': 1423, 'userRate': 0.49 },
                        { 'date': '1/5', 'userCount': 3792, 'userOrder': 3492, 'userRate': 0.323 },
                        { 'date': '1/6', 'userCount': 4593, 'userOrder': 4293, 'userRate': 0.78 }
                    ] 
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 折线
            lineChartForm: {
                title: 'xxx折线图',              // 图形名称
                settings: {
                    labelMap: {
                        date: '日期',
                        userCount: '访问用户',
                        userOrder: '下单用户',
                        userRate: '下单率'
                    }, 
                    // dimension: [],          // 横轴显示字段
                    // metrics: ['date'], // 纵轴显示字段
                    axisSite: { right: ['userRate']},  // 右边坐标轴显示什么字段
                    yAxisName: ['访问用户', '下单用户'], // 两侧坐标轴名称
                },
                data: {
                    columns: ['date', 'userCount', 'userOrder', 'userRate'],
                    rows: [
                        { 'date': '1/1', 'userCount': 1393, 'userOrder': 1093, 'userRate': 0.32 },
                        { 'date': '1/2', 'userCount': 3530, 'userOrder': 3230, 'userRate': 0.26 },
                        { 'date': '1/3', 'userCount': 2923, 'userOrder': 2623, 'userRate': 0.76 },
                        { 'date': '1/4', 'userCount': 1723, 'userOrder': 1423, 'userRate': 0.49 },
                        { 'date': '1/5', 'userCount': 3792, 'userOrder': 3492, 'userRate': 0.323 },
                        { 'date': '1/6', 'userCount': 4593, 'userOrder': 4293, 'userRate': 0.78 }
                    ] 
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 饼图
            pieChartForm: {
                title: 'xxx饼图',              // 图形名称
                settings: {
                    labelMap: {                   
                        date: '日期',
                        ratio: '比例'
                    }
                },
                data: {
                    columns: [
                        "date",
                        "ratio"
                    ],
                    rows: [
                        {
                            "date": "2022-07-25",
                            "ratio": "15",
                        },
                        {
                            "date": "2022-07-26",
                            "ratio": "20"
                        },
                        {
                            "date": "2022-07-27",
                            "ratio": "5"
                        },
                        {
                            "date": "2022-07-28",
                            "ratio": "10"
                        },
                        {
                            "date": "2022-07-29",
                            "ratio": "12"
                        },
                        {
                            "date": "2022-07-30",
                            "ratio": "45"
                        }
                    ]
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 环形图
            ringChartForm: {
                title: 'xxx环形图',              // 图形名称
                settings: {
                    labelMap: {                   
                        date: '日期',
                        ratio: '比例'
                    }
                },
                data: {
                    columns: [
                        "date",
                        "ratio"
                    ],
                    rows: [
                        {
                            "date": "2022-07-25",
                            "ratio": "15",
                        },
                        {
                            "date": "2022-07-26",
                            "ratio": "20"
                        },
                        {
                            "date": "2022-07-27",
                            "ratio": "5"
                        },
                        {
                            "date": "2022-07-28",
                            "ratio": "10"
                        },
                        {
                            "date": "2022-07-29",
                            "ratio": "12"
                        },
                        {
                            "date": "2022-07-30",
                            "ratio": "45"
                        }
                    ]
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 雷达图
            radarChartForm: {
                title: 'xxx雷达图',              // 图形名称
                settings: {
                    labelMap: {                   
                        total: "总收益",
                        num1: "收益1",
                        num2: "收益2",
                        num3: "收益3",
                    },
                },
                data: {
                    columns: [
                        "date",
                        "num1",
                        "num2",
                        "num3",
                        "total",
                    ],
                    rows: [
                        {
                            date: "2022-07-25",
                            num1: 1393,
                            num2: 1093,
                            num3: 0.32,
                            total: 191,
                        },
                        {
                            date: "2022-07-26",
                            num1: 3530,
                            num2: 3230,
                            num3: 0.26,

                            total: 161,
                        },
                        {
                            date: "2022-07-27",
                            num1: 2923,
                            num2: 2623,
                            num3: 0.76,
                            total: 131,
                        },
                        {
                            date: "2022-07-28",
                            num1: 1723,
                            num2: 1423,
                            num3: 0.49,
                            total: 131,
                        },
                        {
                            date: "2022-07-29",
                            num1: 3792,
                            num2: 3492,
                            num3: 0.323,
                            total: 321,
                        },
                        {
                            date: "2022-07-30",
                            num1: 4593,
                            num2: 4293,
                            num3: 0.78,
                            total: 221,
                        }
                    ]
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 条形图
            barChartForm: {
                title: 'xxx条线图',              // 图形名称
                settings: {
                    labelMap: {
                        percentage: '比例'
                    }, 
                    // dimension: ["talkDuration"], 
                    // metrics: ["percentage"], 
                    dataOrder: {   //按照由大到小进行排序
                        label: "percentage",
                        order: "desc",
                    },
                },
                data: {
                    columns: [
                        "talkDuration",
                        "percentage"
                    ],
                    rows: [
                        { 'talkDuration': '1.广东', 'percentage': 20 },
                        { 'talkDuration': '2.北京', 'percentage': 20 },
                        { 'talkDuration': '3.上海', 'percentage': 18 },
                        { 'talkDuration': '4.江苏', 'percentage': 8 },
                        { 'talkDuration': '5.浙江', 'percentage': 6 },
                        { 'talkDuration': '6.山东', 'percentage': 4 }
                    ]
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 漏斗图
            funnelChartForm: {
                title: 'xxx漏斗图',              // 图形名称
                settings: {
                    labelMap: {
                        percentage: '比例'
                    }, 
                    // dimension: ["talkDuration"], 
                    // metrics: ["percentage"], 
                    dataOrder: {   //按照由大到小进行排序
                        label: "percentage",
                        order: "desc",
                    },
                },
                data: {
                    columns: [
                        "talkDuration",
                        "percentage"
                    ],
                    rows: [
                        { 'talkDuration': '1.广东', 'percentage': 20 },
                        { 'talkDuration': '2.北京', 'percentage': 20 },
                        { 'talkDuration': '3.上海', 'percentage': 18 },
                        { 'talkDuration': '4.江苏', 'percentage': 8 },
                        { 'talkDuration': '5.浙江', 'percentage': 6 },
                        { 'talkDuration': '6.山东', 'percentage': 4 }
                    ]
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            },
            // 瀑布图
            waterfallChartForm: {
                title: 'xxx瀑布图',              // 图形名称
                settings: {
                    labelMap: {                   
                        date: '日期',
                        money: '金额',
                        num: '数量'
                    },
                },
                data: {
                    columns: [
                        "date",
                        "money",
                        "num"
                    ],
                    rows: [
                        {
                            "date": "2022-07-25",
                            "money": "120000",
                            "num": 1000
                        },
                        {
                            "date": "2022-07-26",
                            "money": "150000",
                            "num": 3000
                        },
                        {
                            "date": "2022-07-27",
                            "money": "4000000",
                            "num": 8000
                        },
                        {
                            "date": "2022-07-28",
                            "money": "2300000",
                            "num": 40000
                        },
                        {
                            "date": "2022-07-29",
                            "money": "100000",
                            "num": 3000
                        },
                        {
                            "date": "2022-07-30",
                            "money": "3000000",
                            "num": 800
                        }
                    ]
      
                },
                extend: {
                    // legend: {
                    //     show: true, 
                    //     x: 'top', 
                    //     y: 20, 
                    //     itemGap: 20, 
                    //     orient: 'horizontal', 
                    //     align:'left'
                    // }
                }
            }
        }
    }
 }
</script>
<style lang='less' scoped>
.chart_wraper {
    background: #fff;
}
.statistic_box {
  width: 100%;
  padding: 20px;
  .content_box {
    .sort_title {
      display: flex;
      margin-bottom: 10px;
      span{
        margin-left: 10px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #444657;
      }
    }
    .statistic_content {
      border: 1px solid #ebedf2;
      margin-bottom: 10px;
      .chartBox {
          width: 78%;
      }
      p {
        margin: 0px;
        padding: 15px 0 15px 20px;
        border-bottom: 1px solid #ebedf2;
        background-color: #f9f9fc;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #444657;
        &::before {
          content: "";
          margin-top: 3px;
          float: left;
          width: 6px;
          height: 16px;
          background-color: #409EFF;
          border-radius: 4px;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>