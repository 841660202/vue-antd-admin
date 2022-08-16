<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-07-27 16:47:18
 * @LastEditors: wangrong 897100547@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div>
        <ve-ring
            ref="chartObj"
            :tooltip-visible="false"
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
import VeRing from 'v-charts/lib/ring'//环形

export default {
  components: { 
    VeRing
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
          // orient: 'vertical',   // 图例布局朝向
          // left: 'left',         // 是否左对齐
          // top: 100,             //距离顶部的距离
          // itemGap: 15,         //图例标题间距
          // textStyle: {				//修改图表标题的颜色
          //   color: 'white',
          //   fontSize: 15
          // }
          title: {  // 图形主标题配置
            x: 'middle',
            y: 'top',
            textAlign: 'center'
          },
          legend: {
            // top: '8%',
            // textStyle: {   // 上面columns文本颜色与size设置
            //   color: 'red',
            //   fontSize: 18
            // },
            bottom: '10%',
            orient: 'vertical',  // x轴的显示方式
            left: 'right',
            selectedMode: false
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
              }
            }
          }
        },
        chartSettings: {
          labelMap: {},     // 坐标对应中文显示
          // dimension: [],    // 横轴坐标显示 定义指标名称，也就是以chartData里面的'日期'为key来取数据
          // metrics: [],      // 纵抽坐标显示 定维度名称，以chartData里面的'金额，数量'为key来取数据
          label: {
            // show: true,
            formatter: '{c}%'
          },
          // dataType: 'percent',
          // label: {
          //     show: true,
          //     position: 'outside',
          //     formatter: '{c}%',  //  展示如果需要％
          // },
          // offsetY: 150    // 组件向y轴偏移距离
        },
        chartData: {
          columns: [],
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
        // this.chartObj.chartSettings.dimension = this.chartConfig.dimension // 右边展示
        // this.chartObj.chartSettings.metrics = this.chartConfig.metrics // 坐标轴上方名称
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

<style lang="less" scoped>
</style>