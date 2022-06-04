<template>
  <button @click="onClick">{{ label }}</button>
</template>

<script>
  export default {
    name: 'TButton',
    props: {
      label: String
    },
    methods: {
      onClick () {
        this.$emit('clicked')
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

button
  background: $secondary
  color: white
  padding: .5em .8em
  font-size: 1.1rem
  border-radius: 5px
  font-weight: bold
  border: none
  cursor: pointer
  transition: all .3s ease
  &:hover
    background: darken($secondary, 10)
  &:active
    transform: scale(1.1)

</style>