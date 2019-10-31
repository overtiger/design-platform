<template>
  <div>
    <a-button type="link" @click="addItem">添加页面</a-button>
    <a-button type="link" @click="deleteItem">删除页面</a-button>

    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @select="handleSeleted" :defaultOpenKeys="['sub']">
      <a-sub-menu theme="dark" key="sub">
        <span slot="title">
          <a-icon type="appstore" /><span>所有页面</span></span>
        <a-menu-item v-for="(item) in menuItems" :key="item.id" @dblclick="item.isModify = true">
          <a-icon type="user" />
          <span v-show="!item.isModify">{{ item.text | noempty}}</span>
          <input v-show="item.isModify" v-model="item.text" @blur="item.isModify= false" />
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: 1,
      menuItems: [{ id: 1, text: '自定义页面', isModify: false }],
      isModify: false,
      selectedId: 0,
    }
  },
  filters: {
    noempty: (value) => {
      if (!value) return '自定义页面'
      return value
    },
  },
  methods: {
    addItem() {
      this.itemId++
      this.menuItems.push({ id: this.itemId, text: '自定义页面' + this.itemId, isModify: false })
    },
    handleSeleted(value) {
      this.selectedId = value.key
      let selectedValue = {}
      for (let item of this.menuItems) {
        if (item.id === this.selectedId) {
          selectedValue = item
          break
        }
      }
      //将选中的item内容抛出去。
      this.$emit('handleSeleted', selectedValue)
    },
    deleteItem() {
      const a = this.menuItems.findIndex((item) => item.id == this.selectedId)
      this.menuItems.splice(a, a + 1)
    },
  },
}
</script>
<style scoped>
input {
  color: black;
}
</style>