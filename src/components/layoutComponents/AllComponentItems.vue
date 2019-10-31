<template>
  <div ref="list">
    <ComponentItem componentName='日历'></ComponentItem>
    <ComponentItem componentName='按钮'></ComponentItem>
  </div>
</template>
<script>
import ComponentItem from './ComponentItem.vue'
import dragula from 'dragula'
import GoButton from '../GoComponents/GoButton.vue'
import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import antD from 'ant-design-vue'
Vue.use(antD)

let drak
const goBtn = Vue.extend(GoButton)
export default {
  components: { ComponentItem },
  mounted() {
    drak = dragula([this.$refs.list], {
      copy: true,
      direction: 'mixed',
    })
      .on('drag', function() {})
      .on('drop', function(el, container) {
        if (container) {
          //如果目标container存在，即拖拽到目标container
          const instance = new goBtn()

          container.appendChild(instance.$mount().$el)
          var rect = container.getBoundingClientRect()
          const top = window.event.clientY - rect.y
          const left = window.event.clientX - rect.x

          instance.top = top + 'px'
          instance.left = left + 'px'
          instance.text = `鼠标位置${window.event.clientX}，${window.event.clientY}`
        }
      })
      .on('over', function() {})
      .on('out', function(el) {
        el.style.display = 'none' //拖到container中的el影藏，方便显示目标组件。
      })
  },
}
export function initTarget(target) {
  if (target && !drak.containers.includes(target)) {
    drak.containers.push(target)
  }
  console.log('containers', drak.containers)
}
</script>