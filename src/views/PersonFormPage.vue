<template>
  <h1>{{ title }}</h1>

  <t-loading v-if="loading" />
  <t-form
    v-else
    :controls="controls"
    @submited="onSubmited"
  />

</template>

<script>
  import db from '../utils/db.js'
  import TForm from '../components/TForm.vue'
  import TLoading from '../components/TLoading.vue'


  export default {
    name: 'PersonFormPage',
    data () {
      return {
        controls: {
          first: {
            innitialValue: '',
            type: 'text',
            label: 'first name',
            validationRules: [
              { rule: 'required', message: 'please enter the first name' },
              { rule: 'minLength', par: 2, message: 'the minimum length is 2 characters' },
              { rule: 'maxLength', par: 30, message: 'the maximum length is 30 characters' }
            ]
          },
          last: {
            innitialValue: '',
            type: 'text',
            label: 'last name',
            validationRules: [
              { rule: 'required', message: 'please enter the first name' },
              { rule: 'minLength', par: 2, message: 'the minimum length is 2 characters' },
              { rule: 'maxLength', par: 100, message: 'the maximum length is 30 characters' }
            ]
          },
          email: {
            innitialValue: '',
            type: 'email',
            label: 'email',
            validationRules: [
              { rule: 'required', message: 'please enter the first name' },
            ]
          },
          phone: {
            innitialValue: '',
            type: 'tel',
            label: 'phone',
            validationRules: []
          },
          position: {
            innitialValue: '',
            type: 'text',
            label: 'position',
            validationRules: []
          },
          skills: {
            innitialValue: '',
            type: 'text',
            label: 'skills',
            validationRules: []
          },
        },
        loading: true
      }
    },
    created () {
      if (!this.$route.params.id) {
        this.loading = false
        return
      }
      db.get('persons/' + this.$route.params.id).then(record => {
        Object.keys(this.controls).forEach(key => {
          this.controls[key].innitialValue = record[key]
        })
        this.loading = false
      })
    },
    computed: {
      title () {
        return this.$route.params.id ? 'edit person' : 'add person'
      },
    },
    methods: {
      onSubmited (data) {
        if (!this.$route.params.id) {
          return db.post('persons', data).then(() => {
            this.$router.push('/persons')
          })
        }
        return db.put('persons', Object.assign(data, { id: this.$route.params.id })).then(() => {
          this.$router.push('/persons/' + this.$route.params.id)
        })
      }
    },
    components: { TForm, TLoading }
  }
</script>
