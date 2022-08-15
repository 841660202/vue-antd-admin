<template>
  <a-select placeholder="DictSelect 数据" style="width: 200px">
    <a-select-option v-for="item in dicts.value2" :value="item" :key="item">{{
      item
    }}</a-select-option>
  </a-select>
</template>
<script>
export default {
  name: "DictSelect",
  data() {
    return {};
  },
  computed: {
    dicts() {
      const value = this.$store.getters["account/dicts"];
      console.log("DictSelect value", value);
      return value;
    },
  },
};
</script>
