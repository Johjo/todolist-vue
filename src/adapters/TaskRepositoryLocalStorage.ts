import type { TaskRepositoryPort } from '../domain/ports/TaskRepositoryPort'
import type { TaskInformation } from '../domain/entities/TaskInformation'

export class TaskRepositoryLocalStorage implements TaskRepositoryPort {
  private readonly storageKey = 'tasks'

  async save(task: TaskInformation): Promise<void> {
    const existingTasks = this.getExistingTasks()
    const updatedTasks = [...existingTasks, task]
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks))
  }

  private getExistingTasks(): TaskInformation[] {
      const storedData = localStorage.getItem(this.storageKey)
      if (!storedData) {
        return []
      }
      return JSON.parse(storedData) as TaskInformation[]
  }
}
