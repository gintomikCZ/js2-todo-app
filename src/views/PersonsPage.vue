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

// import db from '../utils/db.js'
import TList from '../components/TList.vue'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'

export default {
  name: 'PersonsPage',
  data () {
    return {
//      persons: [],
      loading: true
    }
  },
  computed: {
    personsToDisplay () {
      if (!this.persons) return []
      return this.persons.map((person) => {
        let description = person.position ? person.position : ''
        description += person.position && person.skills ? ', ' : ''
        description += person.skills ? person.skills : ''
        return {
          id: person.id,
          title: person.last + ' ' + person.first,
          description,
          rightTop: person.email,
          rightBottom: person.phone || ''
        }
      }).sort((a, b) => { return a.title.localeCompare(b.title) })
    },
    persons () {
      return this.$store.state.persons
    }
  },
  created () {
    // db.get('persons').then(data => {
    //   this.persons = data
    //   this.loading = false
    // })
    this.$store.dispatch('fetchPersons').then(() => {
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