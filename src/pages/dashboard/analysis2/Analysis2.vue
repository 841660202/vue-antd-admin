<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-07-28 10:56:46
 * @LastEditors: wangrong 897100547@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div class="chart_wraper">、
        <div class="statistic_box">
            <a-button type="primary" v-for="item in chartOptions" :key="item.type" style="margin: 0 10px 10px 0;" @click="type=item.type">{{item.title}}</a-button>
            <div class="content_box">
                <div class="statistic_content" v-show="type=='histogram' || type== ''">
                    <p>柱状图</p>
                    <div class="chartBox">
                        <ChartVeHistogram :chart-config="histogramConfig"/>
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='line' || type== ''">
                    <p>折线图</p>
                    <div class="chartBox">
                        <ChartVeLine :chart-config="lineConfig"/>
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='pie' || type== ''">
                    <p>饼图</p>
                    <div class="chartBox">
                        <ChartVePie :chart-config="pieConfig"/>
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='ring' || type== ''"> 
                    <p>环形图</p>
                    <div class="chartBox">
                        <ChartVeRing :chart-config="ringConfig"/>
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='radar' || type== ''">
                    <p>雷达图</p>
                    <div class="chartBox">
                        <ChartVeRadar :chart-config="radarConfig"/>
                    </div>
                </div>
                <div class="statistic_content" v-show="type=='bar' || type== ''">
                    <p>条线图</p>
                    <div class="chartBox">
                        <ChartVeBar :chart-config="barConfig"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'echarts/lib/component/title'; //必须引入这个组件，默认不带title
import 'echarts/lib/component/toolbox'; // 必须引入这个组件，下载按钮
import ChartVeHistogram from '@/components/v-chart/components/chartVeHistogram' // 柱状图
import ChartVeLine from '@/components/v-chart/components/chartVeLine'           // 折线图
import ChartVePie from '@/components/v-chart/components/chartVePie'           // 饼图
import ChartVeRing from '@/components/v-chart/components/chartVeRing'           // 环形图
import ChartVeRadar from '@/components/v-chart/components/chartVeRadar'           // 雷达图
import ChartVeBar from '@/components/v-chart/components/chartVeBar'           // 条形图

// 类型集合
let chartOptions = [
    { title: '折线图', type: 'line'},
    { title: '柱状图', type: 'histogram'},
    { title: '条形图', type: 'bar'},
    { title: '饼图', type: 'pie'},
    { title: '环形图', type: 'ring'},
    { title: '雷达图', type: 'radar'},
]

// 类型集合转换
const chartType = chartOptions.reduce((acc, cur) => {
  acc[cur.type] = cur.title
  return acc
}, {})

// histogram-mock
const dataSourceHistogram = {
      title: 'xxx柱状图',              // 图形名称
      dimension: ['money', 'num'],          // 横轴显示字段
    //   metrics: ['date'], // 纵轴显示字段
      axisSite: { right: ['num']},  // 右边坐标轴显示什么字段
      yAxisName: ['金额', '订单量'], // 两侧坐标轴名称
      labelMap: {                   
        date: '日期',
        money: '金额',
        num: '数量'
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
      }
}

// line-mock
const dataSourceLine = {
      title: 'xxx折线图',              // 图形名称
      dimension: ['num','num1','num2'],          // 横轴显示字段
    //   metrics: ['date'], // 纵轴显示字段
      axisSite: { right: ['num']},  // 右边坐标轴显示什么字段
      yAxisName: ['订单量'], // 两侧坐标轴名称
      labelMap: {                   
        date: '日期',
        num: '数量'
      },
      data: {
        columns: [
            "date",
            "num",
            'num1',
            'num2'
        ],
        rows: [
            {
                "date": "2022-07-25",
                "num": 1000,
                "num1": 3000,
                "num2": 7000
            },
            {
                "date": "2022-07-26",
                "num": 300,
                "num1": 5000,
                "num2": 1200
            },
            {
                "date": "2022-07-27",
                "num": 500,
                "num1": 7000,
                "num2": 2500
            },
            {
                "date": "2022-07-28",
                "num": 1000,
                "num1": 4600,
                "num2": 9000
            },
            {
                "date": "2022-07-29",
                "num": 6000,
                "num1": 6500,
                "num2": 2000
            },
            {
                "date": "2022-07-30",
                "num": 300,
                "num1": 2200,
                "num2": 5000
            }
        ]
      }
}

