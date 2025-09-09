import type { ExternalTask } from '../entities/ExternalTask'

export interface ExternalTodolistPort {
  allActiveTasks(): Promise<ExternalTask[]>
}