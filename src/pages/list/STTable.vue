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
      ref="table"
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="pagination"
      :expandedRowKeys="expandedRowKeys"
      :expandedRowRender="expandedRowRender"
      @change="onChange"
      :rowSelection="selectedRows ? { selectedRowKeys: selectedRowKeys, onChange: updateSelect } : undefined"
    >
      <!--定制 表头嵌套 or 非嵌套 -->
      <!-- <span
        v-for="(columns_ellipsis, index) in tooltip_columns.filter((item) => item.ellipsis)"
        :slot="columns_ellipsis.slots.title"
        :key="index"
        :style="[{ color: columns_ellipsis.children ? 'red' : '#000' }, { display: columns_ellipsis.children ? 'block' : 'inline' }]"
        class="ant-table-column-title"
      >
        {{ columns_ellipsis.tooltip }}
      </span> -->

      <!-- <a-tooltip placement="topLeft">
          <template slot="title">
            <span>{{ columns_ellipsis.tooltip }}</span>
          </template>
          {{ columns_ellipsis.tooltip }}
        </a-tooltip> -->

      <!-- 子集children 同样方式处理，未被处理到的，保持默认展示 -->
    </a-table>
  </div>
</template>

<script>
import { tooltipTableColumns } from './util';
let tooltip_columns = [];

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
      tooltip_columns: [],
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
  mounted() {
    const domList = document.querySelectorAll('.ant-table-column-title');
    Array.from(domList).forEach((dom) => {
      dom.setAttribute('title', dom.innerText);
    });
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

    // columns: {
    //   handler: function(values, oldVal) {
    //     const dd_ = [
    //       {
    //         title: '自定义1',
    //         dataIndex: 'value',
    //         slots: { title: 'titleValue' }, //表头插槽
    //         scopedSlots: { customRender: 'value' }, //表格内容插槽
    //         align: 'center',
    //         width: 140,
    //         ellipsis: true,
    //         children: [
    //           {
    //             title: '授权额度(亿元)\n (生效中)',
    //             dataIndex: `sss`,
    //             key: `sss`,
    //             width: 120,
    //             ellipsis: true,
    //             autoEllipsis: false,
    //             slots: { title: `ssss` },
    //           },
    //           {
    //             title: '自定义2',
    //             dataIndex: 'level-1',
    //             scopedSlots: { customRender: 'level' },
    //             slots: { title: 'titleLevel' },
    //             align: 'center',
    //             ellipsis: true,
    //           },
    //         ],
    //       },
    //       {
    //         title: '自定义2',
    //         dataIndex: 'level',
    //         scopedSlots: { customRender: 'level' },
    //         slots: { title: 'titleLevel' },
    //         align: 'center',
    //       },
    //       {
    //         title: '自定义3',
    //         scopedSlots: { customRender: 'note' },
    //         slots: { title: 'titleNote' },
    //         align: 'center',
    //       },
    //       {
    //         title: '备注',
    //         dataIndex: 'market',
    //         scopedSlots: { customRender: 'market' },
    //         align: 'center',
    //       },
    //       {
    //         title: '操作',
    //         dataIndex: 'operation',
    //         scopedSlots: { customRender: 'operation' },
    //         align: 'center',
    //         width: 50,
    //       },
    //     ];
    //     const helpffun = tooltipTableColumns(tooltip_columns);
    //     this.pp_columns = helpffun(dd_);
    //     this.tooltip_columns = tooltip_columns;

    //     console.log(
    //       'this.pp_columns',
    //       this.pp_columns.filter((item) => item.ellipsis)
    //     );
    //     console.log('this.tooltip_columns', this.tooltip_columns);
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  computed: {
    selectedRowKeys() {
      return this.selectedRows.map((record) => {
        return typeof this.rowKey === 'function' ? this.rowKey(record) : record[this.rowKey];
      });
    },
  },
  destroyed() {
    tooltip_columns = [];
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
