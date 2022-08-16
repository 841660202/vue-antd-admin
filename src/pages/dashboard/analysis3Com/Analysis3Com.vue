<!--
 * @Author: wangrong 897100547@qq.com
 * @Date: 2022-08-15 20:10:45
 * @LastEditors: wangrong 897100547@qq.com
 * @LastEditTime: 2022-08-15 23:31:47
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis3Com\Analysis3Com.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <a-form :form="form" class="form">
            <a-row class="form-row">
                <a-col :lg="6" :md="12" :sm="24">
                    <a-form-item label="请选择图形">
                        <a-select
                            placeholder="请选择"
                            v-model="form.chartType"
                            @change="handleChange"
                        >
                            <a-select-option v-for="item in chartOptions" :key="item.type" :value="item.type">{{item.title}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <TypeChart :chartConfig="chartConfig" :type="type"/>
    </div>
</template>
<script>
import TypeChart from '@/components/v-chart/components3/TypeChart'
import {  histogramChartForm, lineChartForm, pieChartForm, ringChartForm, radarChartForm, barChartForm, funnelChartForm, waterfallChartForm} from './mock'

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

export default {
    components: { 
        TypeChart
    },
    data() {
        return {
            form: {
                chartType: 'histogram'
            },
            chartOptions,
            // mock
            histogramChartForm, 
            lineChartForm, 
            pieChartForm, 
            ringChartForm, 
            radarChartForm, 
            barChartForm, 
            funnelChartForm, 
            waterfallChartForm,
            chartConfig: histogramChartForm,
            type: 'histogram',
        }
    },
    methods: {
        handleChange(val) {
            console.log(val,'valxx')
            this.type = val
            switch (val) {
                case 'histogram':
                    return this.chartConfig = this.histogramChartForm
                case 'line':
                    return this.chartConfig = this.lineChartForm
                case 'pie':
                    return this.chartConfig = this.pieChartForm
                case 'ring':
                    return this.chartConfig = this.ringChartForm
                case 'radar':
                    return this.chartConfig = this.radarChartForm
                case 'bar':
                    return this.chartConfig = this.barChartForm
                case 'funnel':
                    return this.chartConfig = this.funnelChartForm
                case 'waterfall':
                    return this.chartConfig = this.waterfallChartForm
                
            }
        }
    }
    
}
</script>