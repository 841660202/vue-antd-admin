<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-07-25 09:45:08
 * @LastEditors: wangrong 897100547@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div class="chart_wraper">
        <!-- <a-form :form="form" class="form">
            <a-row class="form-row">
                <a-col :lg="6" :md="12" :sm="24">
                    <a-form-item label="请选择图形">
                        <a-select
                            placeholder="请选择"
                            v-model="form.chartType"
                        >
                            <a-select-option value="1">柱状图</a-select-option>
                            <a-select-option value="2">横向柱状图</a-select-option>
                            <a-select-option value="3">折线图</a-select-option>
                            <a-select-option value="4">饼图</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form> -->
        <div class="statistic_box">
            <div class="content_box">
                <div class="statistic_content">
                    <p>{{type | chartTypeFilter}}</p>
                    <div class="chartBox">
                        <!-- 柱状图 -->
                        <ve-histogram
                            v-show="type=='histogram'"
                            :data="chartData"
                            style="width:100%;"
                        />
                        <!-- 横向柱状图 -->
                        <ve-bar
                            v-show="type=='bar'"
                            :data="chartData"
                        />
                        <!-- 折线图  -->
                        <ve-line
                            v-show="type=='line'"
                            :data="chartData"
                        />
                        <!-- 饼图 -->
                        <ve-pie
                            v-show="type=='pie'"
                            :data="chartData"
                        />
                    </div>
                </div>
            </div>
        </div>
        <span>----------------------</span>
        <div class="statistic_box">
            <div class="content_box">
                <!-- <a-row :gutter="[24, 24]">
                    <a-col :sm="12" :md="12" :xl="12"> -->
                        <div class="statistic_content">
                            <p>柱状图</p>
                            <div class="chartBox">
                            <ve-histogram
                                :data="chartData"
                                style="width:100%;"
                            />
                            </div>
                        </div>
                    <!-- </a-col>
                    <a-col :sm="12" :md="12" :xl="12"> -->
                        <div class="statistic_content">
                            <p>横向柱状图</p>
                            <div class="chartBox">
                            <ve-bar
                                :data="chartData">
                            </ve-bar>
                            </div>
                        </div>
                    <!-- </a-col>
                </a-row>
                <a-row :gutter="[24, 24]">
                    <a-col :sm="12" :md="12" :xl="12"> -->
                        <div class="statistic_content">
                            <p>折线图</p>
                            <div class="chartBox">
                            <ve-line
                                :data="chartData"
                            />
                            </div>
                        </div>
                    <!-- </a-col>
                    <a-col :sm="12" :md="12" :xl="12"> -->
                        <div class="statistic_content">
                            <p>饼图</p>
                            <div class="chartBox">
                            <ve-pie
                                :data="chartData"
                            />
                            </div>
                        </div>
                    <!-- </a-col>
                </a-row> -->
                <div class="statistic_content">
                    <p>环图</p>
                    <div class="chartBox">
                    <ve-ring
                        :data="chartData"
                    />
                    </div>
                </div>
                
                <div class="statistic_content">
                    <p>瀑布图</p>
                    <div class="chartBox">
                    <ve-waterfall
                        :data="chartData"
                    />
                    </div>
                </div>
                <div class="statistic_content">
                    <p>金字塔图</p>
                    <div class="chartBox">
                    <ve-funnel
                        :data="chartData"
                    />
                    </div>
                </div>
                <div class="statistic_content">
                    <p>雷达图</p>
                    <div class="chartBox">
                    <ve-radar
                        :data="chartData"
                    />
                    </div>
                </div>
                <div class="statistic_content">
                    <p>散点图</p>
                    <div class="chartBox">
                    <ve-scatter
                        :data="chartData"
                    />
                    </div>
                </div>
                <div class="statistic_content">
                    <p>仪表盘</p>
                    <div class="chartBox">
                    <ve-gauge
                        :data="chartData"
                    />
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
import VeLine from 'v-charts/lib/line'//折线
import VeHistogram from 'v-charts/lib/histogram'//柱状
import VeBar from 'v-charts/lib/bar'//横-柱状
import VePie from 'v-charts/lib/pie'//圆状
import VeRing from 'v-charts/lib/ring'//环状
import VeWaterfall from 'v-charts/lib/waterfall'//瀑布
import VeFunnel from 'v-charts/lib/funnel'//金字塔
import VeRadar from 'v-charts/lib/radar'//雷达
import VeScatter from 'v-charts/lib/scatter'//散点图
import VeGauge from 'v-charts/lib/gauge'//散点图

// import VeLine from 'v-charts/lib/line.common'
// 类型集合
let chartOptions = [
    { title: '折线图', type: 'line'},
    { title: '柱状图', type: 'histogram'},
    { title: '横向柱状图', type: 'bar'},
    { title: '饼图', type: 'pie'},
]

// 类型集合转换
const chartType = chartOptions.reduce((acc, cur) => {
  acc[cur.type] = cur.title
  return acc
}, {})

export default {
    props: {
        chartData: Object,  //组装数据
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
        VeLine,
        VeHistogram,
        VeBar,
        VePie,
        VeRing,
        VeWaterfall,
        VeFunnel,
        VeRadar,
        VeScatter,
        VeGauge
    },
    filters: {
        // 图形
        chartTypeFilter(type) {
            return chartType[type]
        }
    },
    data(){
        return{
            form: {
                chartType: ''
            },
            chartOptions,
            // VeLineList:[
            //     { '日期': '1月1日', '销售量': 1123, '访问量':999},
            //     { '日期': '1月2日', '销售量': 1223, '访问量':456},
            //     { '日期': '1月3日', '销售量': 2123, '访问量':6454},
            //     { '日期': '1月4日', '销售量': 4123, '访问量':4444},
            //     { '日期': '1月5日', '销售量': 3123, '访问量':1231},
            //     { '日期': '1月6日', '销售量': 7123, '访问量':33312}
            // ],
            // columnsList:['日期', '销售量', '访问量'],
            // // chartData: []
        }
    },
    created () {
        // this.chartData = {
        //     columns: this.columnsList,
        //     rows: this.VeLineList
        // }
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

