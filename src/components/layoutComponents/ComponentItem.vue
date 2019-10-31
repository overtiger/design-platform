<template>
  <div class="component-parent">
    <img src="../../assets/logo.png" />
    <span>{{componentName}}</span>
  </div>
</template>
<script>
import DragulaBase from '../base/DragulaBase'
export default {
  extends: DragulaBase,
  props: {
    //:src="imgUrl"
    componentName: { default: 'component01', required: true },
  },
}
</script>
<style scoped>
.component-parent {
  border: 1px solid grey;
  width: 80px;
  height: 80px;
  margin: 10px;
  text-align: center;
}
img {
  width: 80px;
  height: 60px;
}
</style>