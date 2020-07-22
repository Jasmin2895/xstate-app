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
      console.log('currentState of state machines', state, action)
      // state.currentState = todoMachine.transition(
      //   state.currentState,
      //   action
      // ).value
    },
    update(state, payload) {},
    add(state, payload) {},
    delete(state, payload) {},
    edit(state, payload) {}
  },
  actions: {
    updateList(context, payload) {},
    addTodoItem() {},
    deleteTodoItem() {},
    editTodoItem() {}
  }
})
