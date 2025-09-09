/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { container } from '../../di/container'
import { TodolistController } from '../../controllers/TodolistController'
import { useTodolistStore } from '../../stores/todolist'
import { TaskRepositoryLocalStorage } from '../../adapters/TaskRepositoryLocalStorage'
import { FvpRepositoryLocalStorage } from '../../adapters/FvpRepositoryLocalStorage'
import { TASK_REPOSITORY_KEY, FVP_REPOSITORY_KEY, EXTERNAL_TODOLIST_KEY } from '../../di/keys'
import type { ExternalTodolistPort } from '../../domain/ports/ExternalTodolistPort'
import type { ExternalTask } from '../../domain/entities/ExternalTask'

class ExternalTodolistStub implements ExternalTodolistPort {
  async allActiveTasks(): Promise<ExternalTask[]> {
    return [
      { key: 'task-1', title: 'Test task 1' },
      { key: 'task-2', title: 'Test task 2' }
    ]
  }
}

describe('TodolistController', () => {
  let sut: TodolistController
  let todolistStore: ReturnType<typeof useTodolistStore>

  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    todolistStore = useTodolistStore()
    
    // Configuration de l'injection de dépendances
    container.provide(TASK_REPOSITORY_KEY, new TaskRepositoryLocalStorage())
    container.provide(FVP_REPOSITORY_KEY, new FvpRepositoryLocalStorage())
    container.provide(EXTERNAL_TODOLIST_KEY, new ExternalTodolistStub())
    
    sut = new TodolistController()
  })

  it('should update todolist store state when refresh is called', async () => {
    expect(todolistStore.state.type).toBe('NothingToDo')

    await sut.refresh()

    expect(todolistStore.state.type).not.toBe('NothingToDo')
  })
})