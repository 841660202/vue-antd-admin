<template>
  <a-table :columns="columns" :dataSource="dataSource"> </a-table>
</template>

<script>
const columns = [
  {
    title: '规则编号',
    dataIndex: 'no',
  },
  {
    title: (
      <a-tooltip placement="topLeft">
        <template slot="title">prompt text</template>
        1212121订单号订单号订单号订单号订单号
      </a-tooltip>
    ),
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 次',
  },
  {
    dataIndex: 'status',
    needTotal: true,
    slots: { title: 'statusTitle' },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  },
];

const dataSource = [];

for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    no: 'NO ' + i,
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: '2018-07-26',
  });
}

export default {
  name: 'QueryList',
  data() {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
    };
  },
  authorize: {
    deleteRecord: 'delete',
  },

  created() {
    // this.getDidcts()
  },
};
</script>
