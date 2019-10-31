<template>
  <a-button type="primary" @mousedown="dropHandle" :style="style">{{text}}</a-button>
</template>
<script>
import ComponentBase from '../base/GoComponentBase'
export default {
  extends: ComponentBase,
  computed: {
    style() {
      return { position: 'absolute', top: this.top, left: this.left }
    },
  },
  data() {
    return {
      text: 'primary',
      top: '',
      left: '',
    }
  },
}
</script>