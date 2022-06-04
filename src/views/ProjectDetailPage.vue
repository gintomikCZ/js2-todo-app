<template>

  <h1>Project Detail</h1>

  <t-loading v-if="loading" />

  <template v-else>
    <t-button label="edit" @clicked="onClicked" />
    <ul class="detail-list">
      <li>
        <div>project name: </div>
        <div class="text-bold">{{ project.project }}</div>
      </li>
      <li>
        <div>description: </div>
        <div class="text-bold">{{ project.description || '-' }}</div>
      </li>
      <li>
        <div>start date: </div>
        <div class="text-bold">{{ project.start }}</div>
      </li>
      <li>
        <div>finish date: </div>
        <div class="text-bold">{{ project.ends }}</div>
      </li>
    </ul>

    <task-list :tasks="tasks"/>

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
    onClicked () {
      this.$router.push('/projectform/' + this.$route.params.id)
    }
  },
  components: { TLoading, TButton, TaskList }
}

</script>

<style lang="stylus">
  .detail-list
    list-style-type: none
    margin: 2rem auto
    padding: 0
    width: 350px
    & li
      display: flex
      justify-content: space-between
      padding: .5rem

</style>
