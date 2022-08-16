<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-08-15 21:48:58
 * @LastEditors: wangrong 897100547@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div class="chart_wraper">
        <div class="statistic_box">
            <div class="content_box">
                <div class="statistic_content">
                    <p>{{type | chartTypeFilter}}</p>
                    <div class="chartBox">
                        <!-- 柱状图 -->
                        <histogram-chart 
                            v-if="type=='histogram'" 
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 折线图 -->
                        <line-chart 
                            v-if="type=='line'" 
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 饼图 -->
                        <pie-chart 
                            v-if="type=='pie'" 
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 环形图 -->
                        <ring-chart 
                            v-if="type=='ring'"
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 雷达图 -->
                        <radar-chart 
                            v-if="type=='radar'"
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 条线图 -->
                        <bar-chart 
                            v-if="type=='bar'"
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 漏斗图 -->
                        <funnel-chart 
                            v-if="type=='funnel'" 
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
                        />
                        <!-- 瀑布图 -->
                        <waterfall-chart 
                            v-if="type=='waterfall'" 
                            :title="chartConfig.title"
                            :data="chartConfig.data"
                            :extend="chartConfig.extend"
                            :settings="chartConfig.settings"
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
    props: {
        chartConfig: Object,  //组装数据
        type:{              //图的类型
            type: String,
            default: 'line' 
        },
        width: {
            type: String,
            default: '50%'
        }
    },
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
    data(){
        return{
            chartOptions
        }
    },
    created () {
        console.log(this.type,'type')
    }
}
</script>
<style lang='less' scoped>
.chart_wraper {
    background: #fff;
    .form{
        .form-row{
        margin: 0 8px
        }
        .ant-col-md-12,
        .ant-col-sm-24,
        .ant-col-lg-6,
        .ant-col-lg-8,
        .ant-col-lg-10,
        .ant-col-xl-8,
        .ant-col-xl-6{
        padding: 0 8px
        }
    }
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

