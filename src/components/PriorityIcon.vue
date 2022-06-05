<template>
  <div v-if="priority==='low'" class="empty-icon" :style="styleObject"></div>

  <div v-else-if="priority==='standard'" :style="styleObject">
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
      <path d="M22.5 29V10H25.5V29ZM22.5 38V35H25.5V38Z" />
    </svg>
  </div>

  <div v-else :style="styleObject">
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
      <path
        d="M24 42Q22.55 42 21.525 40.975Q20.5 39.95 20.5 38.5Q20.5 37.05 21.525 36.025Q22.55 35 24 35Q25.45 35 26.475 36.025Q27.5 37.05 27.5 38.5Q27.5 39.95 26.475 40.975Q25.45 42 24 42ZM20.5 30V6H27.5V30Z" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'PriorityIcon',
    props: {
      priority: {
        type: String,
        required: true
      },
      scale: {
        type: Number,
        default: 1
      }
    },
    computed: {
      styleObject () {
        return {
          transform: 'scale(' + this.scale + ')'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

.empty-icon
  height: 48px
  width: 48px

</style>