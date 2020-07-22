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

export default {
  props: ['todos'],
  components: {
    Todo
  },
  methods: {
    deleteTodo(todo) {
      console.log('delete todo', todo)
      // todoMachine.send({ type: 'delete', payload: todo })
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this todo item!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((todo) => {
        let todoIndex = this.todos.indexOf(todo)
        this.todos.splice(todoIndex, 1)
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success'
        })
      })
    },
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos[todoIndex].done = true
      swal('Success!', 'To-Do completed!', 'success')
    }
  }
}
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>
