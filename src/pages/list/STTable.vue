<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info" :show-icon="true" v-if="selectedRows">
        <div class="message" slot="message">
          已选择&nbsp;<a>{{ selectedRows.length }}</a
          >&nbsp;项 <a class="clear" @click="onClear">清空</a>
          <template v-for="(item, index) in needTotalList">
            <div v-if="item.needTotal" :key="index">
              {{ item.title }}总计&nbsp;
              <a>{{ item.customRender ? item.customRender(item.total) : item.total }}</a>
            </div>
          </template>
        </div>
      </a-alert>
    </div>
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="pp_columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="pagination"
      :expandedRowKeys="expandedRowKeys"
      :expandedRowRender="expandedRowRender"
      @change="onChange"
      :rowSelection="selectedRows ? { selectedRowKeys: selectedRowKeys, onChange: updateSelect } : undefined"
    >
      <!-- 表头非嵌套 -->
      <span
        v-for="(columns_ellipsis, index) in pp_columns.filter((item) => item.tooltip)"
        :slot="columns_ellipsis.slots.title"
        :key="index"
        style="color: red"
      >
        <a-tooltip placement="topLeft">
          <template slot="title">
            <span>{{ columns_ellipsis.tooltip }}</span>
          </template>
          {{ columns_ellipsis.tooltip }}
        </a-tooltip>
      </span>
      <!-- 表头嵌套 -->

      <!-- 子集children 同样方式处理，未被处理到的，保持默认展示 -->
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'StandardTable',
  props: {
    bordered: Boolean,
    loading: [Boolean, Object],
    columns: Array,
    dataSource: Array,
    rowKey: {
      type: [String, Function],
      default: 'key',
    },
    pagination: {
      type: [Object, Boolean],
      default: true,
    },
    selectedRows: Array,
    expandedRowKeys: Array,
    expandedRowRender: Function,
  },
  data() {
    return {
      needTotalList: [],
      columns_ellipsises: [],

      pp_columns: [],
    };
  },
  methods: {
    updateSelect(selectedRowKeys, selectedRows) {
      this.$emit('update:selectedRows', selectedRows);
      this.$emit('selectedRowChange', selectedRowKeys, selectedRows);
    },
    initTotalList(columns) {
      console.log('===tag columns', columns);
      const totalList = columns
        .filter((item) => item.needTotal)
        .map((item) => {
          return {
            ...item,
            total: 0,
          };
        });
      return totalList;
    },
    onClear() {
      this.updateSelect([], []);
      this.$emit('clear');
    },
    onChange(pagination, filters, sorter, { currentDataSource }) {
      this.$emit('change', pagination, filters, sorter, { currentDataSource });
    },
  },
  created() {
    this.needTotalList = this.initTotalList(this.columns);
  },
  watch: {
    selectedRows(selectedRows) {
      this.needTotalList = this.needTotalList.map((item) => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            let v;
            try {
              v = val[item.dataIndex] ? val[item.dataIndex] : eval(`val.${item.dataIndex}`);
            } catch (_) {
              v = val[item.dataIndex];
            }
            v = !isNaN(parseFloat(v)) ? parseFloat(v) : 0;
            return sum + v;
          }, 0),
        };
      });
    },

    columns: {
      handler: function(values, oldVal) {
        // const dd_ = [
        //   {
        //     title: '自定义1',
        //     dataIndex: 'value',
        //     slots: { title: 'titleValue' }, //表头插槽
        //     scopedSlots: { customRender: 'value' }, //表格内容插槽
        //     align: 'center',
        //     width: 240,
        //     ellipsis: true,
        //   },
        //   {
        //     title: '自定义2',
        //     dataIndex: 'level',
        //     scopedSlots: { customRender: 'level' },
        //     slots: { title: 'titleLevel' },
        //     align: 'center',
        //   },
        //   {
        //     title: '自定义3',
        //     scopedSlots: { customRender: 'note' },
        //     slots: { title: 'titleNote' },
        //     align: 'center',
        //   },
        //   {
        //     title: '备注',
        //     dataIndex: 'market',
        //     scopedSlots: { customRender: 'market' },
        //     align: 'center',
        //   },
        //   {
        //     title: '操作',
        //     dataIndex: 'operation',
        //     scopedSlots: { customRender: 'operation' },
        //     align: 'center',
        //     width: 50,
        //   },
        // ];
        /**
         * 1. ellipsis=true，支持tooltip展示
         * 2.
         *    1. 如果已经有slots，直接复用，增加tooltip = title
         *    2. 如果没有slots，生成slotTootip，增加tooltip = title
         * 3. ellipsis=false不进行处理
         *
         */
        this.pp_columns = values.map((item) => {
          if (item.ellipsis) {
            const isOriginSlots = !item.slots;
            const { title, ...rest } = item;
            if (isOriginSlots) {
              return {
                ...rest,
                slots: { title: 'columns_ellipsis__' + item.dataIndex },
                tooltip: title,
              };
            } else {
              console.log('请检测组件外侧slots是否与组件内部展示效果一致');
              return {
                ...rest,
                tooltip: title,
              };
            }
          }
          return item;
        });

        console.log('this.pp_columns', this.pp_columns);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    selectedRowKeys() {
      return this.selectedRows.map((record) => {
        return typeof this.rowKey === 'function' ? this.rowKey(record) : record[this.rowKey];
      });
    },
  },
};
</script>

<style scoped lang="less">
.standard-table {
  .alert {
    margin-bottom: 16px;
    .message {
      a {
        font-weight: 600;
      }
    }
    .clear {
      float: right;
    }
  }
}
</style>
