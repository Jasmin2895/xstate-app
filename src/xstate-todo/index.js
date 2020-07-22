import { Machine, actions } from 'xstate'
const { assign } = actions

export const todoMachine = Machine(
  {
    id: 'Todo',
    initial: 'idle',
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
            target: 'todoItemActions'
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
      deleteTodoItem: assign((context, event) => {
        console.log('deleteTodoItem action', context, event)
      }),
      testFunc: assign((context, event) => {
        console.log('testFunc', context, event)
      })
    }
  }
)
