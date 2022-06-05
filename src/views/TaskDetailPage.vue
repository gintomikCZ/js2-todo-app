<template>
  <h1>task detail</h1>

  <t-loading v-if="loading" />
  <template v-else>

    <t-button label="edit" class="mr-1" @clicked="onEditClicked" />
    
    <t-button v-if="task.status === 'started'" label="mark as done" @clicked="changeStatus('done')"/>

    <t-button v-else-if="task.status === 'done'" label="mark as started" @clicked="changeStatus('started')"/>

    <ul class="detail-list">
      <li>
        <div>task name: </div>
        <div class="text-bold">{{ task.task }}</div>
      </li>
      <li>
        <div>project name: </div>
        <div class="text-bold">{{ task.project }}</div>
      </li>
      <li>
        <div>description</div>
        <div class="text-bold">{{ task.description }}</div>
      </li>
      <li>
        <div>status: </div>
        <div class="text-bold">{{ task.status }}</div>
      </li>
      <li>
        <div>priority: </div>
        <div class="text-bold">{{ task.priority }}</div>
      </li>
      <li>
        <div>task date: </div>
        <div class="text-bold">{{ dateToDisplay }}</div>
      </li>
    </ul>
  </template>
</template>

<script>
  import db from '../utils/db.js'
  import { formatDate } from '../utils/dateUtils.js'
  import TLoading from '../components/TLoading.vue'
  import TButton from '../components/TButton.vue'

  export default {
    name: 'TaskDetailPage',
    data () {
      return {
        loading: true,
        task: {}
      }
    },
    created () {
      db.get('tasks/' + this.$route.params.id).then((record) => {
        this.task = record
        this.loading = false
      })
    },
    computed: {
      dateToDisplay () {
        return formatDate(this.task.taskdate)
      }
    },
    methods: {
      onEditClicked () {
        this.$router.push('/taskformedit/' + this.$route.params.id)
      },
      changeStatus (par) {
        db.put('/tasks', {
          id: this.$route.params.id,
          status: par
        }).then(() => {
          this.$router.push('/projects/' + this.task.projectid)
        })
      }
    },
    components: { TLoading, TButton }
  }

</script>