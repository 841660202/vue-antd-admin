// 模拟后台数据
export const mock_api_auth_datas = [
  {
    labelId: "授权分类1",
    labelName: "授权分类名称1",
    authRemark: "授权要素",
    authType: "授权类型",
    authAmt: "授权额度(亿元)",
    authAmtStr: "授权额度(亿元)",
    startDate: "生效日",
    endDate: "到期日",
    delegateUserList: [
      {
        delegatedUser: "chailong",
        delegatedUserName: "陈哈咯",
        authType: "授权类型",
        authAmtBef: "设置前额度",
        authAmtBefStr: "设置前额度str",
        authAmt: "授权额度",
        authAmtStr: "授权额度str",
        startDate: "生效日",
        endDate: "到期日",
      },
      {
        delegatedUser: "wrong",
        delegatedUserName: "陈哈咯",
        authType: "授权类型",
        authAmtBef: "设置前额度",
        authAmtBefStr: "设置前额度str",
        authAmt: "授权额度",
        authAmtStr: "授权额度str",
        startDate: "生效日",
        endDate: "到期日",
      },
    ],
  },
  {
    labelId: "授权分类2",
    labelName: "授权分类名称2",
    authRemark: "授权要素",
    authType: "授权类型",
    authAmt: "授权额度(亿元)",
    authAmtStr: "授权额度(亿元)",
    startDate: "生效日",
    endDate: "到期日",
    delegateUserList: [
      {
        delegatedUser: "chailong",
        delegatedUserName: "陈哈咯",
        authType: "授权类型",
        authAmtBef: "设置前额度",
        authAmtBefStr: "设置前额度str",
        authAmt: "授权额度",
        authAmtStr: "授权额度str",
        startDate: "生效日",
        endDate: "到期日",
      },
      {
        delegatedUser: "wrong",
        delegatedUserName: "陈哈咯",
        authType: "授权类型",
        authAmtBef: "设置前额度",
        authAmtBefStr: "设置前额度str",
        authAmt: "授权额度",
        authAmtStr: "授权额度str",
        startDate: "生效日",
        endDate: "到期日",
      },
    ],
  },
];

export const mock_api_auth_users = [
  {
    delegatedUser: "chl",
    delegatedUserName: "陈哈咯",
    authType: "授权类型",
    authAmtBef: "设置前额度",
    authAmtBefStr: "设置前额度str",
    authAmt: "授权额度",
    authAmtStr: "授权额度str",
    startDate: "生效日",
    endDate: "到期日",
  },
  {
    delegatedUser: "wr",
    delegatedUserName: "王蓉",
    authType: "授权类型",
    authAmtBef: "设置前额度",
    authAmtBefStr: "设置前额度str",
    authAmt: "授权额度",
    authAmtStr: "授权额度str",
    startDate: "生效日",
    endDate: "到期日",
  },
  {
    delegatedUser: "sm",
    delegatedUserName: "三毛",
    authType: "授权类型",
    authAmtBef: "设置前额度",
    authAmtBefStr: "设置前额度str",
    authAmt: "授权额度",
    authAmtStr: "授权额度str",
    startDate: "生效日",
    endDate: "到期日",
  },
];

export const mock_api_user_auth_amt = [
  {
    labelId: "授权分类1",
    delegatedUser: "",
    authType: "授权类型",
    authAmt: 100,
    startDate: "生效日",
    endDate: "到期日",
  },
  {
    labelId: "授权分类2",
    authRemark: "授权要素",
    authType: "授权类型",
    authAmt: 10,
    authAmtStr: "授权额度(亿元)",
    startDate: "生效日",
    endDate: "到期日",
  },
]

/**
 * 后台数据格式化成前端table数据
 * @param {*} data
 * @returns
 */
