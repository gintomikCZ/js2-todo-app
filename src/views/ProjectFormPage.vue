<template>

  <h1>{{ title }}</h1>

  <form @submit="onSubmit">
      <div class="form-control">
        <label for="project">project name</label>
        <!-- <input
          type="text"
          @input="onInput"
          :value="project.project"
        > -->
        <input
          autocomplete="off"
          id="project"
          type="text"
          v-model="project.project"
        >
      </div>
      <div class="form-control">
        <label for="description">description</label>
        <textarea
          autocomplete="off"
          id="description"
          rows="4"
          v-model="project.description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="start">start date</label>
        <input
          autocomplete="off"
          id="start"
          type="date"
          v-model="project.start"
        >
      </div>
      <div class="form-control">
        <label for="ends">finish date</label>
        <input
          autocomplete="off"
          id="ends"
          type="date"
          v-model="project.ends"
        >
      </div>
      <t-button label="submit" />
  </form>
      
</template>

<script>

import db from '../utils/db.js'
import TButton from '../components/TButton.vue'

export default {
  name: 'ProjectFormPage',
  data () {
    return {
      project: {
        project: '',
        description: '',
        start: '',
        ends: ''
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
    }
  },
  components: { TButton }
}

</script>

<style lang="stylus" scoped>

form
  width: 80%
  max-width: 500px
  margin: 0 auto

.form-control
  display: flex
  flex-direction: column
  text-align: left
  margin-bottom: 2rem

.form-control input
  font-size: 1.2rem
  padding: .35em .75em


</style>