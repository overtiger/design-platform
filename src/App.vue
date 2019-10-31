<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <MenuItem @handleSeleted="handleSeleted($event)">
      </MenuItem>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
        <a-icon class="trigger right-btn" :type="!collapsed_right ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed_right = !collapsed_right" />
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '800px' }">
        <a-tabs v-model="activeKey" @edit="onEdit" type="editable-card">
          <a-tab-pane class="tab-content" v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
            {{pane.content}}
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>

    <a-layout-sider ref="rightList" :trigger="null" collapsible v-model="collapsed_right"
      style="background: antiquewhite; padding: 0;display: -webkit-box">
      <ComponentItems></ComponentItems>
    </a-layout-sider>
  </a-layout>
</template>
<script>
import ComponentItems from './components/layoutComponents/AllComponentItems.vue'
import { initTarget } from './components/layoutComponents/AllComponentItems.vue'

import MenuItem from './components/layoutComponents/Menu.vue'
import $ from 'jquery'

export default {
  data() {
    const panes = [
      // { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
    ]
    return {
      activeKey: 1,
      panes,
      collapsed: false,
      collapsed_right: false,
    }
  },
  components: {
    ComponentItems,
    MenuItem,
  },
  methods: {
    onEdit(targetKey, action) {
      console.log(targetKey, action)
      this[action](targetKey)
    },
    add() {},
    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter((pane) => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    },
    handleSeleted(value) {
      //点击菜单展示对应tab页
      if (this.panes.length == 0 || this.panes.filter((pane) => pane.key == value.id).length == 0) {
        this.panes.push({ key: value.id, title: value.text, content: '' })
        this.activeKey = value.id
      } else {
        this.activeKey = value.id
      }
    },
  },
  updated() {
    //将新生成的tab页记录为可拖拽容器
    let targets = $('.tab-content')
    for (let i = 0; i < targets.length; i++) {
      initTarget(targets[i])
    }
  },
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.right-btn {
  float: right;
}
.tab-content {
  height: -webkit-fill-available;
  position: relative; /*重要，影响内部组件的定位，内部组件相对于它定位 */
}
.go-btn {
  position: absolute;
  left: 100px;
  top: 0px;
}
</style>
