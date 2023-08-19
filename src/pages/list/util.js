/**
 * helper函数做两件事
 * 1. 重新格式化columns
 * 2. 收集需要tooltip的column 即：ellipsis
 */
export function tooltipTableColumns(tooltip_columns = []) {
  return function helper(list) {
    return list.map((item) => {
      const { title, ...rest } = item;
      if (rest.ellipsis) {
        let d;
        if (!rest.children) {
          const noSlots = !rest.slots;
          // 没有定制
          if (noSlots) {
            d = {
              ...rest,
              slots: { title: 'tooltip__' + rest.dataIndex }, // 生成
              tooltip: title,
            };
          } else {
            // 有定制
            // console.log('请检测组件外侧slots是否与组件内部展示效果一致');
            d = {
              ...rest,
              tooltip: title,
              // title: '0-0',
            };
          }
        } else {
          d = {
            ...rest,
            tooltip: title,
            children: helper(item.children),
          };
        }
        tooltip_columns.push(d);

        return d;
      }
      return item;
    });
  };
}
