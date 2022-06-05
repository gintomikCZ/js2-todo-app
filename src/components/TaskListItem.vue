<template>
  <li :class="{
      'task-done': status === 'done',
      'task-started': status === 'started',
      'task-uncompleted': isUncompleted
    }"
    class="cursor-pointer"
    @mouseenter="showDescription = true"
    @mouseleave="showDescription = false"
    @click="onClick"
  >
    <div class="list-item-main">
      <div class="text-bold list-item-left">
        <priority-icon :priority="priority" :scale="0.4" />
        <span>{{ task }}</span>
      </div>
      <div class="text-right pr-1">
        <div class="text-small">{{ dateToDisplay }}</div>
      </div>
    </div>

    <transition name="slide-down">
      <div class="text-small text-left p-1" v-if="showDescription">{{ description }}</div>
    </transition>
  </li>
</template>

<script>

  import { formatDate } from '../utils/dateUtils.js'
  import PriorityIcon from './PriorityIcon.vue'
  export default {
    name: 'TaskListItem',
    data () {
      return {
        showDescription: false
      }
    },
    props: {
      taskid: Number,
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
      },
      // classObject () {
      //   return {
      //     'task-done': status === 'done',
      //     'task-started': status === 'started'
      //   }
      // },
      // classArray () {
      //   if (this.status === 'done') return ['task-done']
      //   if (this.status === 'started') return ['task-started']
      //   return []
      // }
      priorityToDisplay () {
        if (this. priority === 'high') return '!!!'
        return this.priority === 'standard' ? '!' : ''
      },
      isUncompleted () {
        if (this.status === 'done') return false
        const today = new Date()
        const taskDate = new Date(this.taskdate)
        return taskDate.getTime() < today.getTime()
      }
    },
    methods: {
      onClick () {
        this.$router.push('/taskdetail/' + this.taskid)
      }
    },
    components: { PriorityIcon }
  }
</script>

<style scoped lang="stylus">

@import '../styles/variables.styl'

.list-item-main
  display: flex
  justify-content: space-between
  align-items: center

.task-done
  background: $task-done-color
.task-started
  background: $task-started-color
.task-uncompleted
  background: $task-uncompleted-color

.list-item-left
  display: flex
  align-items: center

</style>
