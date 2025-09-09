import type { TaskFvp } from '../entities/TaskFvp'

export interface FvpRepositoryPort {
  save(taskFvp: TaskFvp): Promise<void>
}