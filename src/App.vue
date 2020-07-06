<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class="ui three column centered grid">
      <div class="column">
        <todo-list v-bind:todos="current.context.todoList"></todo-list>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </div>
    </div>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import { todoMachine } from './xstate-todo'
import { interpret } from 'xstate'
export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  created() {
    this.toggleService
      .onTransition((state) => {
        console.log('state', state, state.context)
        this.current = state
      })
      .start()
  },
  data() {
    const machine = todoMachine.withConfig(
      {},
      {
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
    )
    return {
      toggleService: interpret(machine),
      current: machine.initialState
    }
  },
  mounted() {
    this.send('fetch')
    console.log('state machine', this.current.value, this.current.actions)
    this.checkListItemsStatus()
  },
  methods: {
    checkListItemsStatus() {
      if (this.current.value === 'list') {
        if (this.current.context.todoList.length > -1) {
          this.send('listItems')
        }
      }
    },
    createTodo(newTodo) {
      this.send('fillDetails', newTodo)
      this.current.context.todoList.push(newTodo)
      sweetalert('Success!', 'To-Do created!', 'success')
    },
    send(event) {
      this.toggleService.send(event)
    }
  }
}
</script>
