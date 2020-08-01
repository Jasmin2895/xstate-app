import Vue from 'vue'
import Vuex from 'vuex'
import { todoMachine } from '../xstate-todo/index'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentState: todoMachine.initial,
    service: {}
  },
  mutations: {
    transitions(state, action) {
      state.currentState = todoMachine.transition(
        state.currentState,
        action
      ).value
    },
    services(state, payload) {
      console.log('services store', payload)
      state.service = payload
    }
  }
})
