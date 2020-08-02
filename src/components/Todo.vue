<template>
  <div class="ui centered card">
    <div class="content" v-show="!isEditing">
      <div class="header">
        {{ todoItem.title }}
        <div class="tag active" v-if="todo.new">New Task</div>
        <div class="tag" v-else>Old Task</div>
      </div>
      <div class="meta">
        {{ todoItem.project }}
      </div>
      <div class="extra content">
        <span class="right floated edit icon" v-on:click="showForm">
          <i class="edit icon"></i>
        </span>
        <span
          class="right floated trash icon delete"
          v-on:click="deleteTodo(todo)"
        >
          <i class="trash icon"></i>
        </span>
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input type="text" v-model="todoItem.title" />
        </div>
        <div class="field">
          <label>Project</label>
          <input type="text" v-model="todoItem.project" />
        </div>
        <div class="ui two button attached buttons">
          <button class="ui basic blue button" v-on:click="hideForm">
            Close X
          </button>
        </div>
      </div>
    </div>
    <div
      class="ui bottom attached green basic button"
      v-show="!isEditing && todo.done"
      disabled
    >
      Completed
    </div>
    <div
      class="ui bottom attached red basic button"
      v-on:click="completeTodo(todo)"
      v-show="!isEditing && !todo.done"
    >
      Pending
    </div>
  </div>
</template>

<script type="text/javascript">
import { useService } from '@xstate/vue'
import { ref, computed } from '@vue/composition-api'
export default {
  props: ['todo'],
  setup(props, context) {
    let { state, send } = useService(props.todo.ref)

    let isEditing = ref(false)

    function completeTodo(todo) {
      send('completeTask')
      this.$emit('complete-todo', todo)
    }

    function deleteTodo(todo) {
      this.$emit('delete-todo', todo)
    }

    function showForm() {
      this.isEditing = true
    }

    function hideForm() {
      this.isEditing = false
    }
    return {
      state,
      send,
      todoItem: computed(() => state.value.context),
      isEditing,
      completeTodo,
      deleteTodo,
      showForm,
      hideForm
    }
  }
}
</script>
<style scoped>
.header {
  display: flex !important;
  justify-content: space-between;
}
.tag {
  font-size: 12px;
  border: 2px solid gainsboro;
  border-radius: 20px;
  color: gainsboro;
  padding: 2px 8px;
}
.active {
  color: green;
  border: 2px solid green;
}
.delete {
  cursor: pointer;
}
.edit {
  cursor: pointer;
}
</style>
