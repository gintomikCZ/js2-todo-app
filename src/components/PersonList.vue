<template>
  <h2>persons</h2>
  <ul class="person-list">
    <li v-for="person in persons" :key="person.id">
      <div>{{ person.last + ' ' + person.first }}</div>
      <div @click="onDeleteClicked(person.id)">delete</div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'PersonList',
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  emits: ['delete-person-task'],
  computed: {
    personsSorted () {
      return this.persons.slice().sort((a, b) => {
        let aFull = a.last + a.first
        let bFull = b.last + b.first
        return aFull.localeCompare(bFull)

      })
    }
  },
  methods: {
    onDeleteClicked (par) {
      this.$emit('delete-person-task', par)
    }
  }
}


</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.person-list
  border: 1px solid $border
  list-style-type: none
  width: 80%
  max-width: 450px
  margin: 0 auto
  padding: 0
  & li
    padding: .25em .5em
    display: flex
    justify-content: space-between
    &:not(:last-child)
      border-bottom: 1px solid $border-light
    & div:nth-child(2)
      cursor: pointer
      transition: transform .4s ease
      &:hover
        transform: scale(1.1)


</style>