import Vue from 'vue'
import { todoMachine } from './index'
import { useMachine } from '@xstate/vue'
import { reactive, computed } from '@vue/composition-api'
import { store } from '../store/todoActions'

export default function stateMachineActions() {
  const { state, send } = useMachine(todoMachine)

  let todoActionStore = reactive({
    store
  })

  function setCurrentState(state) {
    store.commit('setState', state)
  }
  function stateTransitions(action, payload) {
    send({ type: action, payload })
  }

  return {
    state,
    stateTransitions,
    todoActionStore,
    setCurrentState,
    todoList: computed(() => state.value.context.todoList)
  }
}
