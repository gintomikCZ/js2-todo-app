<template>
  <ul class="task-list">

    <task-list-item
      v-for="task in tasks"
      :key="task.id"
      :taskid="task.id"
      :task="task.task"
      :description="task.description"
      :taskdate="task.taskdate"
      :priority="task.priority"
      :status="task.status"
    />

  </ul>

</template>

<script>

import TaskListItem from './TaskListItem.vue'
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showDescription: false
    }
  },
  created () {
    console.log(this.tasks)
  },
  components: { TaskListItem }
}

</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl'

.task-list
  list-style-type: none
  margin: 0 auto
  padding: 0
  border: 1px solid $border
  width: 80%
  max-width: 450px
  & li
    &:not(:last-child)
      border-bottom: 1px solid $border

</style>