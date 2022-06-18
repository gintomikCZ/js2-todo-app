<template>

  <h1>Project Detail</h1>
  <t-loading v-if="loading" />

  <template v-else>

    <t-button label="edit" @clicked="onEditClicked" class="mr-1" />
    <t-button label="add task" @clicked="onAddTaskClicked" :class="{ 'mr-1': !tasks.length }" />
    <t-button v-if="!tasks.length" label="delete project" @clicked="onDeleteProjectClicked" />

    <ul class="detail-list">
      <li>
        <div>project name: </div>
        <div class="text-bold text-right">{{ project.project }}</div>
      </li>
      <li>
        <div>description: </div>
        <div class="text-bold text-right">{{ project.description || '-' }}</div>
      </li>
      <li>
        <div>start date: </div>
        <div class="text-bold text-right">{{ project.start }}</div>
      </li>
      <li>
        <div>finish date: </div>
        <div class="text-bold text-right">{{ project.ends }}</div>
      </li>
    </ul>

    <task-list v-if="tasks.length" :tasks="tasks" />
    <p v-else>This project contains no tasks.</p>

  </template>
</template>

<script>

import db from '../utils/db.js'
import { formatDate } from '../utils/dateUtils.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'
import TaskList from '../components/TaskList.vue'

export default {


  name: 'ProjectDetailPage',
  data () {
    return {
      project: {},
      tasks: [],
      loading: true
    }
  },
  created () {
    // vypsat z DB úkoly, které mají projectid shodné s naším projektem
    const getProjectTasks = db.get('tasks?projectid=' + this.$route.params.id).then(data => {
      this.tasks = data
    })

    // vybrat z DB záznam našeho projektu (podle id)
    const getProjectRecord = db.get('projects/' + this.$route.params.id).then(record => {
      this.project = {
        project: record.project,
        description: record.description,
        start: formatDate(record.start),
        ends: formatDate(record.ends)
      }
    })

    Promise.all([getProjectTasks, getProjectRecord]).then(() => {
      this.loading = false
    })

  },
  methods: {
    onEditClicked () {
      this.$router.push('/projectform/' + this.$route.params.id)
    },
    onAddTaskClicked () {
      this.$router.push('/taskform/' + this.$route.params.id)
    },
    onDeleteProjectClicked () {
      return db.delete('projects', { id: this.$route.params.id }).then(() => {
        this.$router.push('/projects')
      })
    }
  },
  components: { TLoading, TButton, TaskList }
}

</script>

<style lang="stylus">

</style>
