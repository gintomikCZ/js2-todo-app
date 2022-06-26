import { createStore } from 'vuex'

import db from '../utils/db.js'

export default createStore({
  state: {
    persons: [],
    errorTitle: '404 Error',
    errorMessage: 'The requested page was not found, och.'
  },
  mutations: {
    setErrorTitle (state, value) {
      state.errorTitle = value
    },
    setErrorMessage (state, value) {
      state.errorMessage = value
    },
    setPersons (state, data) {
      state.persons = data
    }
  },
  actions: {
    fetchPersons (context) {
      return db.get('persons').then((data) => {
        context.commit('setPersons', data)
      })
    }
  },
  modules: {
  }
})
