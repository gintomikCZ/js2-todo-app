<template>

  <ul class="t-list">
    <li class="bg-secondary text-light text-bold">
      <div>{{ title }}</div>
      <div>{{ titleRight }}</div>
    </li>

    <li v-for="item in items" :key="item.id" class="clickable" @click="onClick(item.id)">
      <div>
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
      <div class="dates">
        <div class="description">{{ item.rightTop }}</div>
        <div class="description">{{ item.rightBottom }}</div>
      </div>
    </li>
  </ul>

</template>

<script>

export default {
  name: 'TList',
  props: {
    title: {
      type: String
    },
    titleRight: {
      type: String
    },
    items: {
      type: Array
    },
    routeTo: {
      type: String
    }
  },
  methods: {
    onClick (id) {
      const route = '/' + this.routeTo + '/' + id
      this.$router.push(route)
    }
  }
}

</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl'

.t-list
  list-style-type: none
  margin: 0
  padding: 0
  border: 1px solid $border
  width: 80%
  margin: 0 auto

.t-list li
  text-align: left
  padding: .5rem 1rem
  display: flex
  justify-content: space-between
  &:not(:last-child)
    border-bottom: 1px solid $border-light

.title
  font-weight: bold
  font-size: $font-size-header

.description
  font-size: $font-size-description

.dates
  display: flex
  flex-direction: column
  justify-content: space-between
  text-align: right

.clickable
  cursor: pointer
  &:hover
    background: $highlight

</style>