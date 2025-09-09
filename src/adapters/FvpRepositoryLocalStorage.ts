import type { FvpRepositoryPort } from '../domain/ports/FvpRepositoryPort'
import type { TaskFvp } from '../domain/entities/TaskFvp'

export class FvpRepositoryLocalStorage implements FvpRepositoryPort {
  private readonly storageKey = 'fvpTasks'

  async save(taskFvp: TaskFvp): Promise<void> {
    const existingTasks = this.getExistingTasks()
    const updatedTasks = [...existingTasks, taskFvp]
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks))
  }

  private getExistingTasks(): TaskFvp[] {
      const storedData = localStorage.getItem(this.storageKey)
      if (!storedData) {
        return []
      }
      return JSON.parse(storedData) as TaskFvp[]
  }
}