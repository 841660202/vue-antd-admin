<template>
  <div>
    <a-table
      :rowKey="
        (record, index) => {
          return index;
        }
      "
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
    >
      <!-- 自定义表头-->
      <span slot="titleValue" class="form-table-heard">
        <a-tooltip placement="topLeft">
          <template slot="title">1212121订单号订单号订单号订单号订单号</template>
          1212121订单号订单号订单号订单号订单号
        </a-tooltip>
      </span>
      <span slot="titleLevel" class="form-table-heard">
        评价等级
      </span>
      <span slot="titleNote" class="form-table-heard">
        评价说明
      </span>
      <!--自定义内容-->
      <span slot="operation" slot-scope="text, record, index">
        <a-button name="删除" btnType="primary" :isDanger="true" @click="handleDelete(index)" />
      </span>
    </a-table>
  </div>
</template>
<style lang="less" scoped>
.form-table-heard:before {
  content: '*';
  color: red;
}
</style>

<script>
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
  data() {
    return {
      dataSource,
      columns: [
        {
          dataIndex: 'no',
          scopedSlots: { customRender: 'value' }, //表格内容插槽
          slots: { title: 'titleValue' }, //表头插槽
          align: 'center',
          width: 100,
          ellipsis: true,
        },
        {
          dataIndex: 'description',
          scopedSlots: { customRender: 'level' },
          slots: { title: 'titleLevel' },
          align: 'center',
        },
        {
          dataIndex: 'callNo',
          scopedSlots: { customRender: 'callNo' },
          slots: { title: 'titleNote' },
          align: 'center',
        },
        {
          title: '备注',
          dataIndex: 'market',
          scopedSlots: { customRender: 'market' },
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          align: 'center',
          width: 50,
        },
      ],
    };
  },
};
</script>
