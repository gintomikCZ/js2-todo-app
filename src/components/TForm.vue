<template>
  <form @submit="onSubmit">

    <t-modal :show="showModalError" @close-me="showModalError = false">
      <p>
        The form contains errors and can not be sent off
      </p>
      <t-button label="OK" @clicked="showModalError = false" />
    </t-modal>

    <t-control
      v-for="klic in controlsKeys"
      :key="klic"
      :label="controls[klic].label"
      :control="klic"
      :type="controls[klic].type"
      :value="controlsData[klic].value"
      :resizable="controls[klic].resizable"
      :options="controls[klic].options || []"
      :error="controlsData[klic].error"
      :error-message="controlsData[klic].errorMessage"
      @has-input="onHasInput"
      @blured="onBlured"
    />

    <t-button label="submit" />

  </form>
</template>

<script>
import TButton from './TButton.vue'
import TControl from './TControl.vue'
import validator from '../utils/validator.js'
import TModal from './TModal.vue'

export default {
  name: 'TForm',
  props: {
    controls: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      controlsData: {},
      showModalError: false
    }
  },
  created () {
    this.controlsKeys.forEach(key => {
      this.controlsData[key] = {}
      this.controlsData[key].value = this.controls[key].innitialValue
      this.controlsData[key].error = false
      this.controlsData[key].errorMessage = ''
    })
  },
  computed: {
    controlsKeys () {
      return Object.keys(this.controls)
    },
    allControlsError () {
      return this.controlsKeys.reduce((acc, cur) => {
        return this.controlsData[cur].error || acc
      }, false)
    }
  },
  methods: {
    onHasInput (payload) {
      this.controlsData[payload.control].value = payload.value
    },
    onBlured (control) {
      this.validate(control)
    },
    validate (control) {
      let error = false
      this.controls[control].validationRules.forEach(ruleObject => {
        if (!error) {
          const ruleFunction = validator[ruleObject.rule]
          const value = this.controlsData[control].value
          const result = 'par' in ruleObject ? ruleFunction(value, ruleObject.par) : ruleFunction(value)
          if (!result) {
            this.controlsData[control].error = true
            this.controlsData[control].errorMessage = ruleObject.message
            error = true
          }
        }
      })
      if (!error) {
        this.controlsData[control].error = false
        this.controlsData[control].errorMessage = ''
      }
    },
    onSubmit (e) {
      e.preventDefault()
      this.controlsKeys.forEach(control => {
        this.validate(control)
      })
      if (this.allControlsError) {
        this.showModalError = true
        return
      }
      this.sendFormData()
    },
    sendFormData () {
      const data = {}
      this.controlsKeys.forEach((key) => {
        data[key] = this.controlsData[key].value
      })
      this.$emit('submited', data)
    }
  },
  components: { TButton, TControl, TModal }
}

</script>

<style lang="stylus" scoped>
</style>