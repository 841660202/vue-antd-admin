<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-07-27 18:07:24
 * @LastEditors: wangrong 897100547@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div>
        <!-- 条线图 -->
        <ve-bar
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
import VeBar from 'v-charts/lib/bar'//柱状

export default {
  components: { 
    VeBar
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
          // yAxis: {
          //   minInterval: 1,
          //   nameTextStyle: {
          //     align: 'left'
          //   }
          // },
          "yAxis.0.splitLine.show": false, // y轴表格线不显示
          "xAxis.0.splitLine.show": false, // x轴标签不显示
          "xAxis.0.axisLabel.show": false, // x轴标签不显示
          yAxis: {
            axisLabel: {
              textStyle: {
                color: "#9B9B9B", // y轴字体颜色
                padding: [3, 15, 5, 6], // 上右下左
              },
            },
          },
          // 每个柱子
          series(v) {
            // console.log("v", v);
            // 设置柱子的样式
            v.forEach((i) => {
              i.barWidth = 45;  //柱子高度
            });
            return v;
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
          dataOrder: this.chartConfig.dataOrder,
          itemStyle: {
             normal: {   //这里没有使用百分数的单位，所以%是自己加上去的
              label: { show: true, position: "right", formatter: "{c}%" },
            }
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
        chartEmpty: false,
        selectedDepIndex: 0,  //鼠标点击选中的数据项，默认是第一个（0项）
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

