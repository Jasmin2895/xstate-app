<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class="ui three column centered grid">
      <div class="column">
        <todo-list v-bind:todos="todoList2"></todo-list>
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
import { onMounted, reactive, computed, ref } from '@vue/composition-api'
import { store } from './store/todoActions'

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  setup(props, context) {
    let { state, send, service } = useMachine(todoMachine)
    console.log(
      'app context',
      state.value.context,
      computed(() => state.value.context)
    )

    let todoList1 = ref([])

    function updateTodoList() {
      console.log('todoList1', state.value.context.todoList)
      todoList1.value = state.value.context.todoList
    }

    console.log('todoList')
    let { todoList } = state.value.context
    let todoActionStore = reactive({
      store
    })

    let todoList2 = computed(() => state.value.context.todoList).value
    console.log('todoList2', todoList2)

    onMounted(() => {
      let currentState = state.value
      store.commit('services', service)
      store.commit('setState', currentState.value)
      console.log('state todo app', state.value)
      updateTodoList()
    })

    function createTodo(newTodo) {
      // store.commit('transitions', 'fillDetails')
      send({ type: 'fillDetails', payload: newTodo })
      console.log('newTodo craeteTodo', newTodo, state)
      // state.value.context.todoList.push(newTodo) // add data to context todoList
      sweetalert('Success!', 'To-Do created!', 'success')
    }

    return {
      state,
      send,
      service,
      createTodo,
      todoActionStore,
      todoList,
      todoList1,
      todoList2
    }
  }
}
</script>
