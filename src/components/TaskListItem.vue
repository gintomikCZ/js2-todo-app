<template>
  <li
    :class="
      {
        'task-done': status === 'done',
        'task-started': status === 'started'
      }
    "
  >
    <div class="list-item-main" @click="showDescription = !showDescription">
      <div class="text-bold">{{ task }}</div>
      <div class="text-right">
        <div class="text-small">{{ dateToDisplay }}</div>
        <div class="text-small">{{ status }}</div>
        <div class="text-small">{{ priority }}</div>
      </div>
    </div>

    <transition name="slide-down">
      <div class="text-small text-left pt-1" v-if="showDescription">{{ description }}</div>
    </transition>
  </li>
</template>

<script>

  import { formatDate } from '../utils/dateUtils.js'
  export default {
    name: 'TaskListItem',
    data () {
      return {
        showDescription: false
      }
    },
    props: {
      task: String,
      taskdate: String,
      status: String, 
      priority: String, 
      description: {
        validator: (v) => typeof v === 'string' || v === null
      }
    },
    computed: {
      dateToDisplay () {
        return formatDate(this.taskdate)
      }
    }
  }
</script>

<style scoped lang="stylus">

@import '../styles/variables.styl'

.list-item-main
  display: flex
  justify-content: space-between

.task-done
  background: $task-done-color
.task-started
  background: $task-started-color

</style>
