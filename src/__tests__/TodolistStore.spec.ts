import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTodolistStore } from '@/stores/todolist'
import type { NothingToDo } from '@/stores/todolist'

describe('TodolistStore', () => {
  it('should return NothingToDo as initial state', () => {
    setActivePinia(createPinia())
    const store = useTodolistStore()
    
    expect(store.state).toEqual({})
  })
})