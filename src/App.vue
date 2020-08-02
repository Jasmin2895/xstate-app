<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class="ui three column centered grid">
      <div class="column">
        <todo-list
          v-bind:todos="todoList"
          @delete-todo="deleteTodoItem"
          @complete-todo="completeTodoItem"
        ></todo-list>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </div>
    </div>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import { onMounted } from '@vue/composition-api'
import stateMachineActions from './xstate-todo/generateVueMachine'

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  setup(props, context) {
    let {
      state,
      stateTransitions,
      todoActionStore,
      setCurrentState,
      todoList
    } = stateMachineActions()

    onMounted(() => {
      let currentState = state.value
      setCurrentState(currentState.value)
    })

    function deleteTodoItem(todoItem) {
      setCurrentState('deleteTodoItem')
      stateTransitions('delete', todoItem)
    }

    function completeTodoItem(todoItem) {
      setCurrentState('editTodoItem')
      stateTransitions('editItem', todoItem)
    }
    function createTodo(newTodo) {
      setCurrentState('createTodoItem')
      stateTransitions('fillDetails', newTodo)
      sweetalert('Success!', 'To-Do created!', 'success')
    }

    return {
      state,
      createTodo,
      todoActionStore,
      todoList,
      deleteTodoItem,
      completeTodoItem
    }
  }
}
</script>
