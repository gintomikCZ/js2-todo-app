<template>
  <h1>new task</h1>
  <t-loading v-if="loading" />
  <template v-else>
    <h2>{{ 'project: ' + project.project }}</h2>
    <div class="text-small">{{ project.description }}</div>
    <div class="text-small mb-2">
      <span>{{ 'start date: ' + projectStartDate + ', ' }}</span>
      <span>{{ 'finish date: ' + projectFinishDate }}</span>
    </div>
    <form @submit="onSubmit">
      <t-control
        v-for="klic in controlsKeys"
        :key="klic" :control="klic"
        :label="controls[klic].label"
        :type="controls[klic].type"
        :value="task[klic]"
        :options="controls[klic].options"
        @has-input="onHasInput" />
      <t-button label="submit" />
    </form>
  </template>
</template>

<script>
  import db from '../utils/db.js'
  import { formatDate } from '../utils/dateUtils.js'
  import TLoading from '../components/TLoading.vue'
  import TControl from '../components/TControl.vue'
  import TButton from '../components/TButton.vue'
  export default {
    name: 'TaskFormPage',
    data () {
      return {
        loading: true,
        project: {},
        task: {
          task: '',
          description: '',
          status: '',
          priority: '',
          taskdate: '',
          projectid: this.$route.params.projectid
        },
        controls: {
          task: {
            type: 'text',
            label: 'task name'
          },
          description: {
            type: 'textarea',
            label: 'description'
          },
          status: {
            type: 'select',
            label: 'status',
            options: ['', 'started', 'done']
          },
          priority: {
            type: 'select',
            label: 'priority',
            options: ['', 'low', 'standard', 'high']
          },
          taskdate: {
            type: 'date',
            label: 'date to complete'
          }
        }
      }
    },
    created () {
      if (this.$route.params.projectid) {
        db.get('projects/' + this.$route.params.projectid).then(record => {
          this.project = record
          this.loading = false
        })
      } else {
        db.get('tasks/' + this.$route.params.id)
          .then(record => {
            this.task = record
            this.projectName = record.project
          })
          .then(() => {
            db.get('projects/' + this.task.projectid).then(projectRecord => {
              console.log(projectRecord)
              this.project = projectRecord
              this.loading = false
            })
        })
      }
    },
    computed: {
      controlsKeys () {
        return Object.keys(this.controls)
      },
      projectStartDate () {
        return formatDate(this.project.start)
      },
      projectFinishDate () {
        return formatDate(this.project.ends)
      }
    },
    methods: {
      onHasInput (payload) { // { control: 'název kontrolky', value: 'hodnota' }
        this.task[payload.control] = payload.value
      },
      onSubmit (e) {
        e.preventDefault()
        if(!this.$route.params.id) {
          db.post('tasks', this.task).then(() => {
            this.$router.push('/projects/' + this.$route.params.projectid)
          })
        } else {
          db.put('tasks', {
            id: this.task.id,
            task: this.task.task,
            description: this.task.description,
            status: this.task.status,
            priority: this.task.priority,
            taskdate: this.task.taskdate
          }).then(() => {
            this.$router.push('/taskdetail/' + this.$route.params.id)
          })
        }
      }
    },
    components: { TLoading, TControl, TButton }
  }
</script>
<style scoped lang="stylus">
h1
  margin-bottom: 0
h2
  margin-top: 0
</style>