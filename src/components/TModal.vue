<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-content">
      <div class="first-line">
        <div @click="onClick">X</div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TModal',
  props: {
    show: Boolean
  },
  methods: {
    onClick () {
      this.$emit('close-me')
    }
  }
}

</script>

<style lang="stylus" scoped>

.modal-mask
  position: fixed
  width: 100vw
  height: 100vh
  background: rgba(0, 0, 0, 0.5)
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center
  z-index: 1

.modal-content
  background: white
  max-width: 80%
  max-height: 80%
  padding: 1rem
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3)

.first-line
  display: flex
  justify-content: flex-end
  & div
    font-weight: bold
    cursor: pointer
</style>