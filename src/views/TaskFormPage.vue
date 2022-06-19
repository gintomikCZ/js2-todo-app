<template>
  <h1>{{ title }}</h1>

  <t-loading v-if="loading" />

  <template v-else>
    <h2>{{ 'project: ' + project.project }}</h2>
    <div class="text-small">{{ project.description }}</div>
    <div class="text-small mb-2">
      <span>{{ 'start date: ' + projectStartDate + ', ' }}</span>
      <span>{{ 'finish date: ' + projectFinishDate }}</span>
    </div>
    <t-form
      :controls="controls"
      @submited="onSubmited"
    />
  </template>
</template>

<script>
  import db from '../utils/db.js'
  import { formatDate } from '../utils/dateUtils.js'
  import TLoading from '../components/TLoading.vue'
  import TForm from '../components/TForm.vue'
  
  export default {
    name: 'TaskFormPage',
    data () {
      return {
        projectid: '',
        loading: true,
        project: {},
        controls: {
          task: {
            innitialValue: '',
            type: 'text',
            label: 'task name',
            validationRules: [
              { rule: 'required', message: 'please enter the project name' },
            ]
          },
          description: {
            innitialValue: '',
            type: 'textarea',
            label: 'description',
            validationRules: []
          },
          status: {
            innitialValue: '',
            type: 'select',
            label: 'status',
            options: ['', 'started', 'done'],
            validationRules: [
              { rule: 'required', message: 'please enter the project name' },
            ]
          },
          priority: {
            innitialValue: '',
            type: 'select',
            label: 'priority',
            options: ['', 'low', 'standard', 'high'],
            validationRules: [
              { rule: 'required', message: 'please enter the project name' },
            ]
          },
          taskdate: {
            innitialValue: '',
            type: 'date',
            label: 'date to complete',
            validationRules: [
              { rule: 'required', message: 'please enter the project name' },
            ]
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
            Object.keys(this.controls).forEach(key => {
              this.controls[key].innitialValue = record[key]
            })
            this.projectName = record.project
            this.projectid = record.projectid
          })
          .then(() => {
            db.get('projects/' + this.projectid).then(projectRecord => {
              this.project = projectRecord
              this.loading = false
            })
        })
      }
    },
    computed: {
      projectStartDate () {
        return formatDate(this.project.start)
      },
      projectFinishDate () {
        return formatDate(this.project.ends)
      },
      title () {
        return this.$route.params.id ? 'edit task' : 'new task'
      }
    },
    methods: {
      onSubmited (data) {
        if(!this.$route.params.id) {
          db.post('tasks', Object.assign(data, { projectid: this.$route.params.projectid })).then(() => {
            this.$router.push('/projects/' + this.$route.params.projectid)
          })
        } else {
          db.put('tasks', Object.assign(data, { id: this.$route.params.id })).then(() => {
            this.$router.push('/taskdetail/' + this.$route.params.id)
          })
        }
      }
    },
    components: { TLoading, TForm }
  }
</script>
<style scoped lang="stylus">
h1
  margin-bottom: 0
h2
  margin-top: 0
</style>