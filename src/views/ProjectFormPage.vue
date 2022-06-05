<template>

  <h1>{{ title }}</h1>

  <form @submit="onSubmit">
    <t-control
      v-for="klic in controlsKeys"
      :key="klic"
      :label="controls[klic].label"
      :control="klic"
      :type="controls[klic].type"
      :value="project[klic]"
      @has-input="onHasInput"
      :resizable="controls[klic].resizable"
    />
    <t-button label="submit" />
  </form>

</template>

<script>

import db from '../utils/db.js'
import TButton from '../components/TButton.vue'
import TControl from '../components/TControl.vue'

export default {
  name: 'ProjectFormPage',
  data () {
    return {
      project: {
        project: '',
        description: '',
        start: '',
        ends: ''
      },
      controls: {
        project: {
          type: 'text',
          label: 'project name'
        },
        description: {
          type: 'textarea',
          label: 'description',
          resizable: true
        },
        start: {
          type: 'date',
          label: 'start date'
        },
        ends: {
          type: 'date',
          label: 'finish date'
        }
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      db.get('projects/' + this.$route.params.id).then(record => {
        this.project = record
      })
    }
  },
  computed: {
    title () {
      return this.$route.params.id ? 'edit project' : 'add project'
    },
    controlsKeys () {
      return Object.keys(this.controls)
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      if (!this.$route.params.id) {
        return db.post('projects', this.project).then(() => {
          this.$router.push('/projects')
        })
      }
      return db.put('projects', this.project).then(() => {
        this.$router.push('/projects/' + this.$route.params.id)
      })
    },
    onHasInput (payload) { // { control: 'název kontrolky', value: 'hodnota'}
      this.project[payload.control] = payload.value
    }
  },
  components: { TButton, TControl }
}

</script>
