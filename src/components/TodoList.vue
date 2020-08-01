<template>
  <div>
    <p class="tasks">
      Completed Tasks:
      {{
        todos.filter((todo) => {
          return todo.done === true
        }).length
      }}
    </p>
    <p class="tasks">
      Pending Tasks:
      {{
        todos.filter((todo) => {
          return todo.done === false
        }).length
      }}
    </p>
    <todo
      v-on:delete-todo="deleteTodo"
      v-on:complete-todo="completeTodo"
      v-for="(todo, index) in todos"
      :key="index"
      :todo.sync="todo"
    ></todo>
  </div>
</template>

<script type="text/javascript">
import swal from 'sweetalert'
import Todo from './Todo'
import { useMachine } from '@xstate/vue'
import { store } from '../store/todoActions'
import { reactive, computed } from '@vue/composition-api'
import { todoMachine } from '../xstate-todo'
export default {
  props: ['todos'],
  components: {
    Todo
  },
  setup(props, context) {
    const todoActionStore = reactive({
      store
    })
    // const presentState = reactive({store.state.value})
    // console.log('presentState', presentState)
    const { state, send } = useMachine(todoMachine)
    console.log('todolist app', store.state.currentState, state.value, send)

    function deleteTodo(todo) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this todo item!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((todo) => {
        let todoIndex = props.todos.indexOf(todo)
        props.todos.splice(todoIndex, 1)
        send('deleteTodoItem')
        send('deleteItem')
        console.log('state deleteItem1', state)
        store.commit('transitions', 'deleteItem')
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success'
        })
      })
    }
    function completeTodo(todo) {
      const todoIndex = props.todos.indexOf(todo)
      props.todos[todoIndex].done = true
      // send('deleteItem')
      swal('Success!', 'To-Do completed!', 'success')
    }

    // console.log('store, send', store, send)
    return {
      state,
      send,
      ...todoActionStore,
      deleteTodo,
      completeTodo
    }
    // const
    // onMounted(() => {
    //   console.log('on mounted')
    //   const { state, send } = useMachine(todoMachine, {
    //     state: store.state.value
    //   })
    // })
    // function onMounted() {
    //   const { state, send } = useMachine(todoMachine, {
    //     state: store.state.value
    //   })
    // }

    // const service = useStore(store.state.currentState)
    // console.log('service', service)
    // let updatedState = ref({})
    // watch(() => {
    //   updatedState = state
    //   console.log('setup TodoList', updatedState)
    // })
  }
}
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>
