import { Machine, actions } from 'xstate'
const { send, assign } = actions

export const todoMachine = Machine(
  {
    id: 'Todo',
    initial: 'idle',
    context: {
      user: null,
      todoList: [],
      delay: 0
    },
    states: {
      idle: {
        on: {
          fetch: 'list',
          entry: send('reset', {
            delay: 'CONFIG_DELAY'
          })
        }
      },
      list: {
        invoke: {
          id: 'fetchList',
          src: (context, event) => {
            console.log('fetchList', context, event)
            return context.todoList
          },
          onDone: {
            target: 'resolved'
          },
          onError: 'rejected'
        },
        on: {
          listItems: {
            target: 'todoItemActions',
            actions: 'addListItem'
          }
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
      createNewTodoItem: assign((context, event) => {
        console.log('create New Todo item', context, event)
        context.todoList.push(event.payload)
      }),
      addListItem: (context, event) => {}
    },
    delays: {
      CONFIG_DELAY: (context) => context.delay
    }
  }
)
