<template>
    <div>
        <!-- 条线图 -->
        <ve-bar
            :data="data"
            :colors="colors"
            :settings="settingsAs"
            :grid="gridAs"
            :title="{text: title}"
            :extend="extendAs"
            :toolbox="toolboxAs"
            :mark-line="markLineAs"
            :height="height"
            v-bind="$attrs"
        >
            <slot />
        </ve-bar>
    </div>
</template>
<script>
import 'echarts/lib/component/title'; //必须引入这个组件，默认不带title
import 'echarts/lib/component/toolbox'; // 必须引入这个组件，下载按钮
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/markLine'
import 'v-charts/lib/style.css'
import VeBar from 'v-charts/lib/bar'//条线图
 
export default {
  name: 'BarChart',
  components: {
    VeBar
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    },
    colors: {
      type: Array,
      // default: () => ['#01A1AC', '#739AFF', '#61a0a8', '#d48265', '#91c7ae']
    },
    title: {
      type: String,
      default: ''
    },
    extend: {
      type: Object,
      default: () => ({})
    },
    settings: {
      type: Object,
      default: () => ({})
    },
    grid: {
      type: Object,
      default: () => ({})
    },
    markLine: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: String,
      default: '350px'
    },
    toolbox: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      options: Object.freeze({
        grid: {
          show: true,
          top: '15%',
          bottom: 20,
          left: '5%',
          right: '6%',
          containLabel: true,
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        },
        // dataZoom: [{
        //   show: true,
        //   type: 'slider',
        //   realtime: true,
        //   start: 0,
        //   end: 0
        // }],
        // markLine: {
        //   symbol: 'none',
        //   precision: 2, // 标线数值的精度
        //   label: {
        //     show: true,
        //     position: 'start',
        //     // fontWeight: 'bold',
        //     fontSize: 14,
        //     formatter: ({ value }) => (value * 100).toFixed(2) + '%'
        //   },
        //   lineStyle: {
        //     color: '#1e90ff'
        //   },
        //   data: [
        //     // {
        //     //   type: 'average',
        //     //   name: '平均值'
        //     // }
        //   ]
        // },
        // title: {
        //   show: false,
        //   text: 'xxxx',
        //   subtext: '',
        //   x: 'left',
        //   top: 20,
        //   textStyle: {
        //     color: '#666',
        //     fontSize: 16
        //   }
        // },
        extend: {
          title: {  // 图形主标题配置
            x: 'middle',
            y: 'top',
            textAlign: 'center'
          },
          legend: {
            // show: false,
            // x: 'center',
            // y: 'bottom',
            // orient: 'horizontal'
            top: '8%',
            // orient: 'vertical',  // x轴的显示方式
            // left: 'right',
            selectedMode: false
          },
          xAxis: {
            // name: '', // 坐标轴名称。
            // nameLocation: 'end', // 坐标轴名称显示位置。
            // axisLabel: {// 坐标轴刻度标签的相关设置。
            //   interval: 0,
            //   rotate: 0
            // },
            // axisLine: { // 设置轴线的属性
            //   show: false,
            //   lineStyle: {
            //     color: '#000',
            //     width: 1
            //   }
            // }
            nameGap: 10
          },
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
          // series(v) {
          //   // console.log("v", v);
          //   // 设置柱子的样式
          //   v.forEach((i) => {
          //     i.barWidth = 45;  //柱子高度
          //   });
          //   return v;
          // },
          // series: {
          //   barGap: '40%',
          //   barCategoryGap: '40%',
          //   barMaxWidth: 20
          // },

        //   animationEasing: 'elasticOut',
        //   animationDelayUpdate: idx => idx * 5,
        //   series(v) {
        //     v && v.forEach(i => {
        //       i.barGap = '40%'
        //       i.barCategoryGap = '40%'
        //       i.barMaxWidth = 20
        //       i.animationDelay = idx => idx * 10 + 100
        //     })
        //     return v
        //   },
          tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //   type: 'line'
            // }
          }
        },
        settings: {
          yAxisType: ['normal'],
          yAxisName: [],
          label: { // 设置图形上的文本标签样式
            show: true,
            // position: 'top',
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            formatter: '{c}%'
          },
          labelMap: {}, // 设置指标的别名，同时作用于提示框和图例
          legendName: {} // 设置图表上方图例的别名
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
      })
    }
  },
  computed: {
    extendAs() {
      return Object.assign({}, this.options.extend, this.extend)
    },
    // dataRoomAs() {
    //   return Object.assign({}, this.options.dataZoom, this.dataZoom)
    // },
    markLineAs() {
      return Object.assign({}, this.options.markLine, this.markLine)
    },
    settingsAs() {
      return Object.assign({}, this.options.settings, this.settings)
    },
    gridAs() {
      return Object.assign({}, this.options.grid, this.grid)
    },
    toolboxAs() {
        console.log(Object.assign({}, this.options.toolbox, this.toolbox),'Object.assign({}, this.options.toolbox, this.toolbox)')
      return Object.assign({}, this.options.toolbox, this.toolbox)
    },
  }
}
</script>