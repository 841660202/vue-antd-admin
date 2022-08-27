<template>
  <div style="background-color: #fff;padding: 10px;">
    <p>被授权人：{{ current.name }}</p>
    <a-divider orientation="left">
      <small style="font-weight: normal;">转授权额度信息设置</small>
    </a-divider>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      :pagination="false"
      rowKey="labelId"
      size="small"
      :scroll="{ x: 'calc(80%)' }"
    >
      <!-- 自定义表头内容 -->
      <!-- 定制经理 -->
      <template slot="addUser"
        >{{ current.name }}
        <a-button type="link" @click="() => handleAddUser()">
          +增加
        </a-button>
      </template>
      <!-- 定制用户 -->
      <template v-for="user in columnUsers">
        <!-- 用户选择 -->
        <div :key="user.slots.title" :slot="user.slots.title">
          <!-- {{ user.slots.title }} -->
          用户
          <a-select
            size="small"
            show-search
            :value="value"
            placeholder="search text"
            style="width: 100px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="(item) => handleChangeUser(item, user)"
            class="mr20"
          >
            <a-select-option v-for="d in userOptions1" :key="d.value">
              {{ d.text }}
            </a-select-option>
          </a-select>

          <span class="danger pd10">从</span>
          <a-select
            size="small"
            show-search
            :value="value"
            placeholder="search text"
            style="width: 100px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="(item) => handleChangeCopyUser(item, user)"
          >
            <a-select-option v-for="d in userOptions2" :key="d.value">
              {{ d.text }}
            </a-select-option>
          </a-select>
          <a-button
            type="link"
            class="danger"
            @click="() => handleClickCopyAuthAmt(true, user)"
          >
            复制
          </a-button>

          <a-popconfirm
            placement="top"
            @confirm="() => handleDeleteUser(user)"
            title="确认要删除该用户吗？"
          >
            <a-button type="link" class="danger">
              删除
            </a-button>
          </a-popconfirm>
        </div>
        <!-- 开始时间 -->
        <div :key="user.children[2].key" :slot="user.children[2].slots.title">
          生效日
          <a-date-picker
            @change="(v) => handleChangeDate(v, user, 'startDate')"
          >
            <a-icon
              type="setting"
              theme="filled"
              style="color: #1890ff;cursor: pointer;"
            />
          </a-date-picker>
        </div>
        <!-- 结束时间 -->
        <div :key="user.children[3].key" :slot="user.children[3].slots.title">
          到期日
          <a-date-picker @change="(v) => handleChangeDate(v, user, 'endDate')">
            <a-icon
              type="setting"
              theme="filled"
              style="color: #1890ff;cursor: pointer;"
            />
          </a-date-picker>
        </div>
      </template>
      <!-- 自定义内容 -->
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >Edit</a
            >
          </span>
        </div>
      </template>
    </a-table>
    <div class="center actions-wrap">
      <a-space>
        <a-button size="small" type="primary" @click="() => handleSave()">
          保存
        </a-button>
        <a-button size="small" type="primary" @click="() => handleSubmit()">
          提交
        </a-button>
        <a-button size="small" type="danger" @click="() => handleClose()">
          关闭
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import {
  mock_api_auth_datas,
  format2TransAuthTable,
  formatTransAuthTable2Form,
  initData2Columns,
  formatColumnUser,
  initData2ColumnUsers,
  mock_api_user_auth_amt,
  defaultColumns,
} from "./auth";

