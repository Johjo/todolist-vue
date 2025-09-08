import { defineStore } from 'pinia'

export type NothingToDo = {}

export const useTodolistStore = defineStore('todolist', () => {
  const state: NothingToDo = {}

  return { state }
})