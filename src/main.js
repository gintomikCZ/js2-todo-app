import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// window.onerror = function () {
//   console.log(store)
//   store.commit('setErrorTitle', 'Unknown Error')
//   store.commit('setErrorMessage', 'An Error Happened')
//   router.push('/error')
// }

