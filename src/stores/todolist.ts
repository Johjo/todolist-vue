import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NothingToDo = {type: 'NothingToDo'}

type DoTask = {
  type: 'DoTask'
  task: string
}

type State = NothingToDo | DoTask

export const useTodolistStore = defineStore('todolist', () => {
  const state = ref<State>({type: 'NothingToDo'})

  function setState(newState: State) {
    state.value = newState
  }

  return { state, setState }
})
