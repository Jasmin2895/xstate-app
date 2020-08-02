import { Machine, actions, spawn } from 'xstate'
const { assign } = actions

const todoItemMachine = Machine({
  id: 'todoItem',
  initial: 'completed',
  states: {
    completed: {
      on: {
        completeTask: { actions: 'completedTodoAction' }
      }
    },
    pending: {}
  },
  actions: {
    completedTodoAction: assign((context, event) => {})
  }
})

const createTodo = (data) => {
  console.log('createTodo', data)
  return {
    title: data.title,
    project: data.project,
    done: false,
    new: true
  }
}

export const todoMachine = Machine(
  {
    id: 'Todo',
    initial: 'list',
    context: {
      user: null,
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
      ],
      delay: 0
    },
    states: {
      idle: {
        on: {
          fetch: 'list'
        }
      },
      list: {
        entry: 'fetchList',
        always: 'todoItemActions'
      },
      resolved: {
        type: 'final'
      },
      rejected: {
        on: {
          fetch: 'list'
        }
      },
      todoItemActions: {
        type: 'parallel',
        states: {
          createTodoItem: {
            initial: 'add_details',
            states: {
              add_details: {
                on: {
                  fillDetails: { actions: ['createNewTodoItem', 'persist'] }
                }
              }
            }
          },
          deleteTodoItem: {
            initial: 'deleteItem',
            states: {
              deleteItem: {
                on: {
                  delete: { actions: ['deleteCurrentTodoItem', 'persist'] }
                }
              }
            }
          },
          editTodoItem: {
            initial: 'edit_details',
            states: {
              edit_details: {
                on: {
                  editItem: { actions: ['editCurrentTodoItem', 'persist'] }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    actions: {
      fetchList: assign({
        todoList: (context, event) => {
          return context.todoList.map((todo) => ({
            ...todo,
            ref: spawn(todoItemMachine.withContext(todo))
          }))
        }
      }),
      createNewTodoItem: assign({
        todoList: (context, event) => {
          let newTodo = createTodo(event.payload)
          return context.todoList.concat({
            ...newTodo,
            ref: spawn(todoItemMachine.withContext(newTodo))
          })
        }
      }),

      deleteCurrentTodoItem: assign({
        todoList: (context, event) => {
          return context.todoList.filter((todo) => {
            if (todo.title !== event.payload.title) {
              return true
            }
          })
        }
      }),
      editCurrentTodoItem: assign({
        todoList: (context, event) => {
          let todoIndex = context.todoList.indexOf(event.payload)
          context.todoList[todoIndex].done = true
          return context.todoList
        }
      })
    }
  }
)
