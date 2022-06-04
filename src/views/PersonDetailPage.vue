<template>

  <h1>Person Detail</h1>
  <t-loading v-if="loading"/>
  <ul v-else class="detail-list">
    <li>
      <div>first name: </div>
      <div class="text-bold">{{ person.first }}</div>
    </li>
    <li>
      <div>last name: </div>
      <div class="text-bold">{{ person.last }}</div>
    </li>
    <li>
      <div>position: </div>
      <div class="text-bold">{{ person.position || '-' }}</div>
    </li>
    <li>
      <div>skills: </div>
      <div class="text-bold">{{ person.skills || '-' }}</div>
    </li>
    <li>
      <div>email: </div>
      <div class="text-bold">{{ person.email }}</div>
    </li>
    <li>
      <div>phone: </div>
      <div class="text-bold">{{ person.phone || '-' }}</div>
    </li>
  </ul>
  <t-button label="edit" @clicked="onClicked"/>
</template>

<script>

import db from '../utils/db.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'

export default {
  name: 'PersonDetailPage',
  data () {
    return {
      person: {},
      loading: true
    }
  },
  created () {
    db.get('persons/' + this.$route.params.id).then(record => {
      this.person = record
      this.loading = false
    })
  },
  methods: {
    onClicked () {
      this.$router.push('/personform/' + this.$route.params.id)
    }
  },
  components: { TLoading, TButton }
}

</script>

<style lang="stylus">


</style>
