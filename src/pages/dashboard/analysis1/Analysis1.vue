<!--
 * @Author: your name
 * @Date: 2022-07-06 17:16:38
 * @LastEditTime: 2022-07-07 16:33:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis1\Analysis1.vue
-->
<template>
    <div>
        <TypeChart :chartData="chartData" :type="type"/>
    </div>
</template>

<script>
import TypeChart from '../../../components/v-chart/TypeChart'
export default {
    components: { 
        TypeChart
    },
    data(){
        return{
            dataList:[
                { '日期': '1月1日', '销售量': 1123, '访问量':999, '进货量':2000},
                { '日期': '1月2日', '销售量': 1223, '访问量':456, '进货量':3000 },
                { '日期': '1月3日', '销售量': 2123, '访问量':6454, '进货量':2200,},
                { '日期': '1月4日', '销售量': 4123, '访问量':4444, '进货量':5000},
                { '日期': '1月5日', '销售量': 3123, '访问量':1231, '进货量':4000},
                { '日期': '1月6日', '销售量': 7123, '访问量':33312, '进货量':10000}
            ],
            columnsList:['日期', '销售量', '访问量', '进货量'],
            chartData: [],
            type: 'histogram'
        }
    },
    created () {
        this.chartData = {
            columns: this.columnsList,
            rows: this.dataList
        }
    }
}
</script>
<style lang='less' scoped>
</style>

