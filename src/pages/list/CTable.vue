<template>
  <div>
    hello

    <a-table v-bind="{ ...$props, columns, title: undefined, loading: false }">
      <template
        slot-scope="text, record, index"
        :slot="slot"
        v-for="slot in Object.keys($scopedSlots).filter((key) => key !== 'expandedRowRender')"
      >
        <slot :name="slot" v-bind="{ text, record, index }"></slot>
      </template>
      <template :slot="slot" v-for="slot in Object.keys($slots)">
        <slot :name="slot"></slot>
      </template>
      <template slot-scope="record, index, indent, expanded" :slot="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''">
        <slot v-bind="{ record, index, indent, expanded }" :name="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'AdvanceTable',
  props: {
    tableLayout: String,
    bordered: Boolean,
    childrenColumnName: { type: String, default: 'children' },
    columns: Array,
    components: Object,
    dataSource: Array,
    defaultExpandAllRows: Array[String],
    expandedRowKeys: Array[String],
    expandedRowRender: Function,
    expandIcon: Function,
    expandRowByClick: Boolean,
    expandIconColumnIndex: Number,
    footer: Function,
    indentSize: Number,
    loading: Boolean,
    locale: Object,
    pagination: [Object, Boolean],
    rowClassName: Function,
    rowKey: [String, Function],
    rowSelection: Object,
    scroll: Object,
    showHeader: { type: Boolean, default: true },
    size: String,
    title: String,
    customHeaderRow: Function,
    customRow: Function,
    getPopupContainer: Function,
    transformCellText: Function,
    formatConditions: Boolean,
  },
  data() {
    return {};
  },
  // computed: {
  //   slots() {
  //     return Object.keys(this.$slots).filter((slot) => slot !== 'title');
  //   },
  //   scopedSlots() {
  //     return Object.keys(this.$scopedSlots).filter((slot) => slot !== 'expandedRowRender' && slot !== 'title');
  //   },
  // },
};
</script>

<!-- <style scoped lang="less">
.advanced-table {
  overflow-y: auto;
  background-color: @component-background;
  .header-bar {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: all 0.3s;
    &.middle {
      padding: 12px 16px;
    }
    &.small {
      padding: 8px 12px;
      border: 1px solid @border-color;
      border-bottom: 0;
      .title {
        font-size: 16px;
      }
    }
    .title {
      transition: all 0.3s;
      font-size: 18px;
      color: @title-color;
      font-weight: 700;
    }
    .search {
      flex: 1;
      text-align: right;
      margin: 0 24px;
    }
    .actions {
      text-align: right;
      font-size: 17px;
      color: @text-color;
      .action {
        margin: 0 8px;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
}
</style> -->
