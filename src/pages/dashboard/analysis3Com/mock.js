
// 柱狀图
const histogramChartForm = {
    title: 'xxx柱状图',              // 图形名称
    settings: {
        labelMap: {
            date: '日期',
            userCount: '访问用户',
            userOrder: '下单用户',
            userRate: '下单率'
        }, 
        // dimension: [],      // 横轴显示字段
        // metrics: ['date'], // 纵轴显示字段
        axisSite: { right: ['userRate']},  // 右边坐标轴显示什么字段
        yAxisName: ['访问用户', '下单用户'], // 两侧坐标轴名称
    },
    data: {
        columns: ['date', 'userCount', 'userOrder', 'userRate'],
        rows: [
            { 'date': '1/1', 'userCount': 1393, 'userOrder': 1093, 'userRate': 0.32 },
            { 'date': '1/2', 'userCount': 3530, 'userOrder': 3230, 'userRate': 0.26 },
            { 'date': '1/3', 'userCount': 2923, 'userOrder': 2623, 'userRate': 0.76 },
            { 'date': '1/4', 'userCount': 1723, 'userOrder': 1423, 'userRate': 0.49 },
            { 'date': '1/5', 'userCount': 3792, 'userOrder': 3492, 'userRate': 0.323 },
            { 'date': '1/6', 'userCount': 4593, 'userOrder': 4293, 'userRate': 0.78 }
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

// 折线
const lineChartForm= {
    title: 'xxx折线图',              // 图形名称
    settings: {
        labelMap: {
            date: '日期',
            userCount: '访问用户',
            userOrder: '下单用户',
            userRate: '下单率'
        }, 
        // dimension: [],          // 横轴显示字段
        // metrics: ['date'], // 纵轴显示字段
        axisSite: { right: ['userRate']},  // 右边坐标轴显示什么字段
        yAxisName: ['访问用户', '下单用户'], // 两侧坐标轴名称
    },
    data: {
        columns: ['date', 'userCount', 'userOrder', 'userRate'],
        rows: [
            { 'date': '1/1', 'userCount': 1393, 'userOrder': 1093, 'userRate': 0.32 },
            { 'date': '1/2', 'userCount': 3530, 'userOrder': 3230, 'userRate': 0.26 },
            { 'date': '1/3', 'userCount': 2923, 'userOrder': 2623, 'userRate': 0.76 },
            { 'date': '1/4', 'userCount': 1723, 'userOrder': 1423, 'userRate': 0.49 },
            { 'date': '1/5', 'userCount': 3792, 'userOrder': 3492, 'userRate': 0.323 },
            { 'date': '1/6', 'userCount': 4593, 'userOrder': 4293, 'userRate': 0.78 }
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

// 饼图
const pieChartForm = {
    title: 'xxx饼图',              // 图形名称
    settings: {
        labelMap: {                   
            date: '日期',
            num1: '销售量',
            num2: '销售量',
            num3: '销售量'
        }
    },
    data: {
        columns: ['日期', '销售量', '访问量', '进货量'],
        rows: [
            { '日期': '1月1日', '销售量': 1123, '访问量':999, '进货量':2000},
            { '日期': '1月2日', '销售量': 1223, '访问量':456, '进货量':3000 },
            { '日期': '1月3日', '销售量': 2123, '访问量':6454, '进货量':2200,},
            { '日期': '1月4日', '销售量': 4123, '访问量':4444, '进货量':5000},
            { '日期': '1月5日', '销售量': 3123, '访问量':1231, '进货量':4000},
            { '日期': '1月6日', '销售量': 7123, '访问量':33312, '进货量':10000}
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

// 环形图
const ringChartForm = {
    title: 'xxx环形图',              // 图形名称
    settings: {
        labelMap: {                   
            date: '日期',
            num1: '销售量',
            num2: '销售量',
            num3: '销售量'
        }
    },
    data: {
        columns: ['日期', '销售量', '访问量', '进货量'],
        rows: [
            { '日期': '1月1日', '销售量': 1123, '访问量':999, '进货量':2000},
            { '日期': '1月2日', '销售量': 1223, '访问量':456, '进货量':3000 },
            { '日期': '1月3日', '销售量': 2123, '访问量':6454, '进货量':2200,},
            { '日期': '1月4日', '销售量': 4123, '访问量':4444, '进货量':5000},
            { '日期': '1月5日', '销售量': 3123, '访问量':1231, '进货量':4000},
            { '日期': '1月6日', '销售量': 7123, '访问量':33312, '进货量':10000}
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

// 雷达图
const radarChartForm = {
    title: 'xxx雷达图',              // 图形名称
    settings: {
        labelMap: {                   
            total: "总收益",
            num1: "收益1",
            num2: "收益2",
            num3: "收益3",
        },
    },
    data: {
        columns: [
            "date",
            "num1",
            "num2",
            "num3",
            "total",
        ],
        rows: [
            {
                date: "2022-07-25",
                num1: 1393,
                num2: 1093,
                num3: 0.32,
                total: 191,
            },
            {
                date: "2022-07-26",
                num1: 3530,
                num2: 3230,
                num3: 0.26,

                total: 161,
            },
            {
                date: "2022-07-27",
                num1: 2923,
                num2: 2623,
                num3: 0.76,
                total: 131,
            },
            {
                date: "2022-07-28",
                num1: 1723,
                num2: 1423,
                num3: 0.49,
                total: 131,
            },
            {
                date: "2022-07-29",
                num1: 3792,
                num2: 3492,
                num3: 0.323,
                total: 321,
            },
            {
                date: "2022-07-30",
                num1: 4593,
                num2: 4293,
                num3: 0.78,
                total: 221,
            }
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

// 条形图
const barChartForm = {
    title: 'xxx条线图',              // 图形名称
    settings: {
        labelMap: {
            percentage: '比例'
        }, 
        // dimension: ["talkDuration"], 
        // metrics: ["percentage"], 
        dataOrder: {   //按照由大到小进行排序
            label: "percentage",
            order: "desc",
        },
    },
    data: {
        columns: [
            "talkDuration",
            "percentage"
        ],
        rows: [
            { 'talkDuration': '1.广东', 'percentage': 20 },
            { 'talkDuration': '2.北京', 'percentage': 20 },
            { 'talkDuration': '3.上海', 'percentage': 18 },
            { 'talkDuration': '4.江苏', 'percentage': 8 },
            { 'talkDuration': '5.浙江', 'percentage': 6 },
            { 'talkDuration': '6.山东', 'percentage': 4 }
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

// 漏斗图
const funnelChartForm = {
    title: 'xxx漏斗图',              // 图形名称
    settings: {
        labelMap: {
            percentage: '比例'
        }, 
        // dimension: ["talkDuration"], 
        // metrics: ["percentage"], 
        dataOrder: {   //按照由大到小进行排序
            label: "percentage",
            order: "desc",
        },
    },
    data: {
        columns: [
            "talkDuration",
            "percentage"
        ],
        rows: [
            { 'talkDuration': '1.广东', 'percentage': 20 },
            { 'talkDuration': '2.北京', 'percentage': 20 },
            { 'talkDuration': '3.上海', 'percentage': 18 },
            { 'talkDuration': '4.江苏', 'percentage': 8 },
            { 'talkDuration': '5.浙江', 'percentage': 6 },
            { 'talkDuration': '6.山东', 'percentage': 4 }
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

// 瀑布图
const waterfallChartForm = {
    title: 'xxx瀑布图',              // 图形名称
    settings: {
        labelMap: {                   
            date: '日期',
            money: '金额',
            num: '数量'
        },
    },
    data: {
        columns: [
            "date",
            "money",
            "num"
        ],
        rows: [
            {
                "date": "2022-07-25",
                "money": "120000",
                "num": 1000
            },
            {
                "date": "2022-07-26",
                "money": "150000",
                "num": 3000
            },
            {
                "date": "2022-07-27",
                "money": "4000000",
                "num": 8000
            },
            {
                "date": "2022-07-28",
                "money": "2300000",
                "num": 40000
            },
            {
                "date": "2022-07-29",
                "money": "100000",
                "num": 3000
            },
            {
                "date": "2022-07-30",
                "money": "3000000",
                "num": 800
            }
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

export { histogramChartForm, lineChartForm, pieChartForm, ringChartForm, radarChartForm, barChartForm, funnelChartForm, waterfallChartForm } 