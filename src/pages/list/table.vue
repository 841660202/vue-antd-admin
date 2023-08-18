<template>
  <div>
    <standard-table :columns="columns" :dataSource="dataSource"> </standard-table>
  </div>
</template>

<script>
import StandardTable from './STTable.vue';

export default {
  name: 'QueryList',
  components: { StandardTable },
  data() {
    return {
      advanced: true,
      columns: [
        {
          title: '商品名称',
          dataIndex: 'name',
          searchAble: true,
        },
        {
          title: '订单号订单号订单号订单号订单号订单号订单号订单号',

          dataIndex: 'orderId',
          width: 100,
          ellipsis: true,
        },
        {
          searchAble: true,
          dataIndex: 'status',
          dataType: 'select',
          slots: { title: 'statusTitle' },
          scopedSlots: { customRender: 'status' },
          search: {
            selectOptions: [
              { title: '已下单', value: 1 },
              { title: '已付款', value: 2 },
              { title: '已审核', value: 3 },
              { title: '已发货', value: 4 },
            ],
          },
        },
        {
          title: '发货',
          searchAble: true,
          dataIndex: 'send',
          dataType: 'boolean',
          scopedSlots: { customRender: 'send' },
          search: {
            switchOptions: {
              checkedText: '开',
              uncheckedText: '关',
            },
          },
        },
        {
          title: '审核时间',
          dataIndex: 'auditTime',
          dataType: 'time',
        },
      ],
      dataSource: [],
      selectedRows: [],
    };
  },
  authorize: {
    deleteRecord: 'delete',
  },
  computed: {
    // dicts() {
    //   const value = this.$store.getters['account/dicts'];
    //   console.log('value', value);
    //   return value;
    // },
  },
  methods: {
    // getDidcts() {
    //   this.$store.dispatch('account/getDictsAction');
    // },
    // deleteRecord(key) {
    //   this.dataSource = this.dataSource.filter((item) => item.key !== key);
    //   this.selectedRows = this.selectedRows.filter((item) => item.key !== key);
    // },
    // toggleAdvanced() {
    //   this.advanced = !this.advanced;
    // },
    // remove() {
    //   this.dataSource = this.dataSource.filter((item) => this.selectedRows.findIndex((row) => row.key === item.key) === -1);
    //   this.selectedRows = [];
    // },
    // onClear() {
    //   this.$message.info('您清空了勾选的所有行');
    // },
    // onStatusTitleClick() {
    //   this.$message.info('你点击了状态栏表头');
    // },
    // onChange() {
    //   this.$message.info('表格状态改变了');
    // },
    // onSelectChange() {
    //   this.$message.info('选中行改变了');
    // },
    // addNew() {
    //   this.dataSource.unshift({
    //     key: this.dataSource.length,
    //     no: 'NO ' + this.dataSource.length,
    //     description: '这是一段描述',
    //     callNo: Math.floor(Math.random() * 1000),
    //     status: Math.floor(Math.random() * 10) % 4,
    //     updatedAt: '2018-07-26',
    //   });
    // },
    // handleMenuClick(e) {
    //   if (e.key === 'delete') {
    //     this.remove();
    //   }
    // },
  },
  created() {
    // this.getDidcts()
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
