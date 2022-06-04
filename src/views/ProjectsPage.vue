<template>

  <h1>Projects</h1>
  <t-loading v-if="loading" />

  <template v-else>
    <div class="mb-2">
      <t-button @clicked="onClicked" label="add new" />
    </div>
    <t-list
      title="project"
      title-right="start/end"
      route-to="projects"
      :items="projectsToDisplay"
    />
  </template>

</template>

<script>
import db from '../utils/db.js'
import TList from '../components/TList.vue'
import { formatDate } from '../utils/dateUtils.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'

export default {
  name: 'ProjectsPage',
  data () {
    return {
      projects: [],
      loading: true
    }
  },
  computed: {
    projectsToDisplay () {
      return this.projects.map(project => {
        return {
          id: project.id,
          title: project.project,
          description: project.description || '',
          rightTop: formatDate(project.start),
          rightBottom: formatDate(project.ends)
        }
      })
    }
  },
  created() {
    db.get('projects').then(data => {
      // console.log(data)
      this.projects = data
      this.loading = false
    })
  },
  methods: {
    onClicked () {
      // zobrazit formulář
      this.$router.push('/projectform')
    }
  },
  components: { TList, TLoading, TButton }
}

</script>

<styles lang="stylus" scoped>
@import '../styles/variables.styl'

.t-list
  list-style-type: none
  margin: 0
  padding: 0
  border: 1px solid $border
  width: 80%
  margin: 0 auto

.t-list li
  text-align: left
  padding: .5rem 1rem
  display: flex
  justify-content: space-between
  &:not(:last-child)
    border-bottom: 1px solid $border-light

.title
  font-weight: bold
  font-size: $font-size-header

.description
  font-size: $font-size-description

.dates
  display: flex
  flex-direction: column
  justify-content: space-between

.clickable
  cursor: pointer
  &:hover
    background: $highlight

</styles>
