<template>

  <h1>Project Detail</h1>
  <t-loading v-if="loading" />
  <ul v-else class="detail-list">
    <li>
      <div>project name: </div>
      <div class="text-bold">{{ project.project }}</div>
    </li>
    <li>
      <div>description: </div>
      <div class="text-bold">{{ project.description ||  '-' }}</div>
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
  <t-button label="edit" @clicked="onClicked"/>

</template>

<script>

import db from '../utils/db.js'
import { formatDate } from '../utils/dateUtils.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'

export default {


  name: 'ProjectDetailPage',
  data () {
    return {
      project: {},
      loading: true
    }
  },
  created () {
    db.get('projects/' + this.$route.params.id).then(record => {
      this.project = {
        project: record.project,
        description: record.description,
        start: formatDate(record.start),
        ends: formatDate(record.ends)
      }
      this.loading = false
    })
  },
  methods: {
    onClicked () {
      this.$router.push('/projectform/' + this.$route.params.id)
    }
  },
  components: { TLoading, TButton }
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
