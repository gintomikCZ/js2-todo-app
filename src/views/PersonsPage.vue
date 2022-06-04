<template>

  <h1>Persons</h1>

  <t-loading v-if="loading"/>

  <template v-else>
    <div class="mb-2">
      <t-button @clicked="onClicked" label="add new" />
    </div>
    <t-list
      title="osoba"
      titleRight="kontakty"
      :items="personsToDisplay"
      route-to="persons"
    />
  </template>

</template>

<script>

import db from '../utils/db.js'
import TList from '../components/TList.vue'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'

export default {
  name: 'PersonsPage',
  data () {
    return {
      persons: [],
      loading: true
    }
  },
  computed: {
    personsToDisplay () {
      return this.persons.map((person) => {
        let description = person.position ? person.position : ''
        description += person.position && person.skills ? ', ' : ''
        description += person.skills ? person.skills : ''
        return {
          id: person.id,
          title: person.first + ' ' + person.last,
          description,
          rightTop: person.email,
          rightBottom: person.phone || ''
        }
      })
    }
  },
  created () {
    db.get('persons').then(data => {
      this.persons = data
      this.loading = false
    })
  },
  methods: {
    onClicked () {
      this.$router.push('/personform')
    }
  },
  components: { TList, TLoading, TButton }
}

</script>