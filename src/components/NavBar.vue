<template>
  <nav>
    <div>
      SDA ToDo App
    </div>
    <ul>
      <li>
        <div v-if="$route.path === '/'">home</div>
        <router-link v-else to="/">home</router-link>
      </li>
      <li>
        <div v-if="$route.path === '/projects'">projects</div>
        <router-link v-else to="/projects">projects</router-link>
      </li>
      <li>
        <div v-if="$route.path === '/persons'">persons</div>
        <router-link v-else to="/persons">persons</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  created () {
    // console.log(this.$route)
  }
}
</script>


<style lang="stylus" scoped>
@import '../styles/variables.styl'

nav
  background: $primary
  height: 50px
  display: flex
  justify-content: space-between
  padding: 0 1rem
  align-items: center

nav > div
  font-weight: bold
  font-size: 1.4rem

ul
 display: flex
 list-style-type: none
 padding: 0
 margin: 0

ul li
  padding-left: 1rem

a
  text-decoration: none
  color: #2c3e50
  cursor: pointer
  display: block
  transition: transform .4s ease
  position: relative

a:hover
  color: black
  transform: scale(1.2)

a::after {
  content: ''
  height: 2px
  width: 100%
  background: black
  transform: scaleX(0)
  transition: transform .4s ease
  position: absolute
  top: 100%
  left: 0
  transform-origin: left
}

a:hover::after {
  transform: scaleX(1)
}

</style>