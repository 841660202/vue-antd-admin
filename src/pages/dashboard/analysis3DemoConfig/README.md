## 
1.“ v-charts简介 在使用 echarts 生成图表时,经常需要做繁琐的数据类型转化、修改复杂的配置项,v-charts 的出现正是为了解决这个痛点。基于 Vue2.0 和 echarts 封装的 V-Charts 图表组件,只需要统一提供一种对前后端都友好的数据格式设置简单的配置项,便可轻松生成常见的图表。 v-charts 已经处理了关于echarts依赖引入的问题,保证所使用的图表,都是最小的文件。”
优点：1）数据格式友好,方便生成和修改 2）简化配置项 3）定制简单，提供多种自定义Echarts方式 4）支持所有现代浏览器及IE10+

##
2.目前已经配置的基础图形组件：折线图、柱状图、条形图、饼图、环图、了大图、漏斗图、瀑布图。

##
3.前后台交互：

<script>
export default {
    data() {
        return {
            histogramChartForm: {
                title: 'xxx柱状图',              // 图形名称
                settings: {
                    labelMap: {                 // 指标的别名， -- 后台数据给的指标大多时候不为中文，但是给用户看的肯定是中文的
                        date: '日期',
                        key1: 'value指标',
                        key2: 'value指标',
                        key3: 'value指标',
                        key4: '举个例子显示百分比'
                    }, 
                    // dimension: [],          // 横轴显示字段  (声明维度--默认就是columns的第一个 例如：date)
                    // metrics: [],            // 纵轴显示字段 (声明指标 -- columns的第二个开始)
                    axisSite: { right: ['key4']},           // 右边坐标轴显示什么字段 （指标所在的轴 -- 设置左右双Y轴用）
                    yAxisName: ['key1Name', 'key4Name'],    // 纵轴左右坐标轴显示的标题
                },
                data: {
                    // 第一个参数为维度（就是横轴，例如日期），剩余为指标（就上给哪些东西做统计，可以直接为中文）
                    columns: ['date', 'key1', 'key2', 'key3'],  
                    // row为数组，每个指标各有一条柱，并标注出每个指标的值
                    rows: [
                        { 'date': '1/1', 'key1': value1, 'key2': value2, 'key3': value3 },
                        { 'date': '1/1', 'key1': value4, 'key2': value5, 'key3': value6 }
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

##
 4.前台如何使用图形组件

 ### 方法一：单独引用，比如柱状图我就单引用柱状图表组件
 ``` 1.第一步使用组件标签 ```
 <histogram-chart
    :title="histogramChartForm.title"
    :data="histogramChartForm.data"
    :extend="histogramChartForm.extend"
    :settings="histogramChartForm.settings"
/>
``` 2.第二步引用组件路径 ```
<script>
    import HistogramChart from '@/components/v-chart/components3/HistogramChart' // 柱状图
</script>
``` 3.注册组件```
<script>
    export default {
        components: { 
            HistogramChart, // 柱状图
        },
        data() {
            return {
                histogramChartForm: {
                    title: '',
                    settings: {
                        labelMap: {},
                        axisSite: {},
                        yAxisName: {}
                    },
                    data: {
                        columns: [],
                        rows: []
                    },
                    extend: {}
                }
            }
        }
    }
</script>

### 方法二：引用TypeChart组件，该组件已封装好所有可能使用的图形组件，只需传入type类型，渲染对于type类型的图表
 ``` 1.第一步使用组件标签 ```
<TypeChart :chartConfig="chartConfig" :type="type"/>

``` 2.第二步引用组件路径 ```
<script>
   import TypeChart from '@/components/v-chart/components3/TypeChart'
</script>

``` 3.注册组件```
<script>
    export default {
        components: { 
            TypeChart, 
        },
        data() {
            return {
                type: '',
                chartConfig: {
                    title: '',
                    settings: {
                        labelMap: {},
                        axisSite: {},
                        yAxisName: {}
                    },
                    data: {
                        columns: [],
                        rows: []
                    },
                    extend: {}
                }
            }
        }
    }
</script>

##
 5.图表配置项举例