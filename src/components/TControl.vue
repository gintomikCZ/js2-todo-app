<template>
  <div class="form-control">
    <label :for="control">{{ label }}</label>

    <textarea v-if="type === 'textarea'" autocomplete="off" :id="control" :value="value" @input="onInput"
      rows="4" :class="{'resize-none': !resizable }">
    </textarea>

    <select
      v-else-if="type === 'select'"
      autocomplete="off" :id="control"
      :value="value"
      @input="onInput">
      <option v-for="option in options" :key="control + option" :value="option">{{ option }}</option>
    </select>

    <input v-else autocomplete="off" :id="control" :type="type" :value="value" @input="onInput">

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
      },
      resizable: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default: () => []
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

.form-control input, .form-control select, .form-control textarea
  padding: .35em .75em

.form-control input
  font-size: 1.2rem

.resize-none
  resize: none

</style>