export function format2TransAuthTable(data) {
  if (Array.isArray(data)) {
    return data?.map((item) => {
      // tabl 每行数据
      const record = {
        ...item,
      };
      // 数据重新格式化
      item?.delegateUserList?.forEach((user, index) => {
        record[`userIndex_${index}_delegatedUser`] = user.delegatedUser;
        record[`userIndex_${index}_delegatedUserName`] = user.delegatedUserName;
        record[`userIndex_${index}_authType`] = user.authType;
        record[`userIndex_${index}_authAmtBef`] = user.authAmtBef;
        record[`userIndex_${index}_authAmtBefStr`] = user.authAmtBefStr;
        record[`userIndex_${index}_authAmt`] = user.authAmt;
        record[`userIndex_${index}_authAmtStr`] = user.authAmtStr;
        record[`userIndex_${index}_startDate`] = user.startDate;
        record[`userIndex_${index}_endDate`] = user.endDate;
      });
      return record;
    });
  } else {
    return [];
  }
}
// format2TransAuthTable(data);
/**
 * 前端table数据转化成后台需要数据
 * @param {*} data
 */
export function formatTransAuthTable2Form(data) {}

export const defaultColumns = [
  {
    title: "授权分类",
    dataIndex: "labelName",
    width: 200,
    fixed: "left",
  },
  {
    title: "授权要素",
    dataIndex: "authRemark",
    width: 200,
  },
  {
    titleName: "经理",
    dataIndex: "adminName",
    slots: { title: "addUser" },
    width: 300,
    children: [
      {
        title: "授权额度(亿)",
        dataIndex: "authAmt",
        key: "authAmt",
        width: 100,
      },
      {
        title: "生效日",
        dataIndex: "startDate",
        key: "startDate",
        width: 100,
      },
      {
        title: "到期日",
        dataIndex: "endDate",
        key: "endDate",
        width: 100,
      },
    ],
  },
  // {
  //   title: "operation",
  //   dataIndex: "operation",
  //   width: 100,
  //   scopedSlots: { customRender: "operation" },
  // },
];

export function encodeColumnUser(user, index) {
  const columnUser = {
    uuid: index, // 唯一id
    user: user, // 存选中用户，用于回显
    dataIndex: `userIndex_${index}`, // 保证唯一性
    width: 420,
    slots: { title: `userIndex_${index}` },
    children: [
      {
        title: "授权额度(亿元)\n (生效中)",
        dataIndex: `userIndex_${index}_authAmtBef`,
        key: `userIndex_${index}_authAmtBef`,
        width: 120,
      },
      {
        title: "授权额度(亿)",
        dataIndex: `userIndex_${index}_authAmt`,
        key: `userIndex_${index}_authAmt`,
        width: 100,
        scopedSlots: { customRender: `userIndex_data_${index}` }, // 用于定制可编辑输入框
      },
      {
        dataIndex: `userIndex_${index}_startDate`,
        key: `userIndex_${index}_startDate`,
        width: 150,
        slots: { title: `userIndex_${index}_startDate` },
      },
      {
        dataIndex: `userIndex_${index}_endDate`,
        key: `userIndex_${index}_endDate`,
        width: 150,
        slots: { title: `userIndex_${index}_endDate` },
      },
    ],
  };
  return columnUser;
}

export function initData2Columns(data) {
  const columns = [...defaultColumns];
  if (Array.isArray(data) && data.length > 0) {
    // 取列表第一行数据计算 table 用户部分表头
    data[0].delegateUserList?.forEach((item, index) => {
      columns.push(encodeColumnUser(item, index));
    });
  }

  return columns;
}

export function initData2ColumnUsers(data) {
  const columnUsers = [];
  let userCount = 0;
  if (Array.isArray(data) && data.length > 0) {
    // 取列表第一行数据计算 table 用户部分表头
    data[0].delegateUserList?.forEach((item, index) => {
      columnUsers.push(encodeColumnUser(item, index));
    });
    userCount = data[0].delegateUserList?.length ? data[0].delegateUserList?.length - 1 : 0;
  }

  return { columnUsers, userCount };
}

export function formUserDataByUUID(uuid, data) {}
