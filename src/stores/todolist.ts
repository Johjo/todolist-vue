import { defineStore } from 'pinia'

export const useTodolistStore = defineStore('todolist', () => {
  const state = 'NothingToDo'

  return { state }
})