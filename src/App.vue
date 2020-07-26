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
import { onMounted } from '@vue/composition-api'

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  setup() {
    let { state, send } = useMachine(todoMachine)
    let todoList = state.value.context.todoList

    onMounted(() => {
      send('fetch')
      updateTodoItemList()
    })

    function updateTodoItemList() {
      let currentState = state.value
      if (
        currentState.value === 'list' &&
        currentState.context.todoList.length > 0
      ) {
        send('listItems')
        console.log(state.value.value)
      }
      console.log('currentState2', currentState.value, state.value.value)
    }
    function createTodo(newTodo) {
      state.value.context.todoList.push(newTodo) // add data to context todoList
      sweetalert('Success!', 'To-Do created!', 'success')
    }

    return {
      state,
      send,
      todoList,
      createTodo
    }
  }
}
</script>
