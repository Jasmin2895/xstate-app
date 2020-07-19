import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const todoStore = new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
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
export default todoStore
