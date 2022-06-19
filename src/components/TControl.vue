<template>
  <div class="form-control">
    <label :for="control">{{ label }}</label>

    <textarea
      v-if="type === 'textarea'" autocomplete="off"
      :id="control"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      rows="4"
      :class="{
        'resize-none': !resizable,
        'is-invalid': error
      }">
    </textarea>

    <select
      v-else-if="type === 'select'"
      autocomplete="off" :id="control"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      :class="{ 'is-invalid': error }"
    >
      <option v-for="option in options" :key="control + option" :value="option">{{ option }}</option>
    </select>

    <input
      v-else autocomplete="off"
      :id="control"
      :type="type"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      :class="{ 'is-invalid': error }"
    >
    <div v-if="error" class="error-message">{{ errorMessage }}</div>
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
      },
      error: {
        type: Boolean,
        default: false
      },
      errorMessage: {
        type: String,
        default: ''
      }
    },
    methods: {
      onInput (e) {
        this.$emit('has-input', { value: e.target.value, control: this.control })
      },
      onBlur () {
        this.$emit('blured', this.control)
      }
    }

  }
</script>

<style lang="stylus" scoped>

label
  font-weight: bold
  font-size: 1.2rem
.form-control
  display: flex
  flex-direction: column
  text-align: left
  margin-bottom: 2rem
  position: relative

.form-control input, .form-control select, .form-control textarea
  padding: .35em .75em

.form-control input
  font-size: 1.2rem

.resize-none
  resize: none

.error-message
  position: absolute
  top: 100%
  color: red
.is-invalid
  border-color: red
</style>