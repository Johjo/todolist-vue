import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NothingToDo = {type: 'NothingToDo'}

type DoTask = {
  type: 'DoTask'
  task: string
}

type ChooseTaskBetween = {
  type: 'ChooseTaskBetween'
  task1: string
  task2: string
}

type State = NothingToDo | DoTask | ChooseTaskBetween

export const useTodolistStore = defineStore('todolist', () => {
  const state = ref<State>({type: 'NothingToDo'})

  function setState(newState: State) {
    state.value = newState
  }

  return { state, setState }
})
