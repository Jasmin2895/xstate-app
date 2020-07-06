import { Machine, actions } from 'xstate'
const { send } = actions

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
            //   actions: ['fetchListItems']
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
              idle: {
                on: {
                  create: 'add_details'
                }
              },
              add_details: {
                on: {
                  fillDetails: {
                    target: 'createSuccess',
                    actions: 'createNewTodoItem'
                  }
                }
              },
              createSuccess: {}
            }
          },
          deleteTodoItem: {
            initial: 'idle',
            states: {
              idle: {
                on: {
                  select_item: 'deleteItem'
                }
              },
              deleteItem: {
                on: {
                  delete: 'deleteSuccess'
                  //   actions: ['deleteItem']
                }
              },
              deleteSuccess: {}
            }
          },
          editTodoItem: {
            initial: 'idle',
            states: {
              idle: {
                on: {
                  edit: 'edit_details'
                }
              },
              edit_details: {
                on: {
                  fill_details: 'editSuccess'
                  //   actions: ['editTodoItem']
                }
              },
              editSuccess: {}
            }
          }
        }
      }
    }
  },
  {
    actions: {
      createNewTodoItem: (context, event) => {
        console.log('context createnew todo Item, this method called', context)
      },
      addListItem: (context, event) => {
        console.log('fetch list item', context, event)
      },
      testFunction: (context, event) => {
        console.log('context event', context, event)
      }
    },
    delays: {
      CONFIG_DELAY: (context) => context.delay
    }
  }
)
