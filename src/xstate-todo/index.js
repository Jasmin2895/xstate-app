import { Machine, actions, spawn } from 'xstate'
const { assign } = actions

const todoItemMachine = Machine({
  id: 'todoItem',
  initial: 'addItem',
  states: {
    addItem: {}
  }
})

// const todoItemMachine = (todo) => {
//   return Machine({
//     id: 'todoItem',
//     context: {
//       todo
//     },
//     initial: 'addItem',
//     states: {
//       addItem: {}
//     }
//   })
// }

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
        on: {
          listItems: 'todoItemActions'
        }
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
                  fillDetails: [{ actions: 'createNewTodoItem' }]
                }
              }
            }
          },
          deleteTodoItem: {
            initial: 'deleteItem',
            states: {
              deleteItem: {
                on: {
                  delete: [{ actions: 'deleteSuccess' }]
                }
              }
            }
          },
          editTodoItem: {
            initial: 'edit_details',
            states: {
              edit_details: {
                on: {
                  fill_details: [{ actions: 'editSuccess' }]
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
      createNewTodoItem: assign((context, event) => {
        console.log('create New Todo item', context, event)
        // context.todoList.push(event.payload)
      }),
      deleteTodoItem: assign((context, event) => {
        console.log('deleteTodoItem action', context, event)
      }),
      testFunc: assign((context, event) => {
        console.log('testFunc', context, event)
      })
    }
  }
)
