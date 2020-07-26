import Vue from 'vue'
import Vuex from 'vuex'
import { todoMachine } from '../xstate-todo/index'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentState: todoMachine.initial
  },
  mutations: {
    transitions(state, action) {
      state.currentState = todoMachine.transition(
        state.currentState,
        action
      ).value
    }
  }
})