// pie-mock
const dataSourcePie = {
      title: 'xxx饼图',              // 图形名称
    //   dimension: ['money', 'num'],          // 横轴显示字段
    // //   metrics: ['date'], // 纵轴显示字段
    //   axisSite: { right: ['num']},  // 右边坐标轴显示什么字段
    //   yAxisName: ['金额', '订单量'], // 两侧坐标轴名称
      labelMap: {                   
        date: '日期',
        ratio: '比例'
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
      }
}

// ring-mock
const dataSourceRing = {
      title: 'xxx环形图',              // 图形名称
    //   dimension: ['money', 'num'],          // 横轴显示字段
    // //   metrics: ['date'], // 纵轴显示字段
    //   axisSite: { right: ['num']},  // 右边坐标轴显示什么字段
    //   yAxisName: ['金额', '订单量'], // 两侧坐标轴名称
      labelMap: {                   
        date: '日期',
        ratio: '比例'
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
      }
}

// radar-mock
const dataSourceRadar = {
      title: 'xxx雷达图',          
      labelMap: {                   
        total: "总收益",
        num1: "收益1",
        num2: "收益2",
        num3: "收益3",
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
      }
}

// bar-mock
const dataSourceBar = {
      title: 'xxx条线图',              // 图形名称
      dimension: ["talkDuration"], 
      metrics: ["percentage"], 
      dataOrder: {   //按照由大到小进行排序
        label: "percentage",
        order: "desc",
      },
      labelMap: {                   
        // talkDuration: '日期',
        // money: '金额',
        // num: '数量'
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
      }
}

export default {
    components: { 
        ChartVeHistogram, // 柱状图
        ChartVeLine,      // 折线图
        ChartVePie,       // 饼图
        ChartVeRing,      // 环形图
        ChartVeRadar,      // 雷达图
        ChartVeBar         // 条线图
    },
    filters: {
        // 图形
        chartTypeFilter(type) {
            return chartType[type]
        }
    },
    data(){
        return{
            chartOptions,
            type: '',
            dataSourceHistogram,   //mock-histogram
            dataSourceLine,   //mock-line
            dataSourcePie,//mock-pie
            dataSourceRing,   //mock-ring
            dataSourceRadar, //mock-radar
            dataSourceBar, //mock-bar
            histogramConfig: {
                title: '',
                labelMap: {},
                dimension: ['date'],
                metrics: ['money', 'num'],
                data: {}
            },
            lineConfig: {
                title: '',
                labelMap: {},
                dimension: ['date'],
                metrics: ['money', 'num'],
                data: {}
            },
            pieConfig: {
                title: '',
                labelMap: {},
                // dimension: ['date'],
                // metrics: ['ratio'],
                data: {}
            },
            ringConfig: {
                title: '',
                labelMap: {},
                // dimension: ['date'],
                // metrics: ['ratio'],
                data: {}
            },
            radarConfig: {
                title: '',
                labelMap: {},
                // dimension: ['date'],
                // metrics: ['ratio'],
                data: {}
            },
            barConfig: {
                title: '',
                labelMap: {},
                // dimension: ['date'],
                // metrics: ['ratio'],
                data: {}
            },

        }
    },
    created () {
    },
    mounted() {
        // this.lineConfig.chartData = [
        //     { label: '1月1日', value1: 1393, value2: 193 },
        //     { label: '1月2日', value1: 3530, value2: 230 },
        //     { label: '1月3日', value1: 2923, value2: 262 },
        //     { label: '1月4日', value1: 1723, value2: 423 },
        //     { label: '1月5日', value1: 3792, value2: 92 },
        //     { label: '1月6日', value1: 4593, value2: 293 }
        // ];
        // 柱状图
        this.histogramConfig = {...this.dataSourceHistogram}
        // 折线图
        this.lineConfig = {...this.dataSourceLine}
        // 饼图
        this.pieConfig = {...this.dataSourcePie}
        // 环形图
        this.ringConfig = {...this.dataSourceRing}
        // 雷达图
        this.radarConfig = {...this.dataSourceRadar}
        // 条线图
        this.barConfig = {...this.dataSourceBar}
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

