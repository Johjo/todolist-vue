import type { TaskInformation } from '../entities/TaskInformation'

export interface TaskRepositoryPort {
  save(task: TaskInformation): Promise<void>
}