export default {
  data() {
    return {
      current: { name: "王经理" },
      userCount: 0,
      data: [],
      editingKey: "",
      columnUsers: [],
      userOptions1: [{ value: "001", text: "小明" }],
      userOptions2: [{ value: "101", text: "小白" }],
    };
  },
  created() {
    // 初始化table data数据
    const data = format2TransAuthTable(mock_api_auth_datas);
    this.data = data;
    // 初始化table columns数据
    this.columns = initData2Columns(mock_api_auth_datas);

    const columnUsersFormatData = initData2ColumnUsers(mock_api_auth_datas);

    this.userCount = columnUsersFormatData.userCount;
    this.columnUsers = columnUsersFormatData.columnUsers;
  },

  methods: {
    // 获取用户之前授权额度,并按照filed进行更新
    async handleGetAuthAmtBef2UpdateDatas(delegatedUser, columnUser, field) {
      const { uuid } = columnUser;
      const params = { labelId: [""], delegatedUser };
      params.labelId = this.data?.map((item) => item.labelId);
      // 去后端请求数据
      const fromUserAuthAmts = await mock_api_user_auth_amt;

      this.data = this.data.map((item, index) => {
        // 如果乱序，在此处进行查询处理
        return {
          ...item,
          [`userIndex_${uuid}_${field}`]: fromUserAuthAmts[index].authAmt,
        };
      });
    },
    // 拷贝其他用户授权额度(直接触发参数少，手动触发参数多)
    async handleClickCopyAuthAmt(
      manual /**是否手动触发 */,
      columnUser,
      fromUser
    ) {
      let uuid = columnUser.uuid;
      let _fromUser;
      if (manual) {
        // 手动情况, 数据已经被上一操作，存到copyUser
        _fromUser = columnUser.copyUser;
      } else {
        // 非手动操作，直接从 fromUser获取
        _fromUser = fromUser;
      }

      console.log("_fromUser", _fromUser, manual);
      // 检测是否从已有用户中获取授权额度
      const fdIndex = this.columnUsers.findIndex(
        (item) =>
          !!item?.user?.delegatedUserName &&
          item?.user?.delegatedUserName === _fromUser?.delegatedUserName
      );
      console.log("fdIndex", fdIndex);

      if (fdIndex > -1) {
        const fromUUID = this.columnUsers[fdIndex].uuid;
        // 存在，直接拿用户的当前授权数据填充
        this.data = this.data.map((item) => {
          // 如果乱序，在此处进行查询处理
          return {
            ...item,
            // [`userIndex_${uuid}_authAmt`]: fromUserAuthAmts[index].authAmt,
            [`userIndex_${uuid}_authAmt`]: item[
              `userIndex_${fromUUID}_authAmt`
            ],
          };
        });
      } else {
        // 不存在，请求后台获取fromUser的数据填充
        this.handleGetAuthAmtBef2UpdateDatas(
          fromUser?.delegatedUserName,
          columnUser,
          "authAmt"
        );
      }
    },
    updateUserAuthAmtField() {},
    // 更新用户数据
    handleUpdateUser(columnUser) {
      console.log("user", columnUser);
      const { uuid } = columnUser;
      // 更新data数据
      // this.data = this.columnUsers.filter((item) => item.uuid !== uuid);
      // // 更新columnUsers
      // this.columnUsers = this.columnUsers.filter((item) => item.uuid !== uuid);
      // // 更新 columns
      // this.columns = this.columns.filter((item) => item.uuid !== uuid);
    },
    handleDeleteUser(user) {
      console.log("user", user);
      const { uuid } = user;
      // 删除 columnUsers
      this.columnUsers = this.columnUsers.filter((item) => item.uuid !== uuid);
      // 删除 columns
      this.columns = this.columns.filter((item) => item.uuid !== uuid);
    },
    handleAddUser() {
      this.userCount++;
      const userItem = formatColumnUser({}, this.userCount);

      this.columns.splice(3, 0, userItem);

      this.columnUsers.push(userItem);
      console.log("this.columns", this.columns);
      console.log("this.columnUsers", this.columnUsers);
    },
    handleChangeUser(selectUser, columnUser) {
      // 更新选中的用户
      const fdIndex = this.columnUsers.findIndex(
        (item) => item.uuid === columnUser.uuid
      );
      const target = this.columnUsers[fdIndex];
      target.user = {
        delegatedUser: selectUser.delegatedUser,
        delegatedUserName: selectUser.delegatedUserName,
      };
      this.$set(this.columnUsers, fdIndex, target);

      // 获取用户数据，更新 “授权额度(亿元) (生效中)”
      this.handleGetAuthAmtBef2UpdateDatas(
        selectUser.delegatedUser,
        columnUser,
        `authAmtBef`
      );
    },
    async handleChangeCopyUser(fromUser, columnUser) {
      const { uuid } = columnUser;
      const target = this.columnUsers[uuid];
      target.copyUser = fromUser;
      this.$set(this.columnUsers, uuid, target);
      // this.handleClickCopyAuthAmt(false, columnUser, fromUser);
    },
    // 变更时间
    handleChangeDate(date, columnUser, filed) {
      const { uuid } = columnUser;
      this.data = this.data.map((item) => {
        // 如果乱序，在此处进行查询处理
        return {
          ...item,
          // [`userIndex_${uuid}_authAmt`]: fromUserAuthAmts[index].authAmt,
          [`userIndex_${uuid}_${filed}`]: date.format("YYYY-MM-DD"),
        };
      });
    },
    handleSave() {
      console.log("this.data", this.data);
      const formdatas = this.data.map((record) => {
        return {
          labelId: record.labelId,
          labelName: record.labelName,
          authRemark: record.authRemark,
          authType: record.authType,
          authAmt: record.authAmt,
          authAmtStr: record.authAmtStr,
          startDate: record.startDate,
          endDate: record.endDate,
          delegateUserList: this.columnUsers.map((columnUser) => {
            const { uuid } = columnUser;
            return {
              // 用户
              delegatedUser: columnUser.user.delegatedUser,
              delegatedUserName: columnUser.user.delegatedUserName,

              authType: record.authType,
              authAmt: +`${record[`userIndex_${uuid}_authAmt`]}`,
              authAmtStr: `${record[`userIndex_${uuid}_authAmt`]}`,
              authAmtBef: +`${record[`userIndex_${uuid}_authAmtBef`]}`,
              authAmtBefStr: `${record[`userIndex_${uuid}_authAmtBef`]}`,
              startDate: `${record[`userIndex_${uuid}_startDate`]}`,
              endDate: `${record[`userIndex_${uuid}_endDate`]}`,
            };
          }),
        };
      });

      console.log("formdatas", formdatas);
    },
    handleSubmit() {},
    handleClose() {
      this.$confirm({
        title: "确定进行关闭吗?",
        okType: "danger",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.danger {
  color: red;
}
.mr20 {
  margin-right: 20px;
}
.pd10 {
  padding: 0 10px;
}
.center {
  text-align: center;
}
.actions-wrap {
  margin-top: 10px;
}
</style>
