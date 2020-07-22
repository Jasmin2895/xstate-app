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
export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  setup() {
    const { state, send } = useMachine(todoMachine)
    return {
      state,
      send
    }
  },
  data() {
    return {
      todoList: [
        {
          title: 'Todo A',
          project: 'Project A',
          done: false
        },
        {
          title: 'Todo B',
          project: 'Project B',
          done: true
        },
        {
          title: 'Todo C',
          project: 'Project C',
          done: false
        },
        {
          title: 'Todo D',
          project: 'Project D',
          done: false
        }
      ]
    }
  },
  mounted() {
    // this.send('fetch')
    // this.checkListItemsStatus()
  },
  methods: {
    checkListItemsStatus() {
      // if (this.current.value === 'list') {
      //   if (this.current.context.todoList.length > -1) {
      //     // this.send('listItems')
      //   }
      // }
    },
    createTodo(newTodo) {
      // this.send({ type: 'fillDetails', payload: newTodo })
      // this.send('listItems')
      // this.current.context.currentItem = newTodo
      // console.log('currentItem')
      // this.current.context.todoList.push(newTodo)
      sweetalert('Success!', 'To-Do created!', 'success')
    }
  }
}
</script>
