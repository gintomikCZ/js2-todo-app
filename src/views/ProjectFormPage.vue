<template>
  <h1>{{ title }}</h1>

  <t-loading v-if="loading" />
  <t-form v-else :controls="controls" @submited="onSubmited" />

  <t-modal :show="showModalError" @close-me="showModalError = false">
    <p>
      The start date can not be younger then the end date!
    </p>
    <t-button label="OK" @clicked="showModalError = false" />
  </t-modal>
</template>

<script>
import db from '../utils/db.js'
import TForm from '../components/TForm.vue'
import TLoading from '../components/TLoading.vue'
import TModal from '../components/TModal.vue'
import TButton from '../components/TButton.vue'
import { isOlderOrEqualDateString as compareDate } from '../utils/dateUtils.js'

export default {
  name: 'ProjectFormPage',
  data () {
    return {
      controls: {
        project: {
          innitialValue: '',
          type: 'text',
          label: 'project name',
          validationRules: [
            { rule: 'required', message: 'please enter the project name'},
            { rule: 'minLength', par: 2, message: 'the minimum length is 2 characters' },
            { rule: 'maxLength', par: 30, message: 'the maximum length is 30 characters' },
          ]
        },
        description: {
          innitialValue: '',
          type: 'textarea',
          label: 'description',
          resizable: true,
          validationRules: []
        },
        start: {
          innitialValue: '',
          type: 'date',
          label: 'start date',
          validationRules: [
            { rule: 'required', message: 'please enter the start date of the project' },
          ]
        },
        ends: {
          innitialValue: '',
          type: 'date',
          label: 'finish date',
          validationRules: [
            { rule: 'required', message: 'please enter the end date of the project' },
          ]
        }
      },
      loading: true,
      showModalError: false
    }
  },
  created () {
    if (!this.$route.params.id) {
      this.loading = false
      return
    }
    db.get('projects/' + this.$route.params.id).then(record => {
      Object.keys(this.controls).forEach(key => {
        this.controls[key].innitialValue = record[key]
      })
      this.loading = false
    })
  },
  computed: {
    title () {
      return this.$route.params.id ? 'edit project' : 'add project'
    }
  },
  methods: {
    onSubmited(data) {
      if (!compareDate(data.start, data.ends)) {
        this.showModalError = true
        return
      }
      if (!this.$route.params.id) {
        return db.post('projects', data).then(() => {
          this.$router.push('/projects')
        })
      }
      return db.put('projects', Object.assign(data, { id: this.$route.params.id })).then(() => {
        this.$router.push('/projects/' + this.$route.params.id)
      })
    }
  },
  components: { TForm, TLoading, TModal, TButton }
}

</script>
