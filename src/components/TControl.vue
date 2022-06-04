<template>
  <div class="form-control">
    <label :for="control">{{ label }}</label>
    <input
      autocomplete="off"
      :id="control"
      :type="type"
      :value="value"
      @input="onInput"
    >
  </div>
</template>

<script>
  export default {
    name: 'TControl',
    props: {
      control: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      value: {
        validator: (v) => typeof v === 'string' || typeof v === 'number' || v === null,
        required: true
      },
      label: {
        type: String
      }
    },
    methods: {
      onInput (e) {
        this.$emit('has-input', { value: e.target.value, control: this.control })
      }
    }

  }
</script>

<style lang="stylus" scoped>

.form-control
  display: flex
  flex-direction: column
  text-align: left
  margin-bottom: 2rem

.form-control input
  font-size: 1.2rem
  padding: .35em .75em

</style>