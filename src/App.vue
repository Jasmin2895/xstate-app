<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class="ui three column centered grid">
      <div class="column">
        <todo-list v-bind:todos="todoList"></todo-list>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </div>
    </div>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import { todoMachine } from './xstate-todo/index'
import { useMachine } from '@xstate/vue'
import { onMounted, reactive } from '@vue/composition-api'
import { store } from './store/todoActions'

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  setup(props, context) {
    const todoActionStore = reactive({
      store
    })
    let { state, send, service } = useMachine(todoMachine)
    let { todoList } = state.value.context
    console.log('app todolist', todoList)

    onMounted(() => {
      send('listItems')
      store.commit('services', service)
      store.commit('transitions', 'listItems')
      console.log('state todo app', state.value)
      // updateTodoItemList()
    })

    // function updateTodoItemList() {
    //   let currentState = state.value
    //   if (
    //     currentState.value === 'list' &&
    //     currentState.context.todoList.length > 0
    //   ) {
    //     // todoMachine.transition(todoMachine.initial.value, 'listItems')
    //     send('listItems')
    //     store.commit('services', service)
    //     store.commit('transitions', 'listItems')
    //   }
    // }
    function createTodo(newTodo) {
      state.value.context.todoList.push(newTodo) // add data to context todoList
      sweetalert('Success!', 'To-Do created!', 'success')
    }

    return {
      state,
      send,
      service,
      todoList,
      createTodo,
      ...todoActionStore
    }
  }
}
</script>
