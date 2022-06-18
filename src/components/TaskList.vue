<template>
  <ul class="task-list">

    <task-list-item
      v-for="task in tasksSorted"
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

// { task: 'nazev', priority: 'high, low, standard', status: 'done, started', taskdate: '2022-01-15' }
// aSrtingString = 'AA2022-02-01'

import TaskListItem from './TaskListItem.vue'
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tasksSorted () {
      return this.tasks.slice().sort((a, b) => {
        let aSortingString = a.status === 'started' ? 'A' : 'B'
        let bSortingString = b.status === 'started' ? 'A' : 'B'
        if (a.priority === 'high') {
          aSortingString += 'A'
        } else {
          aSortingString += a.priority === 'standard' ? 'B' : 'C'
        }
        if (b.priority === 'high') {
          bSortingString += 'A'
        } else {
          bSortingString += b.priority === 'standard' ? 'B' : 'C'
        }
        aSortingString += a.taskdate
        bSortingString += b.taskdate
        return aSortingString.localeCompare(bSortingString)
      })
    }
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