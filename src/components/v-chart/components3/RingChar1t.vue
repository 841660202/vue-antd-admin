<template>
    <div>
        <!-- 环形 -->
        <ve-ring
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
        </ve-ring>
    </div>
</template>
<script>
import 'echarts/lib/component/title'; //必须引入这个组件，默认不带title
import 'echarts/lib/component/toolbox'; // 必须引入这个组件，下载按钮
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/markLine'
import 'v-charts/lib/style.css'
import VeRing from 'v-charts/lib/ring'//环形
 
export default {
  name: 'RingChart',
  components: {
    VeRing
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
      default: () => ['#7d5886', '#faa755', '#d93a49', '#6950a1', '#ffc20e'],
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
          top: 100,
          bottom: 20,
          left: '3%',
          right: '3%',
          containLabel: true,
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        },
        title: {
          show: false,
          text: 'xxxx',
          subtext: '',
          x: 'left',
          top: 20,
          textStyle: {
            color: '#666',
            fontSize: 16
          }
        },
        extend: {
          offsetY: 34, //纵向偏移量
          series: {
            label: {
              show: true
            },

            itemStyle: {
              shadowOffsetX: 4,
              shadowOffsetY: 5,
              shadowBlur: 6,
              shadowColor: 'rgba(0,0,0,.3)',
              color: (e) => {
                return this.colors[e.dataIndex];
              }
            }
          },
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
            // bottom: '10%',
            // orient: 'vertical',  // x轴的显示方式
            // left: 'right',
            // selectedMode: false
          },
        //   xAxis: {
        //     // name: '', // 坐标轴名称。
        //     // nameLocation: 'end', // 坐标轴名称显示位置。
        //     // axisLabel: {// 坐标轴刻度标签的相关设置。
        //     //   interval: 0,
        //     //   rotate: 0
        //     // },
        //     // axisLine: { // 设置轴线的属性
        //     //   show: false,
        //     //   lineStyle: {
        //     //     color: '#000',
        //     //     width: 1
        //     //   }
        //     // }
        //     nameGap: 10
        //   },
          // yAxis: {
          //   nameLocation: 'end', // 坐标轴名称显示位置。
          //   axisLine: { // 设置轴线的属性
          //     show: false,
          //     lineStyle: {
          //       color: '#000',
          //       width: 1
          //     }
          //   }
          // },
        },
        settings: {
          radius: [25, 45], //环图外半径与内半径
          offsetY: 58, //纵向偏移量
          itemStyle: {
            //设置阴影效果
            shadowOffsetX: 4,
            shadowOffsetY: 5,
            shadowBlur: 6,
            shadowColor: 'rgba(0,0,0,.3)',
            // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.6,
              colorStops: [
                {
                  offset: 0,
                  color: '#ffcf90' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#80aa45' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }, //图形样式
          label: {
            show: true,
            position: 'center'
          } //环图图形上的文本标签
          // roseType: 'area',//显示为南丁格尔玫瑰图, 默认不展示为南丁格尔玫瑰图，可设置为'radius', 'area'
          // dimension: '日期一', //	维度 默认columns第一项为维度
          // metrics: 'fang1', //指标 默认columns第二项为指标
          // dataType: '', //可选值: KMB, normal, percent
          // legendLimit: 8, //legend显示数量限制,legend数量过多会导致环图样式错误，限制legend最大值并且当超过此值时，隐藏legend可以解决这个问题
          // selectedMode: true, //选中模式,可选值：single(单选), multiple(多选)，默认为false
          // hoverAnimation: true //是否开启 hover 在扇区上的放大动画效果，默认true
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