<template>
  <h1>
    {{ title }}
  </h1>
  <p>{{ message }}</p>

  <t-button label="back" @clicked="onClicked" />

</template>

<script>
import TButton from '../components/TButton.vue'

export default {
  name: 'ErrorPage',
  computed: {
    title () {
      // return this.$route.params.par ? 'Error' : '404 Error'
      return this.$store.state.errorTitle
    },
    message () {
      // return this.$route.params.par ? 'jejda, něco se pokazilo' : 'The requested page was not found.'
      return this.$store.state.errorMessage
    }
  },
  methods: {
    onClicked () {
      this.$router.go(-2)
    }
  },
  components: { TButton }
}

</script>