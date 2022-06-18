<template>

  <h1>Person Detail</h1>
  <t-loading v-if="loading" />

  <template v-else>

    <t-button
      label="edit"
      @clicked="onClicked"
      :class="{'mr-1': !tasks.length }"
    />
    <t-button
      v-if="!tasks.length"
      label="delete person"
      @clicked="onDeleteClicked"
    />

    <ul class="detail-list">
      <li>
        <div>first name: </div>
        <div class="text-bold text-right">{{ person.first }}</div>
      </li>
      <li>
        <div>last name: </div>
        <div class="text-bold text-right">{{ person.last }}</div>
      </li>
      <li>
        <div>position: </div>
        <div class="text-bold text-right">{{ person.position || '-' }}</div>
      </li>
      <li>
        <div>skills: </div>
        <div class="text-bold text-right">{{ person.skills || '-' }}</div>
      </li>
      <li>
        <div>email: </div>
        <div class="text-bold text-right">{{ person.email }}</div>
      </li>
      <li>
        <div>phone: </div>
        <div class="text-bold text-right">{{ person.phone || '-' }}</div>
      </li>
    </ul>

    <task-list v-if="tasks.length" :tasks="tasksToDisplay" />

    <p v-else>{{ person.first + ' ' + person.last + ' has assigned no tasks.' }}</p>

  </template>
</template>

<script>

import db from '../utils/db.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'
import TaskList from '../components/TaskList.vue'

export default {
name: 'PersonDetailPage',
data () {
  return {
    person: {},
    loading: true,
    tasks: []
  }
},
created () {
  const prom1 = db.get('persons/' + this.$route.params.id).then(record => {
    this.person = record
  })
  const prom2 = db.get('personstasks?personid=' + this.$route.params.id).then(data => {
    this.tasks = data
  })
  Promise.all([prom1, prom2]).then(() => {
    this.loading = false
  })
},
computed: {
  tasksToDisplay() {
    return this.tasks.map(item => {
      return {
        id: item.taskid,
        task: item.task,
        taskdate: item.taskdate,
        status: item.status,
        priority: item.priority,
        description: item.description
      }
    })
  }
},
methods: {
  onClicked () {
    this.$router.push('/personform/' + this.$route.params.id)
  },
  onDeleteClicked () {
    return db.delete('persons', { id: this.$route.params.id }).then(() => {
      this.$router.push('/persons')
    })
  }
},
  components: { TLoading, TButton, TaskList }
}

</script>

  <style lang="stylus">


  </style>
