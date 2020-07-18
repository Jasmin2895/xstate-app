import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const todoStore = new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
    increment(state, payload) {
      return (state.count = state.count + payload.amount)
    },
    update() {},
    add() {},
    delete() {},
    edit() {}
  },
  actions: {
    updateList(context, payload) {
      context.commit('increment', payload)
    },
    addTodoItem() {},
    deleteTodoItem() {},
    editTodoItem() {}
  }
})
export default todoStore
