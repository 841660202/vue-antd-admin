<!--
 * @Author: wangrong 897100547@qq.com
 * @Date: 2022-08-16 01:08:30
 * @LastEditors: wangrong 897100547@qq.com
 * @LastEditTime: 2022-08-16 04:19:01
 * @FilePath: \vue-antd-admin1\src\pages\dashboard\analysis3DemoConfig\analysis3DemoConfig.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="chart_wraper">
        <h4>经过上面的demo，我们就可以创建自己系统的图表了，但是我们在使用图表时避免不了要修改一些图表的样式，例如：图表颜色、文字颜色、x/y轴的描述文字等等，这个时候就需要对一些配置项进行调整以此来适用于我们自己的项目，下面是一些比较常用的配置了。</h4>
        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">1. 修改图表图例颜色</h2>
            <h4 class="tip">比如可以对图例的公用文本样式进行设置。在legend配置项中定义textStyle属性设置颜色即可。</h4>
            <div class="pic_wraper">
                <img src="./img/1.png" style="width: 50%; height:80%;"/>
                <img src="./img/2.png" style="width: 50%; height:80%;"/>
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">2. 修改是否显示X/Y轴线及图表X/Y轴线条颜色</h2>
            <h4 class="tip">在x/y轴添加axisLine配置进行修改即可。</h4>
            <div class="pic_wraper">
                <img src="./img/1.png" style="width: 50%; height:80%;"/>
                <img src="./img/3.png" style="width: 50%; height:80%;"/>
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">3. 可设置图表X轴文字对倾斜</h2>
            <h4 class="tip">在x轴中加上axisLabel属性设置需要对角度值即可。</h4>
            <div class="pic_wraper">
                <img src="./img/1.png" style="width: 50%; height:80%;"/>
                <img src="./img/4.png" style="width: 50%; height:80%;"/>
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">4. 可设置图表的背景颜色</h2>
            <h4 class="tip">在option中加上backgroundColor配置项设置颜色即可。</h4>
            <div class="pic_wraper">
                <img src="./img/1.png" style="width: 50%; height:80%;"/>
                <img src="./img/5.png" style="width: 50%; height:80%;"/>
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">5. 图饼展示信息让其值及百分比都展示</h2>
            <h4 class="tip">在series配置中加上itemStyle配置项根据需要显示即可。</h4>
            <div class="pic_wraper">
                <img src="./img/6.png" style="width: 50%; height:80%;"/>
                <img src="./img/7.png" style="width: 50%; height:80%;"/>
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">6. 调整柱图与顶部图例的间距</h2>
            <h4 class="tip">在option中添加grid配置项设置需要的值即可。</h4>
            <div class="pic_wraper">
                <img src="./img/8.png" style="width: 50%; height:80%;"/>
                <img src="./img/9.png" style="width: 50%; height:80%;"/>
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 5px;">
            <h2 class="title">7. 设置面积图渐变色</h2>
            <h4 class="tip">在series方法中添加areaStyle配置项即可实现。</h4>
            <div class="pic_wraper">
                <img src="./img/10.png" style="width: 50%; height:80%;"/>
                <img src="./img/11.png" style="width: 50%; height:80%;"/>
            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
.chart_wraper {
    padding: 10px 10px;
    background: #fff;
    min-height: 1000px;
}
.title {
    background: #e4dfdf94;
    font-weight: bold;
}
.tip {
    font-weight: bold;
}
.pic_wraper {
    display: flex;
    justify-content: space-around;
}
</style>