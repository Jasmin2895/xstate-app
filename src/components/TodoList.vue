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
  setup(props, { emit }) {
    function deleteTodo(todo) {
      let currentItem = todo
      console.log('deleteTodo function', todo)
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this todo item!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(() => {
        emit('delete-todo', currentItem)
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success'
        })
      })
    }
    function completeTodo(todo) {
      const todoIndex = props.todos.indexOf(todo)
      props.todos[todoIndex].done = true
      swal('Success!', 'To-Do completed!', 'success')
    }

    return {
      deleteTodo,
      completeTodo
    }
  }
}
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>
