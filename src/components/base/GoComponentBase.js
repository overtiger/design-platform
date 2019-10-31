export default {
  methods: {
    dropHandle(e) {
      //记录元素的初始位置
      // console.log(e)
      const el = e.target
      const originalX = el.offsetLeft
      const originalY = el.offsetTop

      //记录鼠标的初始位置
      const originalMouseX = e.clientX
      const originalMouseY = e.clientY

      el.style.position = 'absolute'

      document.onmousemove = (e) => {
        e.preventDefault()
        //计算鼠标移动的距离
        let disX = e.clientX - originalMouseX
        let disY = e.clientY - originalMouseY

        let left = originalX + disX
        let top = originalY + disY

        left = left < 0 ? 0 : left
        top = top < 0 ? 0 : top

        left = left > el.parentElement.clientWidth - el.clientWidth ? el.parentElement.clientWidth - el.clientWidth : left
        top = top > el.parentElement.clientHeight - el.clientHeight ? el.parentElement.clientHeight - el.clientHeight : top

        //移动当前元素
        el.style.left = left + 'px'
        el.style.top = top + 'px'
        el.style.boxShadow = '3px 1px 10px #333333'
        el.style.cursor = 'move'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        el.style.boxShadow = ''
      }
    },
  },
}
