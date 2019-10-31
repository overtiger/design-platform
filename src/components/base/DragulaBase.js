import dragula from 'dragula'

let dark = dragula()
export { dark }

export default {
  methods: {
    dragulaHandle(el) {
      dragula([el.target.parentElement], {
        removeOnSpill: true,
        direction: '',
        copy: true,
      })
        .on('drag', function(el) {
          console.log('drag', el)
        })
        .on('drop', function(el) {
          console.log('drop', el)
        })
        .on('over', function(el, container) {
          console.log('over', el, container)
        })
        .on('out', function(el, container) {
          console.log('out', el, container)
        })
    },
  },
}
