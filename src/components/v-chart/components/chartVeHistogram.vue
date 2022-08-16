<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-07-27 15:04:37
 * @LastEditors: wangrong 897100547@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div>
        <!-- 柱状图 -->
        <ve-histogram
            ref="chartObj"
            :data="chartObj.chartData"
            :settings="chartObj.chartSettings"
            :title="{ text: chartConfig.title}"
            :loading="chartObj.chartDataLoading"
            :data-empty="chartObj.chartEmpty"
            :mark-point="chartObj.chartMarkPoint"
            :extend="chartObj.extend"
            :toolbox="chartObj.toolbox"
            :height="chartConfig.height"
        />
    </div>
    
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram'//柱状

export default {
  components: { 
    VeHistogram
  },
  props: {
    chartConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      chartObj: {
        extend: {
          title: {  // 图形主标题配置
            x: 'middle',
            y: 'top',
            textAlign: 'center'
          },
          legend: {
            top: '8%',
            selectedMode: false
          },
          xAxis: {
            nameGap: 10
          },
          yAxis: {
            minInterval: 1,
            nameTextStyle: {
              align: 'left'
            }
          },
          series (arr) {  // 柱状、折线混合图配置
            arr.forEach((item, index) => {
              if (index === 1) {
                item.type = 'line';
              }
              item.barWidth = 10
            })
            return arr;
          },
          toolbox: { //配置显示折线图/柱状图切换按钮以及另存为图片按钮。
            show: true,  //是否显示
            feature: {
              dataView: { //数据视图
                show: true
              },
              restore: { //重置
                show: true
              },
              dataZoom: { //数据缩放视图
                show: true
              },
              saveAsImage: {//保存图片
                show: true
              },
              magicType: {//动态类型切换
                type: ['bar', 'line']
              }
            }
          }
        },
        chartSettings: {
          labelMap: {},     // 坐标对应中文显示
        //   dimension: [],    // 横轴坐标显示 定义指标名称，也就是以chartData里面的'日期'为key来取数据
        //   metrics: [],      // 纵抽坐标显示 定维度名称，以chartData里面的'金额，数量'为key来取数据
          axisSite: {},     // 右边纵坐标显示刻度
          yAxisName: [],    // 纵左边显示名称
          itemStyle: {
                // normal: {   //这个是显示在每条柱子上的数字
                //     label: { show: true, position: "top", formatter: "{c}%" },
                // }
          }
        },
        
        chartData: {
          columns: [], //第一个元素表示维度，第二个元素以及以后的种种元素都表示指标，后面有几个元素就会在统计图上显示几条柱，这里其实可以省略，因为metrics和dimension已经配置过来
          rows: []
        },
        chartMarkPoint: {
          data: [{ name: '最大值', type: 'max' }, { name: '最大值', type: 'min' }]
        },
        chartDataLoading: true,
        chartEmpty: false
      }
    };
  },
  watch: {
    chartConfig: {
      immediate: true,
      deep: true,
      handler() {
        this.initChart();
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartObj.chartDataLoading = true;
      this.chartObj.chartEmpty = false;
      console.log(this.chartConfig,'this.chartConfig.data')
      if (this.chartConfig) {
        this.chartObj.chartData = this.chartConfig.data;    // 数据展示 
        this.chartObj.chartSettings.labelMap = this.chartConfig.labelMap // 配置展示
        this.chartObj.chartSettings.axisSite = this.chartConfig.axisSite // 右边展示
        this.chartObj.chartSettings.yAxisName = this.chartConfig.yAxisName // 坐标轴上方名称
        this.chartObj.chartDataLoading = false;
      } else {
        this.chartObj.chartData = {};
        this.chartObj.chartSettings.labelMap = {};
        this.chartObj.chartDataLoading = false;
        this.chartObj.chartEmpty = true;
      }
    }
  }
};
</script>

