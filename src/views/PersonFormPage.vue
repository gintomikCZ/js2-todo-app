<template>
  <h1>{{ title }}</h1>

  <form @submit="onSubmit">

    <t-control
      v-for="klic in controlsKeys"
      :key="klic"
      :control="klic"
      :label="controls[klic].label"
      :value="person[klic]"
      :type="controls[klic].type"
      @has-input="onHasInput"
    />

    <t-button label="submit" />
  </form>
</template>

<script>
  import db from '../utils/db.js'
  import TButton from '../components/TButton.vue'
  import TControl from '../components/TControl.vue'


  export default {
    name: 'PersonFormPage',
    data () {
      return {
        person: {
          first: '',
          last: '',
          position: '',
          skills: '',
          email: '',
          phone: ''
        },
        controls: {
          first: {
            type: 'text',
            label: 'first name'
          },
          last: {
            type: 'text',
            label: 'last name'
          },
          email: {
            type: 'email',
            label: 'email'
          },
          phone: {
            type: 'tel',
            label: 'phone'
          },
          position: {
            type: 'text',
            label: 'position',
          },
          skills: {
            type: 'text',
            label: 'skills'
          },
        }
      }
    },
    created () {
      if (this.$route.params.id) {
        db.get('persons/' + this.$route.params.id).then(record => {
          this.person = record
        })
      }
    },
    computed: {
      title () {
        return this.$route.params.id ? 'edit person' : 'add person'
      },
      controlsKeys () {
        return Object.keys(this.controls) // ['first', 'last', 'email' ...]
      }
    },
    /*
      voláme databázi a píšeme název db tabulky
        - je jedno jestli píšu první lomítko (db si ho doplní kdyžtak sama)
      jsme v routeru a píšeme cestu (path)
        - ta musí začínat prvním lomítkem
      jsme v routeru a chceme za cestu ještě přidat parametr
        - musíme psát první lomítko - viz výše
        - musíme psát lomítko za path a za něj teprv parametr
    */
    methods: {
      onSubmit (e) {
        e.preventDefault()
        if (!this.$route.params.id) {
          return db.post('persons', this.person).then(() => {
            this.$router.push('/persons')
          })
        }
        return db.put('persons', this.person).then(() => {
          this.$router.push('/persons/' + this.$route.params.id)
        })
      },
      onHasInput (payload) {
        this.person[payload.control] = payload.value
      },
    },
    components: { TButton, TControl }
  }
</script>

<style lang="stylus" scoped>

form
  width: 80%
  max-width: 500px
  margin: 0 auto 3rem auto
  
</style>